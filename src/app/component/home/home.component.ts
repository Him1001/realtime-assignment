import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, computed, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { User, UserType } from 'src/app/types/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  private currentTime = new Date().getTime();
  private deletedEmployee: { employee: User; index: number } | null = null;

  public allUsers = signal<User[]>([]);
  public currentEmployees = computed(() =>
    this.allUsers().filter((user) => !this.checkPreviousDate(user.endDate))
  );
  public previousEmployees = computed(() =>
    this.allUsers().filter((user) => this.checkPreviousDate(user.endDate))
  );

  protected userTypes = UserType;

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
      this.allUsers.set(users);
    });
  }

  private checkPreviousDate(endDate: string) {
    return endDate ? new Date(endDate).getTime() < this.currentTime : false;
  }

  onDragEnd(event: CdkDragEnd, employee: User, userType: UserType) {
    const { x } = event.distance;
    const { x: dropX } = event.dropPoint;
    const element = event.source.element.nativeElement;
    const width = element.getBoundingClientRect().width;

    if (x > 0 || dropX > width / 2) {
      event.source.reset();
      return;
    }

    this.deleteEmployee(employee, userType);
  }

  deleteEmployee(employee: User, userType: UserType) {
    const employees =
      userType === UserType.current
        ? this.currentEmployees()
        : this.previousEmployees();

    const index = employees.findIndex((e) => e.id === employee.id);
    if (index === -1) return;

    this.deletedEmployee = { employee, index };
    this.allUsers.update((users) => users.filter((u) => u !== employee));
    this.userService.removeEmployee(employee.id).subscribe();

    this.snackBar
      .open('Employee data has been Deleted', 'Undo', { duration: 5000 })
      .onAction()
      .subscribe(() => {
        if (this.deletedEmployee) {
          this.allUsers.update((users) => {
            const updated = [...users];
            if (this.deletedEmployee?.employee) {
              this.userService
                .saveEmployee(this.deletedEmployee.employee)
                .subscribe();
            }
            updated.splice(
              this.deletedEmployee!.index,
              0,
              this.deletedEmployee!.employee
            );
            return updated;
          });
          this.deletedEmployee = null;
        }
      });
  }

  deleteItem(item: User) {
    this.allUsers.update((users) => users.filter((i) => i !== item));
  }
}
