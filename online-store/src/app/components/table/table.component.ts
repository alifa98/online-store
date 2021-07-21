import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() editText: string;
  @Input() deleteText: string;
  @Output() onEditClick = new EventEmitter();
  @Output() onDeleteClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  editClick(item): void {
    console.log(item);
  }

  deleteClick(itemId): void {
    this.onDeleteClick.emit(itemId);
  }
}
