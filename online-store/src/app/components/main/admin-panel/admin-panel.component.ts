import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from '../../../services/ui.service';
import { Receipt } from '../../../interface/Receipt';
import { Mock } from '../../../mockData';
import { TableHeader } from '../../../interface/TableHeaders';
import { Category } from 'src/app/interface/category';
import {Product} from '../../../interface/Product';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../services/product.service';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})


export class AdminPanelComponent implements OnInit {
  trackingCodeForm = new FormGroup({
    trackingCode: new FormControl('', [Validators.required, Validators.maxLength(255)]),
  });

  currentAdminStatus = 'لیست کالا ها';
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
      key: 'text',
      name: 'نام دسته بندی'
    }
  ];
  categories: Category[];

  products: Product[] = Mock.getProducts();

  constructor(private uiService: UiService, private productService: ProductService, private userService: UserService,
              private router: Router) {
    this.userService.updateAdminStatus();
    this.userService.onIsAdminChange().subscribe(value => {
        if (!value) {  // is not admin
          router.navigate(['login']);
        }
    });

    this.uiService.onTabChange().subscribe(
      (value => {
        this.currentAdminStatus = value;
      })
    );

    this.productService.getAllReceipts().subscribe(res => {
        this.receipts = res;
    });

    this.productService.getCategories().subscribe(res => {
      this.categories = res;
      this.removeByAttr(this.categories, 'text', 'دسته بندی نشده');
    });
  }

  onSearch(): void {
    this.productService.getSearchedReceipts(this.trackingCodeForm.get('trackingCode').value).subscribe(res => {
       this.receipts = res;
    });
  }

  deleteCategory(categoryId): void {
    this.productService.deleteCategory(categoryId).subscribe(res => {
      if (res.success) {
       this.removeByAttr(this.categories, 'id', categoryId);
      }
    });
  }

  ngOnInit(): void {
  }

  removeByAttr(arr, attr, value): void {
    let i = arr.length;
    while (i--){
       if ( arr[i]
           && arr[i].hasOwnProperty(attr)
           && (arguments.length > 2 && arr[i][attr] === value ) ){

           arr.splice(i, 1);

       }
    }
  }
}
