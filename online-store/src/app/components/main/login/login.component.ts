import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

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

  // modal
  showModal = false;
  modalText: string;
  modalError: boolean;

  isLoggedIn: boolean;
  subscription: Subscription;


  constructor(private userService: UserService, private router: Router) {
    this.subscription = this.userService.onLoginChange().subscribe(
      (value => {
      this.isLoggedIn = value;
      })
    );
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
          this.userService.updateLoginStatus();
          this.userService.updateAdminStatus();
          this.userService.updateFirstName();

          if (res.success === true) {
            this.modalText = 'ورود با موفقیت انجام شد. انتقال به صفحه پروفایل';
            this.modalError = false;
             if (res.is_admin) {
                setTimeout(() => {
                  this.router.navigate(['admin']);
                  }, 2000);
             }
             else {
                setTimeout(() => {
                  this.router.navigate(['profile']);
                  }, 2000);
             }
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
