import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchString: string = '';
  title = 'web422-a4';
  token:any;

  handleSearch() {
    // if (this.searchString != '')
    //   this.router.navigate(['/search'], {
    //     queryParams: { q: this.searchString },
    //   });
    //   this.searchString="";
  }

  logout()
  {
    localStorage.clear();
//    this.router.navigate(['/login']);
  }

}
