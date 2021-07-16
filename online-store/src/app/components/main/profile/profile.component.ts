import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Receipt } from 'src/app/interface/Receipt';
import { Mock } from 'src/app/mockData';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentProfileStatus = 'پروفایل';
  subscription: Subscription;

  receipts: Receipt[] = Mock.getReceipts();
  headers: string[] = [
    'کد پیگیری',
    'کالا',
    'قیمت پرداخت شده',
    'آدرس ارسال شده',
  ];

  constructor(private UiService: UiService) {
    this.subscription = this.UiService.onTabChange().subscribe(
      (value) => (this.currentProfileStatus = value)
    );
  }

  ngOnInit(): void { }
}
