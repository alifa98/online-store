import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  constructor() { }

  @Input() totalItems: number;
  @Input() itemsPerPage: number;
  @Input() currentPage: number;

  getPagesNumbers(): number[] {
    return Array.from({ length: Math.ceil(this.totalItems / this.itemsPerPage) }, (_, i) => i + 1)
  }

  loadProductPage(pageNumber: number) {
    alert(pageNumber);
  }

  ngOnInit(): void {
  }

}
