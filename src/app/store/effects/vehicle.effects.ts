import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { VehicleService } from '../../services/vehicle.service';
import * as VehicleActions from '../actions/vehicle.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class VehicleEffects {

  private actions$ = inject(Actions);
  private vehicleService = inject(VehicleService);
  
  loadVehicles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VehicleActions.loadVehicles),
      mergeMap(() =>
        this.vehicleService.getVehicles().pipe(
          map(({ vehicles, legend }) =>
            VehicleActions.loadVehiclesSuccess({ vehicles, legend })
          ),
          catchError((error) =>
            of(VehicleActions.loadVehiclesFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
