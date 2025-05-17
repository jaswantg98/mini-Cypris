import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './components/results/results.component';
import { SearchComponent } from './components/search/search.component';
import { InfoComponent } from './components/info/info.component';

const routes: Routes = [
  { path: '', component: SearchComponent},
  { path: 'result', component: ResultsComponent },
  { path: 'about/:id', component: InfoComponent },
  { path: '**',     redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
