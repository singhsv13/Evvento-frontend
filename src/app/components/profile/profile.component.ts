// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { User } from 'src/app/model/User';
// import { AuthService } from 'src/app/services/auth.service';
// import { EventService } from 'src/app/services/event.service';
// import { DialogueService } from 'src/app/services/dialogue.service'; 
// import { NgForm } from '@angular/forms';
// import { UserService } from 'src/app/services/user.service';
// import { take } from 'rxjs';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css'],
// })
// export class ProfileComponent implements OnInit {
//   user: User;
//   showModal: boolean = false;

//   constructor(
//     private authService: AuthService,
//     private eventService: EventService,
//     private dialogueService: DialogueService,
//     private userService : UserService
//   ) {}

//   ngOnInit(): void {
//     this.user = this.authService.getActiveUser();

//     if (!this.user) {
//       console.error('No active user found!');
//       return;
//     }
//     const allRegisteredEvents = this.eventService.getRegisteredEvents();
//     const allEvents = this.eventService.getAllEvents();

//     this.user.regEvents = allRegisteredEvents.filter((registeredEvent) =>
//       allEvents.some((event) => event.id === registeredEvent.id)
//     );
//   }

//   deleteProfile() {
//     const userIndex = this.userService.users.findIndex(
//       (u) => u.email === this.user.email
//     );


//     if (userIndex !== -1) {
//       this.userService.users.splice(userIndex, 1);
//       console.log('User deleted successfully:', this.user);

//       this.dialogueService.showDialogue('userDeleted');
//       this.authService.logOut();
//     } else {
//       this.dialogueService.showDialogue('userNotFound');
//       console.error('Error: User not found!');
//     }
//   }

//   toggleEditProfile() {
//     this.showModal = !this.showModal; 
//   }

//   saveProfileChanges(form : NgForm){
//     if (!form.valid) {
//       alert('Invalid Form !!!');
//       return;
//     }

//     this.user.name = form.value.name; 
//     this.user.email = form.value.email; 
//     // Simulate saving profile changes
//     // const updatedUser = { ...this.user };
//       this.authService.loggedUser$.pipe(take(1)).subscribe((user)=>{
//       this.user = user;
//     });

//     this.dialogueService.showDialogue('userUpdated');
//     this.showModal = false;
//     console.log('Profile updated successfully:', this.user);
//   }

//   logout(): void {
//     this.authService.logOut();
//     this.dialogueService.showDialogue('logoutConfirmation');
//   }
// }

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';
import { DialogueService } from 'src/app/services/dialogue.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null; // Updated to handle null user state
  showModal: boolean = false;

  constructor(
    private authService: AuthService,
    private eventService: EventService,
    private dialogueService: DialogueService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Subscribe to the loggedUser$ observable to get the active user
    this.authService.loggedUser$.pipe(take(1)).subscribe((user) => {
      if (!user) {
        console.error('No active user found!');
        return;
      }
      this.user = user;

      // Populate registered events
      const allRegisteredEvents = this.eventService.getRegisteredEvents();
      const allEvents = this.eventService.getAllEvents();

      this.user.regEvents = allRegisteredEvents.filter((registeredEvent) =>
        allEvents.some((event) => event.id === registeredEvent.id)
      );
    });
  }

  deleteProfile() {
    if (!this.user) {
      console.error('Cannot delete profile: No active user!');
      return;
    }

    const userIndex = this.userService.users.findIndex(
      (u) => u.email === this.user!.email
    );

    if (userIndex !== -1) {
      this.userService.users.splice(userIndex, 1);
      console.log('User deleted successfully:', this.user);

      this.dialogueService.showDialogue('userDeleted');
      this.authService.logOut();
    } else {
      this.dialogueService.showDialogue('userNotFound');
      console.error('Error: User not found!');
    }
  }

  toggleEditProfile() {
    this.showModal = !this.showModal;
  }

  saveProfileChanges(form: NgForm) {
    if (!form.valid) {
      alert('Invalid Form !!!');
      return;
    }

    if (this.user) {
      this.user.name = form.value.name;
      this.user.email = form.value.email;

      // Update the user state via loggedUser$
      this.authService.loggedUser$.pipe(take(1)).subscribe((user) => {
        this.user = { ...user, ...form.value }; // Simulate updating user info
        console.log('Profile updated successfully:', this.user);
        this.dialogueService.showDialogue('userUpdated');
        this.showModal = false;
      });
    }
  }

  logout(): void {
    this.authService.logOut();
    this.dialogueService.showDialogue('logoutConfirmation');
  }
}

