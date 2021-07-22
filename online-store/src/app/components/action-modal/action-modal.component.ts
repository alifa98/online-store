import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductLoaderService } from 'src/app/services/product.load.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'action-modal',
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.css']
})
export class ActionModalComponent implements OnInit {


  @Input() action: string;
  @Input() data: any;
  @Input() categories: [];
  @Output() closeBtn = new EventEmitter<any>();

  @ViewChild('inputCount') inputRef: ElementRef;
  @ViewChild('inputCategory') inputCategoryRef: ElementRef;

  outputMessage: string = "";

  file: File;

  editProdcut: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    category: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    price: new FormControl('', [Validators.required]),
    availableAmount: new FormControl('', [Validators.required]),
  });

  constructor(private pService: ProductService, private uService: UserService, private productLoadService: ProductLoaderService) {
  }


  ngOnInit(): void {
    if (this.action === 'editProduct') {
      this.editProdcut.get('name').setValue(this.data.name);
      this.editProdcut.get('price').setValue(this.data.price);
      this.editProdcut.get('availableAmount').setValue(this.data.availableAmount);
    }
  }

  onClose(e): void {
    this.closeBtn.emit(e);
  }


  // clean code note: emmit and handle in parent
  buy(): void {
    this.pService.buy(this.data, this.inputRef.nativeElement.value).subscribe(
      result => {
        if (result['success'] != true) {
          this.outputMessage = result['message']
        } else {
          this.closeBtn.emit();
        }
      });
  }

  editCategory(): void {
    this.pService.editCategory(this.data.id, this.inputCategoryRef.nativeElement.value).subscribe(
      result => {
        if (result['success'] != true) {
          this.outputMessage = result['error']
        } else {
          this.closeBtn.emit();
        }
      });
  }


  onEditProductSubmit(): void {
    const categoryIsSelected = this.editProdcut.get('category').value !== '';

    if (!categoryIsSelected || this.editProdcut.invalid) {
      this.outputMessage = 'فرم را به درستی پر نشده است';
    }
    else {
      this.pService.updateProduct(this.data.id, this.editProdcut.get('availableAmount').value, this.editProdcut.get('name').value,
        this.editProdcut.get('category').value, this.editProdcut.get('price').value, this.file)
        .subscribe(res => {
          if (res.success) {
            this.closeBtn.emit();
          }
          else {
            this.outputMessage = res.error;
          }
        });
    }
  }

  onFileSelect(event): void {
    this.file = event.target.files[0];
  }
}
