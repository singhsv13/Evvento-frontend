import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedUser: User | null = null; // Initialize as null
  private isLoggedIn: boolean = false;
  private readonly tokenKey = 'authToken';

  constructor(private userservice: UserService, private router: Router) {
    this.checkToken(); // Check for token on service initialization
  }

  logIn(email: string, password: string) {
    const user = this.userservice.users.find((user) => user.email === email && user.password === password);
    
    if (user) {
      this.loggedUser = user;
      this.isLoggedIn = true;
      this.storeToken(this.generateMockJWT(user));
    } else {
      this.isLoggedIn = false;
      this.loggedUser = null;
    }
    return user;
  }

  registerUser(name: string, email: string, password: string, role: 'user' | 'eventManager' = 'user') {
    const existingUser = this.userservice.users.find((user) => user.email === email);

    if (existingUser) {
      return undefined; // User with the same email already exists
    } else {
      const newUser = new User(name, email, password, role);
      this.userservice.users.push(newUser);
      this.loggedUser = newUser;
      this.isLoggedIn = true;
      this.storeToken(this.generateMockJWT(newUser));
      console.log("New User : ", newUser);
      return newUser;
    }
  }

  getUserId(): string {
    return this.loggedUser?.id ?? '';
  }

  getActiveUser(): User | null {
    return this.loggedUser;
  }

  getUserRole(): 'user' | 'eventManager' {
    return this.loggedUser?.role ?? 'user';
  }

  logOut() {
    this.isLoggedIn = false;
    this.loggedUser = null;
    this.clearToken();
    console.log(`${this.loggedUser?.name ?? 'User'}, Logged Out!`);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  hasRole(role: 'user' | 'eventManager'): boolean {
    return this.isLoggedIn && this.loggedUser?.role === role;
  }

  // JWT generation and storage
  private generateMockJWT(user: User): string {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      exp: Date.now() + 3600000, // Expires in 1 hour
    };
    return btoa(JSON.stringify(payload)); // Generate a mock JWT token
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  private checkToken(): void {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token));
        if (Date.now() > payload.exp) {
          this.logOut(); // Token expired
        } else {
          this.loggedUser = this.userservice.users.find((user) => user.email === payload.email) ?? null;
          this.isLoggedIn = true;
        }
      } catch (e) {
        console.error('Invalid token:', e);
        this.logOut(); // In case of invalid token
      }
    } else {
      this.isLoggedIn = false;
      this.loggedUser = null;
    }
  }
}
