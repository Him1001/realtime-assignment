import { Component, signal } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-role-selection-sheet',
  templateUrl: './role-selection-sheet.component.html',
  styleUrls: ['./role-selection-sheet.component.scss'],
})
export class RoleSelectionSheetComponent {
  private readonly defaultRoles = [
    'Product Designer',
    'Flutter Developer',
    'QA Tester',
    'Product Owner',
  ];
  roles = signal(this.defaultRoles);

  constructor(
    private bottomSheetRef: MatBottomSheetRef<RoleSelectionSheetComponent>
  ) {}

  selectRole(role: string) {
    this.bottomSheetRef.dismiss(role);
  }
}
