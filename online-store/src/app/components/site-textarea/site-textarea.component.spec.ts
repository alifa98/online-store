import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteTextareaComponent } from './site-textarea.component';

describe('SiteTextareaComponent', () => {
  let component: SiteTextareaComponent;
  let fixture: ComponentFixture<SiteTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteTextareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
