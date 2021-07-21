import { HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.css']
})
export class BtnComponent implements OnInit {

  @Input() text: string;
  @Input() type: string;
  @Input() disabled: boolean;
  @Input() classes: string;
  @Output() onBtnClick = new EventEmitter<any>();

  constructor() {
    this.disabled = false;
  }

  ngOnInit(): void {
  }

  onClick(e) {
    this.onBtnClick.emit(e);
  }

}
