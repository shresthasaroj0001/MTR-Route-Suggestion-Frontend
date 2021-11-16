import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatOptionModule } from '@angular/material/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SearchResultComponent } from './search-result/search-result.component';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { RouteConnectionComponent } from './route-connection/route-connection.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, SearchResultComponent, RouteConnectionComponent, AboutComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    NgxGraphModule,
    MatSnackBarModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatChipsModule,
    FlexLayoutModule,
    MatOptionModule, 
    MatSelectModule, 
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
