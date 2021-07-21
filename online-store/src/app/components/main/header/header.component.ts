import { Component, OnInit } from '@angular/core';
import { Mock } from 'src/app/mockData';
import { faCaretDown, faBars } from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  onDropDown = false;
  responsive = false;

  isLoggedIn: boolean;
  isAdmin: boolean;

  faCaretDownIcon = faCaretDown;
  faBarsIcon = faBars;

  constructor(private userService: UserService, private router: Router) {
    this.userService.onLoginChange().subscribe(
      (value => {
      this.isLoggedIn = value;
      if (value) {
        this.userService.updateFirstName();
      }
      })
    );

    this.userService.updateAdminStatus();
    this.userService.onIsAdminChange().subscribe(value => {
      this.isAdmin = value;
    });

  }

  ngOnInit(): void {
  }


  getFirstName(): string {
    return this.userService.firstName;
  }

  logout(): void {
    this.userService.logout().subscribe(res => {
      this.userService.updateLoginStatus();
      this.userService.updateAdminStatus();
      if (res.success) {
        this.router.navigate(['']);
      }
    });
  }
}
