import { Component, Input, OnInit } from '@angular/core';
import { ProductLoaderService } from 'src/app/services/product.load.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {


  @Input() totalItems: number;
  @Input() itemsPerPage: number;
  @Input() currentPage: number;

  constructor(private productLoaderService: ProductLoaderService) {
  }

  ngOnInit(): void {
  }

  getPagesNumbers(): number[] {
    return Array.from({ length: Math.ceil(this.totalItems / this.itemsPerPage) }, (_, i) => i + 1)
  }

  loadProductPage(pageNumber: number) {
    this.productLoaderService.updateProductsPageInFiltering(pageNumber);
    this.productLoaderService.loadProducts()
  }


}
