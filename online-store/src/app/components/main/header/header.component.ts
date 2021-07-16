import { Component, OnInit } from '@angular/core';
import { Mock } from 'src/app/mockData';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  onDropDown = false;

  constructor() { }
  name: string = Mock.getName();
  faCaretDownIcon = faCaretDown;

  isLoggedIn(): boolean {
    return true;
  }

  ngOnInit(): void {
  }

}
