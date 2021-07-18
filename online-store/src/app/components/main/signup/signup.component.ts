import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    email: new FormControl('', [Validators.required, Validators.maxLength(255),
      Validators.pattern('^([a-zA-Z0-9]|\\_|\\.)+\\@([a-zA-Z0-9])+\\.([a-zA-Z0-9]){2,}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(8),
                                                        Validators.maxLength(255),
      Validators.pattern('([a-zA-Z]+[0-9]+)|([0-9]+[a-zA-Z]+)')]),
    address: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
  });

  showModal = false;
  modalText: string;
  modalError: boolean;

  mockEmails = ['test@test.com', 'johndoe@test.com', 'janedoe@test.com'];

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.signUpForm.invalid) {
      this.modalText = 'لطفا فرم را به شکل صحیح پر کنید.';
      this.modalError = true;
    }
    else {
      const enteredEmail = this.signUpForm.get('email').value;
      if (this.mockEmails.includes(enteredEmail)) {
        this.modalText = 'ایمیل وارد شده تکراری می باشد. لطفا با ایمیل جدید امتحان کنید.';
        this.modalError = true;
      }
      else {
        this.modalText = 'ثبت نام با موفقیت انجام شد.';
        this.modalError = false;
      }
    }

    this.showModal = true;
  }
}
