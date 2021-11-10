import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { Station } from './model/Station';

@Injectable({
  providedIn: 'root',
})
export class DataManagerService {
  constructor(private http: HttpClient) {}

  getAllStations(): Observable<Station[]> {
    return this.http.get<Station[]>(environment.userAPIBase + 'Station');
  }
}
