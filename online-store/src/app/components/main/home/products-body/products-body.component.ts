import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interface/Product';
import { ProductFiltering } from 'src/app/interface/ProductFiltering';
import { Mock } from 'src/app/mockData';
import { ProductLoaderService } from 'src/app/services/product.load.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-body',
  templateUrl: './products-body.component.html',
  styleUrls: ['./products-body.component.css']
})
export class ProductsBodyComponent implements OnInit {

  selectedProductId: number;
  showModal: boolean = false;

  productPerPage: number = 15;
  currentPage: number = 1;
  count: number = 40;

  products: Product[];

  constructor(private productLoaderService: ProductLoaderService) {
    productLoaderService.loadProducts();

    this.productLoaderService.onProductFilteringChange().subscribe(
      (result) => {
        this.products = result[0].products
        this.currentPage = productLoaderService.currentPage;
        this.count = productLoaderService.count;
        this.productPerPage = productLoaderService.productPerPage;
      }
    );

  }

  ngOnInit(): void {
  }


  showBuyingModal(id) {
    this.selectedProductId = id;
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }


}
