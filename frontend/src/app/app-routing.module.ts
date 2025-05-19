import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './components/results/results.component';
import { SearchComponent } from './components/search/search.component';
import { InfoComponent } from './components/info/info.component';
import { HomeComponent } from './components/home/home.component';
import { AggregateResultComponent } from './components/aggregate-result/aggregate-result.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'result', component: ResultsComponent },
  { path: 'about/:id', component: InfoComponent },
  { path: 'aggregate-result', component: AggregateResultComponent },
  { path: '**',     redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
