import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-yellow-button',
  templateUrl: './yellow-button.component.html',
  styleUrls: ['./yellow-button.component.css'],
})
export class YellowButtonComponent implements OnInit {
  @Input() text: string;
  @Input() small: boolean;

  constructor() {}

  ngOnInit(): void {}
}
