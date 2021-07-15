import { HostListener, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.css']
})
export class BtnComponent implements OnInit {

  @Input() text: string;
  @Input() classes: string;
  @Input() onClickEventName: string;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener("click") onClick() {
    console.log("emit `onClickEventName`")
    // TODO: implement emit here and listener in products loading component
  }

}
