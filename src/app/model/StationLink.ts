export class StationLink {
  id: number;
  subwayLine: number;
  fare: number;
  duration: {
    totalSeconds: number;
  };
  fromStation: {
    id: number;
    name: string;
  };
  toStation: {
    id: number;
    name: string;
  };
  fromStationId: 8;
  toStationId: number;
}
