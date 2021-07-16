import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Receipt } from 'src/app/Receipt';
import { UiService } from 'src/app/services/ui.service';
import { RECEIPTS } from '../../../mock-receipts';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentProfileStatus = 'پروفایل';
  subscription: Subscription;

  receipts: Receipt[] = RECEIPTS;
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

  ngOnInit(): void {}
}
