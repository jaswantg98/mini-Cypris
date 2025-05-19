import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SearchErrorDialogComponent } from '../search-error-dialog/search-error-dialog.component';

@Component({
  selector: 'app-aggregate-search',
  templateUrl: './aggregate-search.component.html',
  styleUrls: ['./aggregate-search.component.css']
})
export class AggregateSearchComponent {
  searchTerm = '';
  // allow the user to pick one or more aggregations:
  options: { [field: string]: boolean } = {
    yearPublished: true,
    authors: false,
    dataProvider: false,
    documentType: false,
    publishedDate: false,
    updatedDate: false,
    language: false,
    publisher: false,
    fieldOfStudy: false,
  };

  public aggFields = Object.keys(this.options);

  constructor(
    private router: Router,
    private dialog: MatDialog,
    ) {}

  onAggregate() {
    const q = this.searchTerm.trim();
    if (!q) {
      this.dialog.open(SearchErrorDialogComponent, {
        data: { message: `Search term can't be empty — please add a valid keyword.` },
        panelClass: 'search-error-panel'
      });
      this.router.navigate(['/']);
      return;
    }

    // collect selected keys
    const aggs = Object.entries(this.options)
      .filter(([_,v]) => v)
      .map(([k,_]) => k);

    this.router.navigate(['/aggregate-result'], {
      queryParams: { q, aggs: aggs.join(',') }
    });
  }
}
