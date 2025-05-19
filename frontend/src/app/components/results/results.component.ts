import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreApiService } from 'src/services/core-api.service';
import { Result } from 'src/app/models/result.model';
import { Router } from '@angular/router';
import { ChartOptions, ChartData, ChartDataset } from 'chart.js';

import { MatDialog } from '@angular/material/dialog';
import { SearchErrorDialogComponent } from '../search-error-dialog/search-error-dialog.component';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  searchTerm = '';
  searchResults: Result[] = [];
  isLoading = false;
  errorMessage = '';
  limit?: number;

  constructor(
    private route: ActivatedRoute,
    private coreApiService: CoreApiService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.searchTerm = params.get('q') || '';
      console.log("search term is: ", this.searchTerm);
      this.limit = params.has('limit') ? +params.get('limit')! : undefined;
      if (!this.searchTerm.trim()) {
        console.log("empty search is hit");
        
        // clear results
        this.searchResults = [];
        // show dialog
        this.dialog.open(SearchErrorDialogComponent, {
          data: { message: `Search term can't be empty — please add a valid keyword.` },
          panelClass: 'search-error-panel'
        });
        this.router.navigate(['/']);
        return;
      }
      this.fetchResults();
    });
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Papers per Publication Year' }
    }
  };
  
  public barChartData: ChartData<'bar', number[], string> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Count',
        backgroundColor: 'rgba(25, 118, 210, 0.7)',
        borderColor:   'rgba(25, 118, 210, 1)',
        borderWidth: 1
      } as ChartDataset<'bar', number[]>
    ]
  };

  private fetchResults() {
    this.isLoading = true;
    this.errorMessage = '';
    this.coreApiService.searchOutputsByKeywords(this.searchTerm, this.limit).subscribe({
      next: res => {
        this.isLoading = false;
        this.searchResults = res.results || [];
        this.updateChart();
      },
      error: () => {
        console.log("results component -> error fetching results");
        
        this.isLoading = false;
        this.errorMessage = 'Error fetching results';
      }
    });
  }

  private updateChart() {
    const counts: Record<number, number> = {};
    this.searchResults.forEach(p => {
      const y = p.yearPublished || new Date(p.publishedDate).getFullYear();
      counts[y] = (counts[y] || 0) + 1;
    });
  
    const years = Object.keys(counts)
      .map(v => +v)
      .sort((a,b) => a-b)
      .map(v => v.toString());
    const data = years.map(y => counts[+y]);
  
    this.barChartData = {
      labels: years,
      datasets: [
        {
          data,
          label: 'Count',
          backgroundColor: 'rgba(25, 118, 210, 0.7)',
          borderColor:   'rgba(25, 118, 210, 1)',
          borderWidth: 1
        }
      ]
    };
  }
  

  getAuthorNames(paper: Result): string {
    return paper.authors?.map(a => a.name).join(', ') || 'N/A';
  }

  goToInfo(paper: Result) {
    this.router.navigate(
      ['/about', paper.id],
      { state: { paper } }
    );
  }
}
