import { Component, Inject, signal, WritableSignal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { CustomCalendarHeaderComponent } from '../custom-calendar-header/custom-calendar-header.component';

interface DateOption {
  name: string;
  selected: boolean;
  value: number;
}

@Component({
  selector: 'app-custom-datepicker',
  templateUrl: './custom-datepicker.component.html',
  styleUrls: ['./custom-datepicker.component.scss'],
})
export class CustomDatepickerComponent {
  public selectedDate: Date | null = null;
  options: WritableSignal<DateOption[]> = signal([]);
  public customHeader = CustomCalendarHeaderComponent;
  constructor(
    private dialogRef: MatDialogRef<CustomDatepickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.options) {
      this.options.set(data.options);
    }
  }

  selectDate(value: number) {
    const today = moment();

    // Reset all selected states
    const updatedOptions = this.options().map((opt) => ({
      ...opt,
      selected: opt.value === value ? !opt.selected : false,
    }));
    this.options.set(updatedOptions);

    // Date logic based on value
    switch (value) {
      case 0:
        this.selectedDate = today.toDate();
        break;
      case 7:
        this.selectedDate = today.clone().add(1, 'weeks').toDate();
        break;
      case 8:
      case 9:
        this.selectedDate = today.clone().isoWeekday(value).toDate();
        break;
      case -1:
        this.selectedDate = null;
        break;
      default:
        break;
    }
  }

  clearDate() {
    this.selectedDate = null;
  }

  saveDate() {
    const result = this.selectedDate
      ? this.selectedDate.toDateString()
      : 'No date';
    this.dialogRef.close(result);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
