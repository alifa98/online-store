import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
})
export class TabComponent implements OnInit {
  constructor(private UiService: UiService) { }

  ngOnInit(): void { }

  tabClick(tabItem): void {
    this.UiService.changeProfileTabStatus(tabItem);
  }
}
