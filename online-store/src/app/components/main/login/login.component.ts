import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

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


  constructor(private userService: UserService, private router: Router) {

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
          this.userService.updateIsLoggedIn();
          this.userService.updateFirstName();

          if (res.success === true) {
            this.modalText = 'ورود با موفقیت انجام شد. انتقال به صفحه پروفایل';
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
