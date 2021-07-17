import { Component, OnInit, Input } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-site-input',
  templateUrl: './site-input.component.html',
  styleUrls: ['./site-input.component.css'],
})
export class SiteInputComponent implements OnInit {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() value: string;
  @Input() type: string;
  @Input() stretchLabel: boolean;
  @Input() control: FormControl;
  @Input() patternError: string;

  constructor() {}

  ngOnInit(): void {}
}
