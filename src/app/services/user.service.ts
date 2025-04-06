import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { User } from '../types/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private dbService: NgxIndexedDBService) { }

  saveEmployee(data: User) {
    return this.dbService.add('users', data);
  }

  getUsers(): Observable<User[]> {
    return this.dbService.getAll('users');
  }
}
