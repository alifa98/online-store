import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from '../../../services/ui.service';
import { Receipt } from '../../../interface/Receipt';
import { Mock } from '../../../mockData';
import { TableHeader } from '../../../interface/TableHeaders';
import { Category } from 'src/app/interface/category';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  currentAdminStatus = 'لیست کالا ها';
  subscription: Subscription;
  receipts: Receipt[] = Mock.getReceipts();
  receiptHeaders: TableHeader[] = [
    {
      key: 'trackingCode',
      name: 'کد پیگیری'
    },
    {
      key: 'productName',
      name: 'کالا'
    },
    {
      key: 'amount',
      name: 'قیمت پرداخت شده'
    },
    {
      key: 'address',
      name: 'آدرس ارسال شده'
    },
  ];
  categoryHeaders: TableHeader[] = [
    {
      key: 'categoryName',
      name: 'نام دسته بندی'
    }
  ];
  categories: Category[] = Mock.getCategories();

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
