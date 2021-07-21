import { Component, OnInit } from '@angular/core';
import { range } from 'rxjs';
import { ProductLoaderService } from 'src/app/services/product.load.service';

@Component({
  selector: 'app-price-filter-box',
  templateUrl: './price-filter-box.component.html',
  styleUrls: ['./price-filter-box.component.css']
})
export class PriceFilterBoxComponent implements OnInit {

  rangeValue: number = 1000;;

  constructor(private productLoaderService: ProductLoaderService) {
  }

  ngOnInit(): void {
  }


  onChange(event: any): void {
    this.rangeValue = event.target.value;

    this.productLoaderService.updateProductsMaxPricenFiltering(this.rangeValue);
    this.productLoaderService.loadProducts()
  }

}
