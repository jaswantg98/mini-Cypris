import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SearchErrorDialogComponent } from '../search-error-dialog/search-error-dialog.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  mode: 'search' | 'agg' = 'search'; 
  searchTerm: string = '';
  limit: number = 10;

  fields = {
    author: false,
    title: false,
    id: false,
    year: false
  };

  constructor(
    private router: Router,
    private dialog: MatDialog,
  ) {}

  onSearch() {
    const term = this.searchTerm.trim();

    if (!term) {
      this.dialog.open(SearchErrorDialogComponent, {
        data: { message: `Search term can't be empty — please add a valid keyword.` },
        panelClass: 'search-error-panel'
      });
      this.router.navigate(['/']);
      return;
    }
    
    let query = '';
    const clauses: string[] = [];
    
    // If no filters are selected, search in all fields
    const noFiltersSelected = !Object.values(this.fields).some(value => value);
    
    if (noFiltersSelected) {
      query = term;
    } else {
      if (this.fields.author) clauses.push(`author:"${term}"`);
      if (this.fields.title) clauses.push(`title:"${term}"`);
      if (this.fields.id) clauses.push(`id:"${term}"`);
      if (this.fields.year) clauses.push(`yearPublished:"${term}"`);
      query = clauses.join(' OR ');
    }

    const queryParams: any = { q: query };
    if (this.limit && this.limit > 0) {
      queryParams.limit = this.limit;
    }
    
    this.router.navigate(['/result'], { queryParams });
  }
}