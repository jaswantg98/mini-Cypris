import { Component } from '@angular/core';
import { CoreApiService } from 'src/services/core-api.service'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchTerm: string = '';
  searchResults: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private coreApiService: CoreApiService) {}

  onSearch() {
    if (!this.searchTerm.trim()) {
      this.searchResults = [];
      return;
    }

    console.log("Search term: ", this.searchTerm);
    

    this.isLoading = true;
    this.errorMessage = '';
    this.coreApiService.searchOutputsByKeywords(this.searchTerm).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.searchResults = response.results || [];
        console.log("no error, result: ", this.searchResults);
        
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Error fetching results';
        console.error(error);
      }
    });
  }
}
