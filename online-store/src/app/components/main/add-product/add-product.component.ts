import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {ProductService} from '../../../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    category: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    price: new FormControl('', [Validators.required]),
  });

  isLoggedIn: boolean;
  file: File;
  categories: [];

  // modal
  showModal = false;
  modalText: string;
  modalError: boolean;

  constructor(private userService: UserService, private productService: ProductService) {
    this.userService.updateLoginStatus();
    this.userService.updateAdminStatus();
    this.userService.onLoginChange().subscribe(
      (value => {
        this.isLoggedIn = value;
      })
    );

    this.productService.getCategories().subscribe(result => {
        this.categories = result;
    });
  }


  onSubmit(): void {
    const categoryIsSelected = this.productForm.get('category').value !== '';

    if (!categoryIsSelected || this.productForm.invalid || this.file == null) {
      this.modalText = 'فرم را به درستی پر نشده است';
      this.modalError = true;
      this.showModal = true;
    }
    else {
      this.productService.createNewProduct(this.productForm.get('name').value, this.productForm.get('category').value,
        this.productForm.get('price').value, this.file).subscribe(res => {
          if (res.success) {
            this.modalText = 'آپلود با موفقیت انجام شد';
            this.modalError = false;
            this.showModal = true;
          }
          else {
            this.modalText = res.error;
            this.modalError = true;
            this.showModal = true;
          }
      });
    }
  }

  onFileSelect(event): void {
      this.file = event.target.files[0];
  }

  ngOnInit(): void {
  }

}
