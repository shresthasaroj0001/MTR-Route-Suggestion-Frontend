import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataManagerService } from '../data-manager.service';
import { Station } from '../model/Station';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private dataService: DataManagerService,
    private router: Router
  ) {}

  optionStations: Station[] = [];

  keywordfromcurrentStation: any;
  fromStationOptions: Station[] = [];
  isValidfromStation: boolean = null;
  fromStationId: number = 0;

  keywordtoStation: any;
  toStationOptions: Station[] = [];
  isValidToStation: boolean = false;
  toStationId: number = 0;

  sub: any;

  ngOnInit() {
    this.sub = this.dataService.getAllStations().subscribe(
      (data) => {
        this.optionStations = data;
        this.fromStationOptions = data;
        this.toStationOptions = data;
        console.log(this.optionStations);
      },
      (err) => console.log(err)
    );
  }

  doFilter() {
    this.fromStationId = 0;
    this.isValidfromStation = false;
    console.log('hi ', this.keywordfromcurrentStation);
    this.fromStationOptions = this.optionStations.filter(
      (x) =>
        x.name.toLocaleLowerCase().includes(this.keywordfromcurrentStation) &&
        x.id != this.toStationId
    );
  }

  onSelectionChangedFromStation(event: MatAutocompleteSelectedEvent) {
    this.fromStationId = this.optionStations.find(
      (x) => x.name == event.option.value
    ).id;
    if (this.fromStationId == undefined) {
      this.fromStationId = 0;
      this.isValidfromStation = false;
    } else this.isValidfromStation = true;
  }

  doFilterTo() {
    this.toStationId = 0;
    this.isValidToStation = false;
    this.toStationOptions = this.optionStations.filter(
      (x) =>
        x.name.toLocaleLowerCase().includes(this.keywordtoStation) &&
        x.id != this.fromStationId
    );
  }

  onSelectionChangedToStation(event: MatAutocompleteSelectedEvent) {
    this.toStationId = this.optionStations.find(
      (x) => x.name == event.option.value
    ).id;
    if (this.toStationId == undefined) {
      this.toStationId = 0;
      this.isValidToStation = false;
    } else this.isValidToStation = true;
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
