import { createReducer, on } from '@ngrx/store';
import * as VehicleActions from '../actions/vehicle.actions';
import { VehicleState, initialVehicleState } from '../vehicle.state';

export const vehicleReducer = createReducer(
  initialVehicleState,
  on(VehicleActions.loadVehicles, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(VehicleActions.loadVehiclesSuccess, (state, { vehicles, legend }) => ({
    ...state,
    legend,
    vehicles,
    loading: false
  })),
  on(VehicleActions.loadVehiclesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);