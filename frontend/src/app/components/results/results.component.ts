import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreApiService } from 'src/services/core-api.service';
import { Result } from 'src/app/models/result.model';
import { Router } from '@angular/router';

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

  constructor(
    private route: ActivatedRoute,
    private coreApiService: CoreApiService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const q = params.get('q') || '';
      if (!q.trim()) {
        console.log("empty search is hit");
        
        // clear results
        this.searchResults = [];
        // show dialog
        this.dialog.open(SearchErrorDialogComponent, {
          data: { message: `Search term can't be empty — please add a valid keyword.` },
          panelClass: 'search-error-panel'
        });
        this.searchTerm = '';
        this.searchResults = []
        return;
      }
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
        console.log("results component -> error fetching results");
        
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
