import { Component } from '@angular/core';
import { CoreApiService } from 'src/services/core-api.service'; 
import { Observable } from 'rxjs';
import { Result } from 'src/app/models/result.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchTerm: string = '';
  searchResults: Result[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private coreApiService: CoreApiService) {}

  getAuthorNames(paper: Result): string {
    return paper.authors?.map(author => author.name).join(', ') || 'N/A';
  }
  

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
