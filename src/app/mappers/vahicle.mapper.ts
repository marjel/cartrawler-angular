import { Legend } from '../models/legend.model';
import { Vehicle } from '../models/vehicle.model';

export function mapVehicle(vendorAvails: any): Vehicle[] {

  return vendorAvails.flatMap((vendor: any) => {
    const vendorName = vendor.Vendor['@Name'];
    const vendorCode = vendor.Vendor['@Code'];

    return vendor.VehAvails.map((veh: any): Vehicle => ({
      vendorName,
      vendorCode,
      status: veh['@Status'],
      makeModel: veh.Vehicle.VehMakeModel['@Name'],
      pictureUrl: veh.Vehicle.PictureURL,
      airConditionInd: veh.Vehicle['@AirConditionInd'] === 'true',
      transmissionType: veh.Vehicle['@TransmissionType'],
      fuelType: veh.Vehicle['@FuelType'],
      driveType: veh.Vehicle['@DriveType'],
      passengerQuantity: veh.Vehicle['@PassengerQuantity'],
      baggageQuantity: veh.Vehicle['@BaggageQuantity'],
      doorCount: veh.Vehicle['@DoorCount'],
      vehicleCode: veh.Vehicle['@Code'],
      rateTotalAmount: +veh.TotalCharge['@RateTotalAmount'],
      estimatedTotalAmount: +veh.TotalCharge['@EstimatedTotalAmount'],
      currencyCode: veh.TotalCharge['@CurrencyCode']
    }));
  });
}

export function mapLegend(core: any): Legend {

  return {
    pickUpDate: core['@PickUpDateTime'],
    returnDate: core['@ReturnDateTime'],
    pickUpLocation: core?.PickUpLocation['@Name'],
    returnLocation: core?.ReturnLocation['@Name']
  };
}
