import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadVehicles } from './actions/vehicle.actions';
import {
  selectAllVehicles,
  selectVehiclesLoading,
  selectVehiclesError,
  selectLegend
} from './selectors/vehicle.selectors';
import { Vehicle } from '../models/vehicle.model';

@Injectable({ providedIn: 'root' })
export class VehicleFacade {

  private store = inject(Store);

  readonly vehicles$ = this.store.select(selectAllVehicles);
  readonly legend$ = this.store.select(selectLegend);
  readonly loading$ = this.store.select(selectVehiclesLoading);
  readonly error$ = this.store.select(selectVehiclesError);

  loadVehicles(): void {
    this.store.dispatch(loadVehicles());
  }
  getVehicleById(id: string): Vehicle | undefined {
    let snapshot: Vehicle[] = [];
    this.vehicles$.subscribe(list => snapshot = list).unsubscribe();
    return snapshot.find(v => v.vehicleCode === id);
  }
}
