import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getActiveUser();
  }

  logout(): void {
    this.authService.logOut();
  }
}
