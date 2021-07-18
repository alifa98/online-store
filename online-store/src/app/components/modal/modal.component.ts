import {Component, ElementRef, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() showModal = false;
  @Input() text: string;
  @Input() error: boolean;

  blowDown = false;

  @Output() modalClosed: EventEmitter<boolean> = new EventEmitter<boolean>();

  faTimesIcon = faTimes;


  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  closeModal(): void {
    this.blowDown = true;
    this.sleep(300).then(() => {
      this.showModal = false;
      this.modalClosed.emit(true);
      this.blowDown = false;
    });
  }

  onOverlayClick(event): void {
    const modalContainerContent = this.elRef.nativeElement.querySelector('.modal--container--content');
    const clickedInsideModal = event.target === modalContainerContent;
    if (!clickedInsideModal) {
      this.closeModal();
    }
  }
}
