import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, computed, signal } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';
import { CustomDatepickerComponent } from 'src/app/shared/custom-datepicker/custom-datepicker.component';
import { RoleSelectionSheetComponent } from 'src/app/shared/role-selection-sheet/role-selection-sheet.component';
import { User } from 'src/app/types/User';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {
  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private bottomSheet: MatBottomSheet,
    private router: Router,
    private snackBar: MatSnackBar  
  ) {}

  public employeeName = signal('');
  public selectedRole = signal('');
  public startDate = signal('');
  public endDate = signal('');

  private startOptions = [
    { name: 'Today', selected: false, value: 0 },
    { name: 'Next Monday', selected: true, value: 8 },
    { name: 'Next Tuesday', selected: false, value: 9 },
    { name: 'After 1 week', selected: false, value: 7 }
  ];

  private endOptions = [
    { name: 'No Date', selected: true, value: -1 },
    { name: 'Today', selected: false, value: 0 }
  ];

  private isFormValid = computed(() => 
    !!this.employeeName() && !!this.selectedRole() && !!this.startDate()
  );

  public openDatePicker(event: Event, type: 'start' | 'end') {
    event.preventDefault();
    event.stopPropagation();

    const defaultStartDate = moment().clone().isoWeekday(8).toDate();
    const selectedDate = type === 'start' ? defaultStartDate : this.endDate();

    const dialogRef = this.dialog.open(CustomDatepickerComponent, {
      width: '396px',
      data: { date: selectedDate, options: type === 'start' ? this.startOptions : this.endOptions }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        type === 'start' ? this.startDate.set(result) : this.endDate.set(result);
      }
    });
  }

  public openRoleSelection() {
    const sheetRef = this.bottomSheet.open(RoleSelectionSheetComponent, {
      panelClass: 'role-list-items'
    });

    sheetRef.afterDismissed().subscribe((selected) => {
      if (selected) this.selectedRole.set(selected);
    });
  }

  public saveEmployee() {
    if (!this.isFormValid()) {
      this.snackBar.open('Name, Role and Start Date are Required', '', { duration: 5000 });
      return;
    }

    const userData: User = {
      name: this.employeeName(),
      role: this.selectedRole(),
      swiped: false,
      translateX: 0,
      startDate: this.startDate(),
      endDate: this.endDate()
    };

    this.userService.saveEmployee(userData).subscribe(() => this.redirectToHome());
  }

  public redirectToHome() {
    this.router.navigate(['/']);
  }
}
