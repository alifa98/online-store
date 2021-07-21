import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Receipt } from 'src/app/interface/Receipt';
import { TableHeader as TableHeader } from 'src/app/interface/TableHeaders';
import { Mock } from 'src/app/mockData';
import { UiService } from 'src/app/services/ui.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {ProductService} from '../../../services/product.service';
import {Router} from '@angular/router';

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

  // modal:
  showModal = false;
  modalText: string;
  modalError: boolean;

  isLoggedIn: boolean;

  receipts: Receipt[];
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
    {
      key: 'state',
      name: 'وضعیت'
    },
  ];

  constructor(private UiService: UiService, private userService: UserService, private productService: ProductService,
              private router: Router) {
    this.UiService.onTabChange().subscribe(
      (value) => (this.currentProfileStatus = value)
    );

    this.userService.updateAdminStatus();
    this.userService.onIsAdminChange().subscribe(value => {
        if (value) { // is admin
          this.router.navigate(['admin']);
        }
    });

    this.userService.onLoginChange().subscribe(
      (value => {
        this.isLoggedIn = value;
        if (!value) {
          router.navigate(['login']);
        }
      })
    );
    this.productService.getReceipts().subscribe(res => {
        this.receipts = res;
    });
  }

  getFirstName(): string {
    return this.userService.firstName;
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

  ngOnInit(): void {
      this.userService.getUserInfo().subscribe(res => {
            this.profileForm.get('firstName').setValue(res.firstName);
            this.profileForm.get('lastName').setValue(res.lastName);
            this.profileForm.get('address').setValue(res.address);
            this.currentBalance = res.balance;
      });
  }
}
