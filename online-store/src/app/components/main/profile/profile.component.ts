import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Receipt } from 'src/app/interface/Receipt';
import { TableHeader as TableHeader } from 'src/app/interface/TableHeaders';
import { Mock } from 'src/app/mockData';
import { UiService } from 'src/app/services/ui.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8),
                                                          Validators.maxLength(255),
        Validators.pattern('([a-zA-Z]+[0-9]+)|([0-9]+[a-zA-Z]+)')]),
      address: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
      });
  currentProfileStatus = 'پروفایل';
  currentBalance: number;
  subscription: Subscription;

  // modal:
  showModal = false;
  modalText: string;
  modalError: boolean;

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

  constructor(private UiService: UiService, private userService: UserService) {
    this.subscription = this.UiService.onTabChange().subscribe(
      (value) => (this.currentProfileStatus = value)
    );
    this.userService.getUserInfo().subscribe(res => {
      this.profileForm.get('firstName').setValue(res.firstName);
      this.profileForm.get('lastName').setValue(res.lastName);
      this.profileForm.get('address').setValue(res.address);
      this.currentBalance = res.balance;
    });
  }

  onEditSubmit(): void {
    this.userService.updateUserInfo(this.profileForm.get('firstName').value, this.profileForm.get('lastName').value,
      this.profileForm.get('password').value, this.profileForm.get('address').value).subscribe(res => {
        this.userService.updateFirstName();
        this.modalError = !res.success;

        if (res.success) {
          this.modalText = 'با موفقیت تغییر داده شد';
        }
        else {
          this.modalText = res.error;
        }
        this.showModal = true;
    });
  }

  increaseCredit(): void {
    this.userService.increaseCredit().subscribe(res => {
      if (res.success) {
        this.currentBalance += 10000;
      }
    });
  }

  ngOnInit(): void { }
}
