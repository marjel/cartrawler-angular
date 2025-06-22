import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { VehicleFacade } from '../../store/vehicle.facade';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-vehicle-details',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './vehicle-details.component.html'
})
export class VehicleDetailsComponent {
  private route = inject(ActivatedRoute);
  private facade = inject(VehicleFacade);

  vehicle$ = this.route.paramMap.pipe(
    map(params => params.get('code')),
    map(id => this.facade.getVehicleById(id!))
  );
}
