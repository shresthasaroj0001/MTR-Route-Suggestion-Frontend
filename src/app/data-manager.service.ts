import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { responseObj } from './model/responseObject';
import { searchParams } from './model/searchParams';
import { Station } from './model/Station';
import { StationLink } from './model/StationLink';

@Injectable({
  providedIn: 'root',
})
export class DataManagerService {
  constructor(private http: HttpClient) {}

  getAllStations(): Observable<Station[]> {
    return this.http.get<Station[]>(environment.userAPIBase + 'Station');
  }

  getRoute(passedParams : searchParams): Observable<responseObj> {
    return this.http.get<responseObj>(environment.userAPIBase + 'routesearch/FindShortestRoute',{
      params : {
        from : passedParams.from.toString(),
        to: passedParams.to.toString()
      }
    });
  }

}
