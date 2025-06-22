import { Legend } from '../models/legend.model';
import { Vehicle } from '../models/vehicle.model';

export interface VehicleState {
  vehicles: Vehicle[];
  legend: Legend | null;
  loading: boolean;
  error: string | null;
}

export const initialVehicleState: VehicleState = {
  vehicles: [],
  legend: null,
  loading: false,
  error: null
};