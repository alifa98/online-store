import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.maxLength(255),
      Validators.pattern('^([a-zA-Z0-9]|\\_|\\.)+\\@([a-zA-Z0-9])+\\.([a-zA-Z0-9]){2,}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(8),
                                                        Validators.maxLength(255),
      Validators.pattern('([a-zA-Z]+[0-9]+)|([0-9]+[a-zA-Z]+)')]),
  });

  showModal = false;
  modalText: string;
  modalError: boolean;

  mockCredentials = [
    {
      email: 'johndoe@test.com',
      password: 'test1234'
    },
    {
      email: 'janedoe@test.com',
      password: 'test1234'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.modalText = 'لطفا فرم را به شکل صحیح پر کنید.';
      this.modalError = true;
    }
    else {
      this.modalText = 'ایمیل یا رمزعبور اشتباه می باشد.';
      this.modalError = true;

      const enteredEmail = this.loginForm.get('email').value;
      const enteredPassword = this.loginForm.get('password').value;

      this.mockCredentials.forEach(credential => {
        if (enteredEmail === credential.email && enteredPassword === credential.password) {
          this.modalText = 'ورود با موفقیت انجام شد.';
          this.modalError = false;
        }
      });
    }

    this.showModal = true;
  }
}
