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

  private fetchResults() {
    this.isLoading = true;
    this.errorMessage = '';
    this.coreApiService.searchOutputsByKeywords(this.searchTerm, this.limit).subscribe({
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
