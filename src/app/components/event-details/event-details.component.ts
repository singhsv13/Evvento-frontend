import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/model/Event';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
  id: string;

  event: Event = {
    id: '',
    name: '',
    desc: '',
    type: '',
    location: '',
    doe: '',
    organisedBy: '',
    imageURL: '',
  };

  loginStatus: boolean = false;
  // editMode : boolean = false;

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let eventId = '';
    this.route.params.subscribe((params) => {
      this.id = params['id']; 
      eventId = this.id;
      console.log(this.id);
    });

    this.fetchEventById(eventId);
    // this.event = {...this.eventService.getEventByID(this.id)};
    console.log('Fetched Event : ', this.event);
  }

  fetchEventById(id: string) {
    this.eventService.getEventByID(id).subscribe({
      next: (data) => {
        console.log(data);
        this.event = { ...data };
        console.log('My Event : ', this.event);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onRegisterClicked(eventId: string) {
    this.loginStatus = this.authService.isAuthenticated();

    if (this.loginStatus) {
      this.eventService.registerForEvent(eventId).subscribe((isRegistered) => {
        if (isRegistered) {
          alert('You have successfully registered for the event!');
          this.router.navigate(['my-events']);
        } else {
          alert('You are already registered for this event!');
        }
      });
    } else {
      alert('Please Login to Register!!!');
      this.router.navigate(['login']);
      
    }
  }


  onEditClicked(id: string) {
    this.router.navigate([`/event/edit`, id], { 
      queryParams: { edit: true }
    });
  }
  
  onDeleteClicked(id: string) {
    this.eventService.deleteEvent(id).subscribe({
      next: (updatedEventList) => {
        alert(`Event with ID ${id} successfully deleted!`);
        this.router.navigate(['/home']); // Redirect to home or relevant page
      },
      error: (err) => {
        console.error(`Error deleting event with ID ${id}:`, err);
      }
    });
  }

  onUnregisterClicked(eventId: string) {
    this.loginStatus = this.authService.isAuthenticated();
  
    if (this.loginStatus) {
      this.eventService.unRegisterEvent(eventId).subscribe((isUnregistered) => {
        if (isUnregistered) {
          alert('You have successfully unregistered from the event.');
          this.router.navigate(['my-events']);
        } else {
          alert('You were not registered for this event.');
        }
      });
    } else {
      alert('Please login to unregister.');
      this.router.navigate(['login']);
    }
  }
  

}
