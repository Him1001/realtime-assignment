import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  ViewChild,
} from '@angular/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDateFormats,
} from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import * as moment from 'moment';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-custom-calendar-header',
  templateUrl: './custom-calendar-header.component.html',
  styleUrls: ['./custom-calendar-header.component.scss'],
})
export class CustomCalendarHeaderComponent<D> {
  private destroyed = new Subject<void>();
  periodLabel!: string;

  constructor(
    private calendar: MatCalendar<D>,
    private dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private dateFormats: MatDateFormats,
    private cdr: ChangeDetectorRef
  ) {
    calendar.stateChanges.pipe(takeUntil(this.destroyed)).subscribe(() => {
      this.updateHeaderText();
      cdr.markForCheck();
    });

    this.updateHeaderText();
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  previousClicked(): void {
    this.calendar.activeDate = this.dateAdapter.addCalendarMonths(
      this.calendar.activeDate,
      -1
    );
  }

  nextClicked(): void {
    this.calendar.activeDate = this.dateAdapter.addCalendarMonths(
      this.calendar.activeDate,
      1
    );
  }

  private updateHeaderText(): void {
    const monthName = this.dateAdapter.format(this.calendar.activeDate, {
      year: 'numeric',
      month: 'long',
    } as Intl.DateTimeFormatOptions);
    this.periodLabel = monthName.charAt(0).toUpperCase() + monthName.slice(1);
  }
}
