import { Component, Input, inject } from '@angular/core';
import { Vehicle } from '../../models/vehicle.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle',
  imports: [CommonModule],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.scss'
})
export class VehicleComponent {

  private router: Router = inject(Router);

  @Input() vehicle!: Vehicle;

  goToDetails(): void {
    this.router.navigate(['/vehicle', this.vehicle.vehicleCode]);
  }

}
