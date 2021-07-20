import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-hero-header',
  templateUrl: './hero-header.component.html',
  styleUrls: ['./hero-header.component.css']
})
export class HeroHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }


  sliderImages = [
    "https://images.unsplash.com/photo-1542293787938-c9e299b880cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950",
    "https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1260"
  ]

  currentImageIndex = 0;

  @ViewChild('slides') slides: ElementRef;


  getImageUrl(): string {
    return this.sliderImages[this.currentImageIndex];
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.sliderImages.length;
    this.showImage(this.currentImageIndex);
  }

  previousImage(): void {
    this.currentImageIndex = (this.currentImageIndex - 1) % this.sliderImages.length;
    this.showImage(Math.abs(this.currentImageIndex));
  }

  showImage(index: number): void {
    this.slides.nativeElement.style.backgroundImage = `url(${this.sliderImages[index]})`;

  }

  ngAfterViewInit() {
    this.showImage(0);

    setInterval(() => this.nextImage(), 7000);
  }

}
