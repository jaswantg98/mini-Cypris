import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchTerm: string = '';
  limit?: number;

  constructor(private router: Router) {}

  onSearch() {
    const term = this.searchTerm.trim();
    // if (!term) {
    //   return;
    // }
    const queryParams: any = { q: term };
    if (this.limit && this.limit > 0) {
      queryParams.limit = this.limit;
    }
    // Navigate to /result?q=term
    this.router.navigate(['/result'], { queryParams });
  }
}
