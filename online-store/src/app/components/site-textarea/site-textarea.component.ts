import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-site-textarea',
  templateUrl: './site-textarea.component.html',
  styleUrls: ['./site-textarea.component.css']
})
export class SiteTextareaComponent implements OnInit {
  @Input() label: string;
  @Input() placeholder: string;

  constructor() { }

  ngOnInit(): void {
  }

}
