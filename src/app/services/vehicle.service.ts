import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';
import { mapLegend, mapVehicle } from '../mappers/vahicle.mapper';
import { Legend } from '../models/legend.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private dataUrl = 'assets/data/cars.json';
  private http: HttpClient = inject(HttpClient);

  getVehicles(): Observable<{ vehicles: Vehicle[]; legend: Legend }> {
    return this.http.get<any>(this.dataUrl).pipe(
      map((data) => {
        const core = data[0].VehAvailRSCore;
        const vehicles = mapVehicle(core?.VehVendorAvails || []);
        const legend = mapLegend(core?.VehRentalCore);
        return {
          vehicles,
          legend
        };
      })
    );
  }

}
