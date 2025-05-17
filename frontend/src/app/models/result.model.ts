import { Author } from './author.model'; 
import { DataProvider } from './data-provider.model';
import { Link } from './link.model';

export interface Result {
  id: number;
  title: string;
  authors: Author[];
  abstract: string;
  downloadUrl: string;
  publishedDate: string;
  yearPublished: number;
  dataProviders: DataProvider[];
  links: Link[];
  publisher: string;
  createdDate: string;
}
