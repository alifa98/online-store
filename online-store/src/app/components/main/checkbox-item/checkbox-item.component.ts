import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkbox-item',
  templateUrl: './checkbox-item.component.html',
  styleUrls: ['./checkbox-item.component.css']
})
export class CheckboxItemComponent implements OnInit {

  constructor() { }
  @Input() label: string;
  @Input() name: string;
  @Input() value: string;


  ngOnInit(): void {
  }

}
