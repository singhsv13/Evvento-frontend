import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'authToken';

  private loggedUserSubject = new BehaviorSubject<User | null>(null);
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  loggedUser$ = this.loggedUserSubject.asObservable();
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private userService: UserService, private router: Router) {
    this.initializeAuthState();
  }

  logIn(email: string, password: string): User | null {
    const user = this.userService.users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      this.updateAuthState(user, this.generateMockJWT(user));
      console.log(`${user.name}, Logged In!`);
    } else {
      this.clearAuthState();
    }

    return user;
  }

  registerUser(
    name: string,
    email: string,
    password: string,
    role: 'user' | 'eventManager' = 'user'
  ): User | undefined {
    const existingUser = this.userService.users.find((user) => user.email === email);

    if (existingUser) 
      return undefined;

    const newUser = new User(name, email, password, role);
    this.userService.users.push(newUser);
    this.updateAuthState(newUser, this.generateMockJWT(newUser));
    console.log('New User:', newUser);

    return newUser;
  }

  logOut(): void {
    console.log(`${this.loggedUserSubject.value?.name ?? 'User'} Logged Out!`);
    this.clearAuthState();
    this.router.navigate(['/login']);
  }

  getUserId(): string {
    return this.loggedUserSubject.value?.id ?? '';
  }

  getActiveUser(): User | null {
    return this.loggedUserSubject.value;
  }

  getUserRole(): 'user' | 'eventManager' {
    return this.loggedUserSubject.value?.role ?? 'user';
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  hasRole(role: 'user' | 'eventManager'): boolean {
    return (
      this.isLoggedInSubject.value &&
      this.loggedUserSubject.value?.role === role
    );
  }

  public getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  
  private updateAuthState(user: User, token: string): void {
    this.loggedUserSubject.next(user);
    this.isLoggedInSubject.next(true);
    this.storeToken(token);
  }

  private clearAuthState(): void {
    this.loggedUserSubject.next(null);
    this.isLoggedInSubject.next(false);
    this.clearToken();
  }

  private generateMockJWT(user: User): string {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      exp: Date.now() + 3600000, // Expires in 1 hour
    };
    return btoa(JSON.stringify(payload)); // Mock JWT token
  }

  private storeToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
  }

  private clearToken(): void {
    sessionStorage.removeItem(this.tokenKey);
  }

  private initializeAuthState(): void {
    const token = this.getToken();
    if (!token) {
      this.clearAuthState();
      return;
    }

    const payload = this.parseToken(token);
    if (!payload || Date.now() > payload.exp) {
      this.clearAuthState();
    } else {
      const user = this.userService.users.find((user) => user.email === payload.email);
      if (user) {
        this.updateAuthState(user, token);
      } else {
        this.clearAuthState();
      }
    }
  }

  private parseToken(token: string): any | null {
    try {
      return JSON.parse(atob(token));
    } catch {
      console.error('Invalid token format');
      return null;
    }
  }
}
