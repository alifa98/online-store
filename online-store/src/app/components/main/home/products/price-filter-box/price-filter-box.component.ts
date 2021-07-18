import { Component, OnInit } from '@angular/core';
import { range } from 'rxjs';

@Component({
  selector: 'app-price-filter-box',
  templateUrl: './price-filter-box.component.html',
  styleUrls: ['./price-filter-box.component.css']
})
export class PriceFilterBoxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  rangeValue: Number = 100000;;

  onChange(event: any): void {
    this.rangeValue = event.target.value;
  }

  // Emmit On change
}
