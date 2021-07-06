import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteInputComponent } from './site-input.component';

describe('SiteInputComponent', () => {
  let component: SiteInputComponent;
  let fixture: ComponentFixture<SiteInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
