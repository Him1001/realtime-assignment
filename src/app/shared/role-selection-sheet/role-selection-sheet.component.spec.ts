import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleSelectionSheetComponent } from './role-selection-sheet.component';

describe('RoleSelectionSheetComponent', () => {
  let component: RoleSelectionSheetComponent;
  let fixture: ComponentFixture<RoleSelectionSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoleSelectionSheetComponent]
    });
    fixture = TestBed.createComponent(RoleSelectionSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
