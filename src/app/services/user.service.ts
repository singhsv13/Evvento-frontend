import { Injectable } from '@angular/core';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  users: User[] = [
    new User('John Smith', 'johnsmith@xyz.in', '123456'),
    new User('Mary Jane', 'merryjane@abc.com', 'abc456'),
    new User('Mark Vaugh', 'markvaugh@def.in', '123def'),
    new User('Sara King', 'sarahking@xyz.com', 'a1b2c3'),
  ];

  constructor() {}
}
