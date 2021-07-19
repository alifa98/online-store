import { Component, OnInit } from '@angular/core';
import { Mock } from 'src/app/mockData';
import { faCaretDown, faBars } from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  onDropDown = false;
  responsive = false;

  constructor(private userService: UserService, private router: Router) {
    this.userService.updateFirstName();
  }
  faCaretDownIcon = faCaretDown;
  faBarsIcon = faBars;

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  getFirstName(): string {
    return this.userService.firstName;
  }

  logout(): void {
    this.userService.logout().subscribe(res => {
      this.userService.updateIsLoggedIn();
      if (res.success) {
        this.router.navigate(['']);
      }
    });
  }
}
