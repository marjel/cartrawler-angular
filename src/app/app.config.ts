import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { vehicleReducer } from './store/reducers/vehicle.reducer';
import { VehicleEffects } from './store/effects/vehicle.effects';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes), 
    provideStore({
      vehicles: vehicleReducer
    }),
    provideEffects([VehicleEffects]), 
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};
