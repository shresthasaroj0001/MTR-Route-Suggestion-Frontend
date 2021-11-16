import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { DataManagerService } from '../data-manager.service';
import { StationLink } from '../model/StationLink';
import { Edge, Node, Layout, DagreNodesOnlyLayout , ClusterNode } from '@swimlane/ngx-graph';
import * as shape from 'd3-shape';
import { Subject } from 'rxjs';
import { responseObj } from '../model/responseObject';

@Component({
  selector: 'app-route-connection',
  templateUrl: './route-connection.component.html',
  styleUrls: ['./route-connection.component.css']
})
export class RouteConnectionComponent implements OnInit {
  center$: Subject<boolean> = new Subject();
  sub: any;
  loading: boolean = null;

  centerGraph() {
    this.center$.next(true)
}

  zoomToFit$: Subject<boolean> = new Subject();
  fitGraph() {
    this.zoomToFit$.next(true)
}

  constructor(
    private dataService: DataManagerService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.fetchData();
  }

  public nodes: Node[] = [];
  public links: Edge[] = [];
  stationLink: StationLink[] = [];

  public layoutSettings = {
    orientation: 'TB'
  };
  public curve: any = shape.curveLinear;
  public layout: Layout = new DagreNodesOnlyLayout();

  //transport detail
  numberOfSubwayInterchange:number=0;
  durationOfTravel:number=0;
  fare: number=0;

  fetchData() {
    console.log('fetch');
    this.loading = true;

    this.dataService.getAllRoute().subscribe(
      (response: responseObj) => {
        console.log(response);

        if (response.isSuccess) {
          this.stationLink = response.data;

          //collect edges,node,
          this.numberOfSubwayInterchange = 0;
          let subwayChange = 0;
          for (const link of this.stationLink) {
            //duration
            this.durationOfTravel+=link.duration.totalSeconds;

            //fare
            this.fare += link.fare;

            //subway interchange count
            if(link.subwayLine != subwayChange)
            {
              this.numberOfSubwayInterchange++;
              subwayChange = link.subwayLine;
            }

            //creating edge for graph
            const edge: Edge = {
              source: link.fromStationId.toString(),
              target: link.toStationId.toString(),
              label: '',
              data: {
                linkText: '$' +link.fare,
              }
            };
            this.links.push(edge);
          }

          //creating node for graph
          let tempNodes : Node[]=[];
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
          this.nodes = tempNodes.filter((test, index, array) =>
            index === array.findIndex((findTest) =>
                findTest.id === test.id
            )
          );
          
          console.log(this.links);
          console.log(this.nodes);

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
