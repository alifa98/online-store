import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ProductLoaderService } from 'src/app/services/product.load.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'action-modal',
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.css']
})
export class ActionModalComponent implements OnInit {


  @Input() action: string;
  @Input() data: any;
  @Output() closeBtn = new EventEmitter<any>();

  @ViewChild('inputCount') inputRef: ElementRef;

  outputMessage: string = "";

  constructor(private pService: ProductService, private uService: UserService) { }

  ngOnInit(): void {
  }

  onClose(e) {
    this.closeBtn.emit(e);
  }


  //clean code note: emmit and handle in parent
  buy() {
    this.pService.buy(this.data, this.inputRef.nativeElement.value).subscribe(
      result => {
        if (result["success"] != true) {
          this.outputMessage = result["message"]
        } else {
          this.closeBtn.emit();
        }
      });
  }

}
