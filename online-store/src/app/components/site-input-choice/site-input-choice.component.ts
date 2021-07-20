import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-site-input-choice',
  templateUrl: './site-input-choice.component.html',
  styleUrls: ['./site-input-choice.component.css']
})
export class SiteInputChoiceComponent implements OnInit {
  @Input() label: string;
  @Input() items: [];
  @Input() control: FormControl;

  constructor() { }

  ngOnInit(): void {
  }

}
