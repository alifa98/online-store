import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {UiService} from '../../../services/ui.service';
import {Receipt} from '../../../interface/Receipt';
import {Mock} from '../../../mockData';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  currentAdminStatus = 'لیست کالا ها';
  subscription: Subscription;
  receipts: Receipt[] = Mock.getReceipts();
  receiptHeaders: string[] = [
    'کد پیگیری',
    'کالا',
    'قیمت پرداخت شده',
    'آدرس ارسال شده',
  ];
  categoryHeaders: string[] = [
    'نام دسته بندی',
    'عملیات',
  ];

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
