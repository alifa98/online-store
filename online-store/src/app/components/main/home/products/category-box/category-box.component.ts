import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interface/category';
import { Mock } from 'src/app/mockData';
import { ProductLoaderService } from 'src/app/services/product.load.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category-box',
  templateUrl: './category-box.component.html',
  styleUrls: ['./category-box.component.css']
})

export class CategoryBoxComponent implements OnInit {

  categories: Category[] = [];

  activeCategories: number[] = [];

  constructor(private productService: ProductService, private productLoaderService: ProductLoaderService) {

    this.productService.getCategories().subscribe(
      result => {
        this.categories = result;
      }
    )
  }

  ngOnInit(): void {

  }

  toggleCategory(id: number): void {
    if (this.activeCategories.indexOf(id) == -1) {
      this.activeCategories.push(id);
    }
    else {
      this.activeCategories.splice(this.activeCategories.indexOf(id), 1);
    }

    let toBeSentCategories = this.activeCategories;
    if (toBeSentCategories.length == 0) {
      toBeSentCategories = null;
    }

    this.productLoaderService.currentPage = 1;
    this.productLoaderService.updateProductsCategoresInFiltering(toBeSentCategories);
    this.productLoaderService.loadProducts();
  }


}
