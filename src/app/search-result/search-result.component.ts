import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataManagerService } from '../data-manager.service';
import { searchParams } from '../model/searchParams';
import { MatSnackBar } from '@angular/material/snack-bar';
import { responseObj } from '../model/responseObject';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  searchParams: searchParams = { from: 0, to: 0, SortBy: '' };
  sub: any;
  loading: boolean = null;

  constructor(
    private dataService: DataManagerService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loading = true;

    try {
      this.sub = this.route.queryParams.subscribe((params) => {
        this.searchParams.from = params['from'] || 0;
        this.searchParams.to = params['to'] || 0;
        this.searchParams.SortBy = params['SortBy'] || '';

        this.fetchData();
      });
    } catch (e) {
      this.snackBar.open('Invalid Stations', 'Failed', {
        duration: 1500,
      });
    }
  }

  fetchData() {
    console.log('fetch');

    this.loading = true;
    this.dataService.getRoute(this.searchParams).subscribe(
      (response : responseObj) => {
        if (response.isSuccess) {
          console.log(response.data);
        } else {
          this.snackBar.open(response.message, 'Failed', {
            duration: 1500,
          });
        }
        this.loading = false;
      },
      (err) => {
        this.loading = false;
      }
    );
  }
}
