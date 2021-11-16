import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouteConnectionComponent } from './route-connection/route-connection.component';
import { SearchResultComponent } from './search-result/search-result.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'route-connection', component: RouteConnectionComponent },
  { path: 'search', component: SearchResultComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
