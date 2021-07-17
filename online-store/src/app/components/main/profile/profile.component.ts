import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Receipt } from 'src/app/interface/Receipt';
import { TableHeader as TableHeader } from 'src/app/interface/TableHeaders';
import { Mock } from 'src/app/mockData';
import { UiService } from 'src/app/services/ui.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm = new FormGroup({
    firstName: new FormControl('سروش', [Validators.required, Validators.maxLength(255)]),
    lastName: new FormControl('فرجی', [Validators.required, Validators.maxLength(255)]),
    password: new FormControl('123test', [Validators.required, Validators.minLength(8),
                                                        Validators.maxLength(255),
      Validators.pattern('([a-zA-Z]+[0-9]+)|([0-9]+[a-zA-Z]+)')]),
    address: new FormControl('تهران، تهران، امیرکبیر', [Validators.required, Validators.maxLength(1000)]),
  });

  currentProfileStatus = 'پروفایل';
  subscription: Subscription;

  receipts: Receipt[] = Mock.getReceipts();
  headers: TableHeader[] = [
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

  constructor(private UiService: UiService) {
    this.subscription = this.UiService.onTabChange().subscribe(
      (value) => (this.currentProfileStatus = value)
    );
  }

  ngOnInit(): void { }
}
