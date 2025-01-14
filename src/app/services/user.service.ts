import { Injectable } from '@angular/core';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [
    new User('John Smith', 'johnsmith@xyz.in', '123456', 'eventManager'), // Event Manager
    new User('Mary Jane', 'merryjane@abc.com', 'abc456', 'user'),        // Regular User
    new User('Mark Vaugh', 'markvaugh@def.in', '123def', 'user'),        // Regular User
    new User('Sara King', 'sarahking@xyz.com', 'a1b2c3', 'eventManager'), // Event Manager
  ];

  constructor() {}

  // Additional methods to handle role-based operations if needed in the future
}
