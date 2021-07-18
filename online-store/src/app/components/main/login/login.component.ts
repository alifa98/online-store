import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';

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

  constructor(private userService: UserService) {
    userService.isAuthenticated().subscribe(res => console.log(res));
  }

  ngOnInit(): void {
  }
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.modalText = 'لطفا فرم را به شکل صحیح پر کنید.';
      this.modalError = true;
    }
    else {
      const enteredEmail = this.loginForm.get('email').value;
      const enteredPassword = this.loginForm.get('password').value;

      this.userService.login(enteredEmail, enteredPassword).subscribe(res => {
          if (res.success === true) {
            this.modalText = 'ورود با موفقیت انجام شد.';
            this.modalError = false;
          }
          else {
            this.modalText = 'ایمیل یا رمزعبور اشتباه می باشد.';
            this.modalError = true;
          }
      });
    }

    this.showModal = true;
  }
}
