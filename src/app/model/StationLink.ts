export class StationLink {
  id: number;
  subwayLine: number;
  fare: number;
  duration: {
    totalSeconds: number;
  };
  fromStationId: 8;
  toStationId: number;
}