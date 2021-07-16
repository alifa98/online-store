import { Component, OnInit, Input } from '@angular/core';
import { TableHeader } from 'src/app/interface/TableHeaders';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() headers: TableHeader[];
  @Input() items: any[];
  @Input() operation: boolean;

  constructor() { }

  ngOnInit(): void { }
}
