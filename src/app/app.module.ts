import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AddEmployeeComponent } from './component/add-employee/add-employee.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CustomDatepickerComponent } from './shared/custom-datepicker/custom-datepicker.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomCalendarHeaderComponent } from './shared/custom-calendar-header/custom-calendar-header.component';
import { FormsModule } from '@angular/forms';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RoleSelectionSheetComponent } from './shared/role-selection-sheet/role-selection-sheet.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

const dbConfig: DBConfig  = {
  name: 'MyAppDB',
  version: 1,
  objectStoresMeta: [{
    store: 'users',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } },
      { name: 'role', keypath: 'role', options: { unique: false } },
      { name: 'startDate', keypath: 'startDate', options: {unique: false} },
      { name: 'endDate', keypath: 'endDate', options: {unique: false} },
    ]
  }]
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddEmployeeComponent,
    CustomDatepickerComponent,
    CustomCalendarHeaderComponent,
    RoleSelectionSheetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FormsModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    DragDropModule,
    MatSnackBarModule,
    MatBottomSheetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
