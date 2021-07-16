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

  ngOnInit(): void {
  }

}
