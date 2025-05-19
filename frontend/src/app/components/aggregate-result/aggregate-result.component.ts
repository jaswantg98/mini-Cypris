import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreApiService } from 'src/services/core-api.service';
import { ChartOptions, ChartData } from 'chart.js';

@Component({
  selector: 'app-aggregate-result',
  templateUrl: './aggregate-result.component.html',
  styleUrls: ['./aggregate-result.component.css']
})
export class AggregateResultComponent implements OnInit {
  raw: Record<string, Record<string, number>> = {};
  error = '';
  isLoading = false; 

  // list of aggregation keys in the order they arrived
  public aggKeys: string[] = [];

  // per-field chart data
  public aggChartData: Record<string, ChartData<'bar', number[], string>> = {};

  // shared chart options
  public chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false }
    }
  };

  constructor(
    private route: ActivatedRoute,
    private core: CoreApiService
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(p => {
      const q = p.get('q')!;
      const aggs = (p.get('aggs') || '').split(',').filter(x => x);
      if (!q || aggs.length === 0) {
        this.error = 'Missing query or aggregations';
        return;
      }

      this.isLoading = true;

      this.core.aggregateWorks(q, aggs).subscribe({
        next: res => {
          this.raw = res.aggregations || {};
          this.buildCharts();
          this.isLoading = false;
        },
        error: err => {
          this.error = err.message,
          this.isLoading = false;
        }
      });
    });
  }

  private buildCharts() {
    this.aggKeys = Object.keys(this.raw);

    for (const key of this.aggKeys) {
      const bucket = this.raw[key]!;
      // labels = the bucket keys (e.g. years or author names)
      const labels = Object.keys(bucket);
      // data = the counts in the same order
      const data = labels.map(l => bucket[l]);

      this.aggChartData[key] = {
        labels,
        datasets: [
          {
            data,
            label: key,
            backgroundColor: 'rgba(25, 118, 210, 0.7)',
            borderColor: 'rgba(25, 118, 210, 1)',
            borderWidth: 1
          }
        ]
      };
    }
  }
}
