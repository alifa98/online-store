import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interface/Product';
import { ProductFiltering } from 'src/app/interface/ProductFiltering';
import { Mock } from 'src/app/mockData';
import { ProductLoaderService } from 'src/app/services/product.load.service';
import { ProductService } from 'src/app/services/product.service';
import {UserService} from '../../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products-body',
  templateUrl: './products-body.component.html',
  styleUrls: ['./products-body.component.css']
})
export class ProductsBodyComponent implements OnInit {

  selectedProductId: number;
  showModal = false;

  productPerPage = 15;
  currentPage = 1;
  count = 40;

  products: Product[];

  isLoggedIn: boolean;

  constructor(private productLoaderService: ProductLoaderService, private userService: UserService, private router: Router) {
    this.userService.updateLoginStatus();
    this.userService.onLoginChange().subscribe(
      (value => {
      this.isLoggedIn = value;
      })
    );

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


  showBuyingModal(id): void {
    this.selectedProductId = id;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  openLoginPage(): void {
    this.router.navigate(['login']);
  }
}
