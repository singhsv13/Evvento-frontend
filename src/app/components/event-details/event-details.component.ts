import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/model/Event';
import { ActivatedRoute, Router } from '@angular/router';
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
    expired: false,
  };
  loginStatus: boolean = false;

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.id = params['id'];
        if (this.id) {
          this.fetchEventById(this.id);
        }
      },
      error: (err) => {
        console.error('Error retrieving route parameters:', err);
      },
    });
  }

  fetchEventById(id: string) {
    this.eventService.getEventByID(id).subscribe({
      next: (data) => {
        if (data) {
          this.event = { ...data };
          console.log('Event fetched:', this.event);
        } else {
          console.error('Event data is empty');
        }
      },
      error: (err) => {
        console.error('Error fetching event details:', err);
        alert('Error fetching event details. Please try again later.');
      },
    });
  }

  onRegisterClicked(eventId: string) {
    this.loginStatus = this.authService.isAuthenticated();

    if (this.loginStatus) {
      this.eventService.registerForEvent(eventId).subscribe({
        next: (isRegistered) => {
          if (isRegistered) {
            alert('You have successfully registered for the event!');
            this.router.navigate(['my-events']);
          } else {
            alert('You are already registered for this event!');
          }
        },
        error: (err) => {
          console.error('Registration failed:', err);
          alert('Something went wrong while trying to register.');
        },
      });
    } else {
      alert('Please log in to register!');
      this.router.navigate(['login']);
    }
  }

  onUnregisterClicked(eventId: string) {
    this.loginStatus = this.authService.isAuthenticated();

    if (this.loginStatus) {
      this.eventService.unRegisterEvent(eventId).subscribe({
        next: (isUnregistered) => {
          if (isUnregistered) {
            alert('You have successfully unregistered from the event.');
            this.router.navigate(['my-events']);
          } else {
            alert('You were not registered for this event.');
          }
        },
        error: (err) => {
          console.error('Unregistration failed:', err);
          alert('Something went wrong while trying to unregister.');
        },
      });
    } else {
      alert('Please log in to unregister!');
      this.router.navigate(['login']);
    }
  }

  onEditClicked(id: string) {
    this.router.navigate([`/event/edit`, id], {
      queryParams: { edit: true },
    });
  }

  onDeleteClicked(id: string) {
    this.eventService.deleteEvent(id).subscribe({
      next: () => {
        alert(`Event with ID ${id} successfully deleted!`);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error deleting event:', err);
        alert('Could not delete event. Please try again later.');
      },
    });
  }

  isEventExpired(): boolean {
    const currentDate = new Date();
    const eventDate = new Date(this.event.doe);
    return eventDate < currentDate;
  }

}
