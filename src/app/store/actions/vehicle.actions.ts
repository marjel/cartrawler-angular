import { createAction, props } from '@ngrx/store';
import { Vehicle } from '../../models/vehicle.model';
import { Legend } from '../../models/legend.model';

export const loadVehicles = createAction('[Vehicle] Load Vehicles');

export const loadVehiclesSuccess = createAction(
  '[Vehicle] Load Vehicles Success',
  props<{ vehicles: Vehicle[]; legend: Legend }>()
);

export const loadVehiclesFailure = createAction(
  '[Vehicle] Load Vehicles Failure',
  props<{ error: string }>()
);