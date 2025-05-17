import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreApiService } from 'src/services/core-api.service';
import { Result } from 'src/app/models/result.model';
import { Router } from '@angular/router';

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

  constructor(
    private route: ActivatedRoute,
    private coreApiService: CoreApiService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const q = params.get('q') || '';
      if (!q) return;
      this.searchTerm = q;
      this.fetchResults();
    });
  }

  private fetchResults() {
    this.isLoading = true;
    this.errorMessage = '';
    this.coreApiService.searchOutputsByKeywords(this.searchTerm).subscribe({
      next: res => {
        this.isLoading = false;
        this.searchResults = res.results || [];
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Error fetching results';
      }
    });
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
