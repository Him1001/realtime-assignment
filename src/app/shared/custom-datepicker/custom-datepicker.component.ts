import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { CustomCalendarHeaderComponent } from '../custom-calendar-header/custom-calendar-header.component';

@Component({
  selector: 'app-custom-datepicker',
  templateUrl: './custom-datepicker.component.html',
  styleUrls: ['./custom-datepicker.component.scss']
})
export class CustomDatepickerComponent {
  public selectedDate: Date | null = null;
  public options: {name: string, selected: boolean, value: number}[] = [];
  public customHeader = CustomCalendarHeaderComponent;
  constructor(
    private dialogRef: MatDialogRef<CustomDatepickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedDate = data.date === '' ? null : new Date(data.date);
    if(data.options) {
      this.options = data.options
    }
    console.log('options',this.options)
  }

  selectDate(value: number) {
    let today = moment();
    this.options = this.options.map((opt) =>
    {
      return {...opt, selected: false}
  })
    let index = this.options.findIndex((opt) => opt.value === value);
    if(index !== -1) {
      let previousSelected = this.options[index].selected;
      this.options[index] = {...this.options[index], selected: !previousSelected}
    }
    switch(value) {
      case 0:
        this.selectedDate = today.toDate();
      break;
      case 8:
      case 9:
        this.selectedDate = today.clone().isoWeekday(value).toDate();
      break;
      case 7:
        this.selectedDate = today.clone().add(1, 'weeks').toDate();
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
    this.dialogRef.close(this.selectedDate ? this.selectedDate.toDateString() : 'No date');
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
