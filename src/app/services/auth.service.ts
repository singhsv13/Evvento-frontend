import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedUser: User;
  private isLoggedIn: boolean = false;

  constructor(private userservice: UserService, private router: Router) {}

  logIn(email: string, password: string) {
    let user = this.userservice.users.find((user) => {
      return user.email === email && user.password === password;
    });

    console.log('User : ', user);
    this.loggedUser = user;

    if (user === undefined) {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
    }
    return user;
  }

  registerUser(name: string, email: string, password: string, role: 'user' | 'eventManager' = 'user') {
    let existingUser = this.userservice.users.find((user) => user.email === email);

    if (existingUser) {
      return undefined; // User with the same email already exists
    } else {
      const newUser = new User(name, email, password, role);
      this.loggedUser = newUser;
      this.userservice.users.push(newUser);
      this.isLoggedIn = true;
      console.log("New User : ", newUser);
      return newUser;
    }
  }

  getUserId(): string {
    return this.loggedUser.id;
  }

  getActiveUser(): User {
    return this.loggedUser;
  }

  getUserRole(): 'user' | 'eventManager' {
    return this.loggedUser.role;
  }

  logOut() {
    this.isLoggedIn = false;
    console.log(`${this.loggedUser?.name ?? 'User'}, Logged Out!`);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  hasRole(role: 'user' | 'eventManager'): boolean {
    return this.isLoggedIn && this.loggedUser?.role === role;
  }
}
