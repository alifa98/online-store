import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'action-modal',
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.css']
})
export class ActionModalComponent implements OnInit {


  @Input() action: string;
  @Input() data: any;
  @Output() closeBtn = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onClose(e) {
    this.closeBtn.emit(e);
  }

}
