import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchTerm: string = '';

  constructor(private router: Router) {}

  onSearch() {
    const term = this.searchTerm.trim();
    if (!term) {
      return;
    }
    // Navigate to /result?q=term
    this.router.navigate(['/result'], { queryParams: { q: term } });
  }
}
