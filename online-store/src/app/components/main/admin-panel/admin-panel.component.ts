import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {UiService} from '../../../services/ui.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  currentAdminStatus = 'لیست کالا ها';
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onTabChange().subscribe(
      (value => {
        this.currentAdminStatus = value;
      })
    );
  }

  ngOnInit(): void {
  }

}
