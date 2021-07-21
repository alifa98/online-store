import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  constructor(private pService: ProductService, private uService: UserService) { }

  ngOnInit(): void {
  }

  onClose(e) {
    this.closeBtn.emit(e);
  }


  //clean code note: emmit and handle in parent
  buy() {
    console.log(this.uService.getUserInfo());
    let username = "";
    this.pService.buy(username, this.data.id, 0).subscribe(
      result => {
        console.log(result);
      });
  }

}
