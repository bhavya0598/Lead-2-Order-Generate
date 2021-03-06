import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/car/models/car.model';
import { CarService } from '../../services/car.service';
import { Brand } from '../../models/brand.model';
import { Fuel } from '../../models/fuel.model';
import { Gearbox } from '../../models/gearbox.model';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.sass']
})
export class CarListComponent implements OnInit {

  cars: Car[];
  filterdCars: Car[] = [];
  selectedBrands: Brand[] = [];
  selectedFuelTypes: Fuel[] = [];
  selectedGearboxTypes: Gearbox[] = [];

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.cars = this.carService.getCars();
    this.filterdCars = this.cars;

    this.carService.changedBrand.subscribe(
      (res: {brand: Brand, checkedToUnchecked: boolean}) => {
        res.checkedToUnchecked ?
          this.removeElementFromArray(this.selectedBrands, res.brand) :
          this.selectedBrands.push(res.brand);
        this.carFilter();
    });

    this.carService.changedFuelType.subscribe(
      (res: {fuelType: Fuel, checkedToUnchecked: boolean}) => {
        res.checkedToUnchecked ?
          this.removeElementFromArray(this.selectedFuelTypes, res.fuelType) :
          this.selectedFuelTypes.push(res.fuelType);
        this.carFilter();
    });

    this.carService.changedGearboxType.subscribe(
      (res: {gearboxType: Gearbox, checkedToUnchecked: boolean}) => {
        res.checkedToUnchecked ?
          this.removeElementFromArray(this.selectedGearboxTypes, res.gearboxType) :
          this.selectedGearboxTypes.push(res.gearboxType);
        this.carFilter();
    });
  }

  carFilter(){
    this.filterdCars = this.cars.filter(car => {
      const fuelFilter = this.selectedFuelTypes.length > 0 ? this.selectedFuelTypes.includes(car.fuelbox) : true;
      const brandFilter = this.selectedBrands.length > 0 ? this.selectedBrands.includes(car.brand) : true;
      const gearboxFilter = this.selectedGearboxTypes.length > 0 ? this.selectedGearboxTypes.includes(car.gearbox) : true;
      return fuelFilter && brandFilter && gearboxFilter;
    });
  }

  removeElementFromArray(array: any[], ele: any){
    const index = array.indexOf(ele);
    array.splice(index,1);
  }

}
