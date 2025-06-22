import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VehicleState } from '../vehicle.state';

export const selectVehicleState = createFeatureSelector<VehicleState>('vehicles');

export const selectAllVehicles = createSelector(
  selectVehicleState,
  (state) => state.vehicles
);

export const selectLegend = createSelector(
  selectVehicleState,
  (state) => state.legend
);


export const selectVehiclesLoading = createSelector(
  selectVehicleState,
  (state) => state.loading
);

export const selectVehiclesError = createSelector(
  selectVehicleState,
  (state) => state.error
);