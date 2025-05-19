import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreApiService } from 'src/services/core-api.service'; 

@Component({
  selector: 'app-aggregate-result',
  templateUrl: './aggregate-result.component.html',
  styleUrls: ['./aggregate-result.component.css']
})
export class AggregateResultComponent implements OnInit {
  raw: any;
  error = '';
  constructor(
    private route: ActivatedRoute,
    private core: CoreApiService
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(p => {
      const q = p.get('q')!;
      const aggs = (p.get('aggs') || '')
        .split(',')
        .filter(x => x);
      if (!q || aggs.length===0) {
        this.error = 'Missing query or aggregations';
        return;
      }

      this.core.aggregateWorks(q, aggs).subscribe({
        next: res => this.raw = res.aggregations,
        error: err => this.error = err.message
      });
    });
  }
}
