import { Component, OnInit, Input } from '@angular/core';
import { TableHeaders } from 'src/app/interface/TableHeaders';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() headers: TableHeaders[];
  @Input() items: any[];

  constructor() { }

  ngOnInit(): void { }
}
