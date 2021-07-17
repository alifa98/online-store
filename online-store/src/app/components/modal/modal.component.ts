import {Component, ElementRef, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() showModal = false;
  faTimesIcon = faTimes;
  @Output() modalClosed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
  }

  onOverlayClick(event): void {
    const modalContainerContent = this.elRef.nativeElement.querySelector('.modal--container--content');
    const clickedInsideModal = event.target === modalContainerContent;
    if (!clickedInsideModal) {
      this.showModal = false;
      this.modalClosed.emit(true);
    }
  }
}
