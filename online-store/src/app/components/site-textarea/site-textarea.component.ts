import { Component, Input, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-site-textarea',
  templateUrl: './site-textarea.component.html',
  styleUrls: ['./site-textarea.component.css'],
})
export class SiteTextareaComponent implements OnInit {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() value: string;
  @Input() control: FormControl;

  constructor() {}

  ngOnInit(): void {}
}
