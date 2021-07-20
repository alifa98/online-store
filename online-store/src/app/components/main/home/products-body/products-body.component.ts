import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interface/Product';
import { Mock } from 'src/app/mockData';

@Component({
  selector: 'app-products-body',
  templateUrl: './products-body.component.html',
  styleUrls: ['./products-body.component.css']
})
export class ProductsBodyComponent implements OnInit {

  constructor() { }


  products: Product[] = Mock.getProducts();
  count: Number = 40;

  productPerPage: Number = 15;
  currentPage: Number = 1;

  ngOnInit(): void {
  }

}
