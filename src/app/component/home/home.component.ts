import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { User, UserType } from 'src/app/types/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private userService: UserService, private snackBar: MatSnackBar) {}
  public currentEmployees: User[] = [];
  public previousEmployees: User[] = [];
  private currentTime: number = new Date().getTime();
  private deletedEmployee: { employee: User; index: number } | null = null;
  protected userTypes = UserType;

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
        users.map((user) => {
          if (this.checkPreviousDate(user.endDate)) {
            this.previousEmployees.push(user);
          } else {
            this.currentEmployees.push(user);
          }
        })
    })

  }

  private checkPreviousDate(endDate: string) {
    if (!endDate) {
      return false;
    }
    return (new Date(endDate)).getTime() < this.currentTime ? true : false;
  }


  onDragEnd(event: CdkDragEnd, employee: User, userType: UserType) {
    let distance = event.distance;
    let dropDistance = event.dropPoint;
    const element = event.source.element.nativeElement;
    const boundingRect = element.getBoundingClientRect();
    if(distance.x > 0) {
      event.source.reset()
    } else if (dropDistance.x < (boundingRect.width / 2)) {
      this.deleteEmployee(employee, userType)
    } else {
      event.source.reset()
    }
  }

  public deleteEmployee(employee: User, usertype: UserType) {
    let index: number;
    let isCurrentEmployee = usertype === UserType.current;
    if (isCurrentEmployee) {
      index = this.currentEmployees.findIndex((e) => e.name === employee.name);
    } else {
      index = this.previousEmployees.findIndex((e) => e.name === employee.name);
    }

    if (index !== -1) {
      // Store the deleted employee
      this.deletedEmployee = { employee, index };
      console.log(index)
      isCurrentEmployee ? this.currentEmployees.splice(index, 1) : this.previousEmployees.splice(index, 1);
      console.log(this.currentEmployees)

      // Show snackbar with Undo option
      this.snackBar.open('Employee data has been Deleted', 'Undo', {
        duration: 5000, // 5 seconds
      }).onAction().subscribe(() => {
        // Restore employee if Undo is clicked
        if (this.deletedEmployee) {
          isCurrentEmployee ?
          this.currentEmployees.splice(this.deletedEmployee.index, 0, this.deletedEmployee.employee)
          : this.previousEmployees.splice(this.deletedEmployee.index, 0, this.deletedEmployee.employee);
          this.deletedEmployee = null;
        }
      });

    }
  }


  deleteItem(item: User) {
    this.currentEmployees = this.currentEmployees.filter(i => i !== item);
  }

  saveItem(item: any) {
    alert('Saved: ' + JSON.stringify(item));
  }
}
