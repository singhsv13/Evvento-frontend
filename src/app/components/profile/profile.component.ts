import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';
import { DialogueService } from 'src/app/services/dialogue.service'; 
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User;
  showModal: boolean = false;

  constructor(
    private authService: AuthService,
    private eventService: EventService,
    private dialogueService: DialogueService,
    private userService : UserService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getActiveUser();

    if (!this.user) {
      console.error('No active user found!');
      return;
    }
    const allRegisteredEvents = this.eventService.getRegisteredEvents();
    const allEvents = this.eventService.getAllEvents();

    this.user.regEvents = allRegisteredEvents.filter((registeredEvent) =>
      allEvents.some((event) => event.id === registeredEvent.id)
    );
  }

  deleteProfile() {
    const userIndex = this.userService.users.findIndex(
      (u) => u.email === this.user.email
    );


    if (userIndex !== -1) {
      this.userService.users.splice(userIndex, 1);
      console.log('User deleted successfully:', this.user);

      this.dialogueService.showDialogue('userDeleted');
      this.authService.logOut(); // Log out and navigate to the login page
    } else {
      this.dialogueService.showDialogue('userNotFound');
      console.error('Error: User not found!');
    }
  }

  toggleEditProfile() {
    this.showModal = !this.showModal; 
  }

  saveProfileChanges(form : NgForm){
    if (!form.valid) {
      alert('Invalid Form !!!');
      return;
    }

    // Simulate saving profile changes
    const updatedUser = { ...this.user };
    this.authService.loggedUser = updatedUser;

    this.dialogueService.showDialogue('userUpdated');
    this.showModal = false; // Close modal
    console.log('Profile updated successfully:', updatedUser);
  }

  logout(): void {
    this.authService.logOut();
    // Show the logout confirmation dialogue after logging out
    this.dialogueService.showDialogue('logoutConfirmation');
  }
}
