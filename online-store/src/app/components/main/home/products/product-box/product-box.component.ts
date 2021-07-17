import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent implements OnInit {

  constructor() { }

  @Input() price: string;
  @Input() title: string;
  @Input() category: string;
  @Input() imageAddress: string;
  @Input() productId: string;
  @Input() btnText: string;
  @Input() showSoldNumber: boolean;

  ngOnInit(): void {
  }

}
