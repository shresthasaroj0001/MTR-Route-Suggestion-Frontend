import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataManagerService } from '../data-manager.service';
import { searchParams } from '../model/searchParams';
import { MatSnackBar } from '@angular/material/snack-bar';
import { responseObj } from '../model/responseObject';
import { StationLink } from '../model/StationLink';
import {
  Edge,
  Node,
  Layout,
  DagreNodesOnlyLayout,
  ClusterNode,
} from '@swimlane/ngx-graph';
import * as shape from 'd3-shape';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  searchParams: searchParams = { from: 0, to: 0, filterby: '' };
  sub: any;
  loading: boolean = null;

  zoomToFit$: Subject<boolean> = new Subject();
  fitGraph() {
    this.zoomToFit$.next(true);
  }

  constructor(
    private dataService: DataManagerService,
    private route: ActivatedRoute,
    private routee: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loading = true;

    try {
      this.sub = this.route.queryParams.subscribe((params) => {
        this.searchParams.from = params['from'] || 0;
        this.searchParams.to = params['to'] || 0;
        this.searchParams.filterby = params['filterby'] || '';

        this.fetchData();
      });
    } catch (e) {
      this.snackBar.open('Invalid Stations', 'Failed', {
        duration: 1500,
      });
    }
  }

  public nodes: Node[] = [];
  public links: Edge[] = [];
  stationLink: StationLink[] = [];

  public layoutSettings = {
    orientation: 'TB',
  };
  public curve: any = shape.curveLinear;
  public layout: Layout = new DagreNodesOnlyLayout();

  //transport detail
  numberOfSubwayInterchange: number = 0;
  tempDate : Date = new Date(0, 0, 0, 0, 0, 0, 0);;//  date to store duration of travel
  fare: number = 0;

  convertHMS(timeString) {
    const arr = timeString.split(':');
    const seconds = arr[0] * 3600 + arr[1] * 60 + +arr[2];
    return seconds;
  }

  fetchData() {
    console.log(this.searchParams);
    
    console.log('fetch');
    this.loading = true;

    this.dataService.getRoute(this.searchParams).subscribe(
      (response: responseObj) => {
        console.log(response);

        if (response.isSuccess) {
          this.stationLink = response.data;

          //collect edges,node,
          this.numberOfSubwayInterchange = 0;
          let subwayChange = 0;
          let durationOfTravel = 0;//seconds
          for (const link of this.stationLink) {
            //duration
            durationOfTravel += this.convertHMS(link.duration);

            //fare
            this.fare += link.fare;

            //subway interchange count
            if (link.subwayLine != subwayChange) {
              this.numberOfSubwayInterchange++;
              subwayChange = link.subwayLine;
            }

            //creating edge for graph
            const edge: Edge = {
              source: link.fromStationId.toString(),
              target: link.toStationId.toString(),
              label: '',
              data: {
                linkText: '$' + link.fare,
              },
            };
            this.links.push(edge);
          }
          this.tempDate.setSeconds(durationOfTravel);

          //creating node for graph
          let tempNodes: Node[] = [];
          response.data.forEach(function (arrayItem) {
            let graph_node: Node = {
              id: arrayItem.fromStation.id.toString(),
              label: arrayItem.fromStation.name,
            };
            tempNodes.push(graph_node);

            let graph_node1: Node = {
              id: arrayItem.toStation.id.toString(),
              label: arrayItem.toStation.name,
            };
            tempNodes.push(graph_node1);
          });

          //Unique Nodes
          this.nodes = tempNodes.filter(
            (test, index, array) =>
              index === array.findIndex((findTest) => findTest.id === test.id)
          );
          this.loading = false;

          // console.log(this.links);
          // console.log(this.nodes);
        } else {
          this.loading = false;

          this.snackBar.open(response.message, 'Error', {
            duration: 1500,
          });

          this.routee.navigate(['/home']);
        }
      },
      (err) => {
        this.loading = false;
      }
    );
  }
}
