import { Component, OnInit } from '@angular/core';
import { Mock } from 'src/app/mockData';
import { faCaretDown, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  onDropDown = false;
  responsive = false;

  constructor() { }
  name: string = Mock.getName();
  faCaretDownIcon = faCaretDown;
  faBarsIcon = faBars;

  isLoggedIn(): boolean {
    return true;
  }

  ngOnInit(): void {
  }

}
