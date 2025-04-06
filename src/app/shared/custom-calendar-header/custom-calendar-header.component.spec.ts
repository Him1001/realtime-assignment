import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCalendarHeaderComponent } from './custom-calendar-header.component';

describe('CustomCalendarHeaderComponent', () => {
  let component: CustomCalendarHeaderComponent;
  let fixture: ComponentFixture<CustomCalendarHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomCalendarHeaderComponent]
    });
    fixture = TestBed.createComponent(CustomCalendarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
