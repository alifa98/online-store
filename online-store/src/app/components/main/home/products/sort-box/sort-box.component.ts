import { Component, OnInit } from '@angular/core';
import { ProductLoaderService } from 'src/app/services/product.load.service';

@Component({
  selector: 'app-sort-box',
  templateUrl: './sort-box.component.html',
  styleUrls: ['./sort-box.component.css']
})
export class SortBoxComponent implements OnInit {

  activeSort: string = '';

  constructor(private productLoaderService: ProductLoaderService) {

    this.activeSort = 'sold_amount'
  }

  ngOnInit(): void {
  }

  loadProductSortedBy(sortType: string): void {
    if (sortType == this.activeSort) {
      this.activeSort = null;
    } else {
      this.activeSort = sortType;
    }
    this.productLoaderService.updateProductsSortByInFiltering(this.activeSort);
    this.productLoaderService.loadProducts();
  }


}
