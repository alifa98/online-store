import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Route, Router} from '@angular/router';

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

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    if (this.userService.isLoggedIn) {
      setTimeout(() => {
        this.router.navigate(['profile']);
      }, 2000);
    }
    return this.userService.isLoggedIn;
  }

  onSubmit(): void {
    if (this.signUpForm.invalid) {
      this.modalText = 'لطفا فرم را به شکل صحیح پر کنید.';
      this.modalError = true;
    }
    else {
      this.userService.signup(this.signUpForm.get('email').value, this.signUpForm.get('password').value,
        this.signUpForm.get('firstName').value, this.signUpForm.get('lastName').value, this.signUpForm.get('address').value)
        .subscribe(res => {
          this.userService.updateIsLoggedIn();
          if (res.success) {
            this.modalText = 'ثبت نام با موفقیت انجام شد. انتقال به صفحه پروفایل';
            this.modalError = false;
            setTimeout(() => {
              this.router.navigate(['profile']);
            }, 2000);
          }
          else {
            this.modalText = res.error;
            this.modalError = true;
          }
        });
    }

    this.showModal = true;
  }
}
