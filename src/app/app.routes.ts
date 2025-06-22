import { Routes } from '@angular/router';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';

export const routes: Routes = [
  {
    path: '',
    component: VehicleListComponent,
  },
  {
    path: 'vehicle/:code',
    component: VehicleDetailsComponent,
  },
  {
    path: '**',
    redirectTo: '',
  }
];
