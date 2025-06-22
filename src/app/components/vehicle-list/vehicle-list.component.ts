import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleComponent } from '../vehicle/vehicle.component';
import { Observable, Subject, takeUntil } from 'rxjs';
import { VehicleFacade } from '../../store/vehicle.facade';
import { Vehicle } from '../../models/vehicle.model';
import { Legend } from '../../models/legend.model';
import { LegendComponent } from '../legend/legend.component';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, VehicleComponent, LegendComponent],
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss'],
})
export class VehicleListComponent implements OnInit, OnDestroy {
  private facade = inject(VehicleFacade);

  vehicles$: Observable<Vehicle[]> = this.facade.vehicles$;
  legend$: Observable<Legend | null> = this.facade.legend$;
  loading$: Observable<boolean> = this.facade.loading$;

  private destroy$ = new Subject<void>();

  sortedVehicles: Vehicle[] = [];

  onSortChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;

    this.sortVehicles(selectedValue);
  }

  /**
   * 
   * TODO -> prepare enum with the sort types, and move the sort implementation to the ngrx.store
   * also to remember the previous state of that
   * 
   */
  sortVehicles(type: string): void {
    this.sortedVehicles.sort((a, b) => {
      switch (type) {
        case 'price-asc':
          return a.rateTotalAmount - b.rateTotalAmount;
        case 'price-desc':
          return b.rateTotalAmount - a.rateTotalAmount;
        case 'name-asc':
          return a.makeModel.localeCompare(b.makeModel);
        case 'name-desc':
          return b.makeModel.localeCompare(a.makeModel);
        default:
          return 0;
      }
    });
  }

  ngOnInit(): void {
    this.facade.loadVehicles();
    this.facade.vehicles$
      .pipe(takeUntil(this.destroy$))
      .subscribe((vehicles) => {
        this.sortedVehicles = [...vehicles];
        this.sortVehicles('price-asc');
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackByFn(index: number, vehicle: Vehicle): string {
    return vehicle.vehicleCode + '-' + vehicle.vendorName;
  }

}
