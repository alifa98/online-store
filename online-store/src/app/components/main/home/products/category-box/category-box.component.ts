import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interface/category';
import { Mock } from 'src/app/mockData';

@Component({
  selector: 'app-category-box',
  templateUrl: './category-box.component.html',
  styleUrls: ['./category-box.component.css']
})
export class CategoryBoxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  categories: Category[] = Mock.getCategories();
}
