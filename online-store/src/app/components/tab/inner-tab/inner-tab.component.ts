import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-inner-tab',
  templateUrl: './inner-tab.component.html',
  styleUrls: ['./inner-tab.component.css'],
})
export class InnerTabComponent implements OnInit {
  @Input() text: String;
  @Input() start: boolean;
  @Input() end: boolean;
  @Input() name: String;
  @Input() active: boolean;

  @Output() tabItemClick = new EventEmitter();

  subscription: Subscription;

  constructor(private UiService: UiService) {
    this.subscription = this.UiService.onProfileTabChange().subscribe(
      (value) => {
        if (value == this.name) this.active = true;
        else this.active = false;
      }
    );
  }

  ngOnInit(): void {}

  onClick(): void {
    this.tabItemClick.emit();
  }
}
