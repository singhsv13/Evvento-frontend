import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {
  loggedIn: boolean = false;
  role : string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loggedIn = this.authService.isAuthenticated();
  }

  ngDoCheck(): void {
    this.loggedIn = this.authService.isAuthenticated();
    if(this.loggedIn){
      this.role =  this.authService.getUserRole();
    }
  }

  logout() {
    this.authService.logOut();
    this.loggedIn = this.authService.isAuthenticated();
  }
}
