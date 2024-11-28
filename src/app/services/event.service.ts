import { Injectable } from '@angular/core';
import { Event } from '../model/Event';
import { BehaviorSubject, delay, map, Observable, of, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../model/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  eventList: Event[] = [
    {
      id: '1',
      name: 'Annual Business Summit',
      desc: 'A summit to discuss emerging business trends.',
      type: 'Business & Professional',
      location: 'New York, NY',
      doe: '2024-12-15',
      organisedBy: 'Global Business Forum',
      imageURL: 'https://example.com/images/business_summit.jpg',
    },
    {
      id: '2',
      name: 'Movie Marathon',
      desc: 'Enjoy a weekend of classic films back-to-back.',
      type: 'Entertainment & Leisure',
      location: 'Los Angeles, CA',
      doe: '2024-12-20',
      organisedBy: 'Cinema Lovers Club',
      imageURL: 'https://example.com/images/movie_marathon.jpg',
    },
    {
      id: '3',
      name: 'Community Cleanup Day',
      desc: 'Join us in keeping our community clean and beautiful.',
      type: 'Social & Community',
      location: 'Austin, TX',
      doe: '2024-11-30',
      organisedBy: 'Austin Green Team',
      imageURL: 'https://example.com/images/community_cleanup.jpg',
    },
    {
      id: '4',
      name: 'Employee of the Year Awards',
      desc: 'Celebrating the hard work and achievements of our employees.',
      type: 'Awards & Recognition',
      location: 'San Francisco, CA',
      doe: '2024-12-10',
      organisedBy: 'Tech Corp',
      imageURL: 'https://example.com/images/employee_awards.jpg',
    },
    {
      id: '5',
      name: 'Global Cuisine Festival',
      desc: 'Experience flavors from around the world.',
      type: 'Various',
      location: 'Chicago, IL',
      doe: '2024-12-05',
      organisedBy: 'World Foodie Events',
      imageURL: 'https://example.com/images/cuisine_festival.jpg',
    },
    {
      id: '6',
      name: 'Startup Pitch Night',
      desc: 'Pitch your startup idea to potential investors.',
      type: 'Business & Professional',
      location: 'Silicon Valley, CA',
      doe: '2024-12-18',
      organisedBy: 'Investor Hub',
      imageURL: 'https://example.com/images/pitch_night.jpg',
    },
    {
      id: '7',
      name: 'Charity Concert',
      desc: 'A concert to raise funds for local charities.',
      type: 'Entertainment & Leisure',
      location: 'Miami, FL',
      doe: '2024-12-12',
      organisedBy: 'Charity Beats',
      imageURL: 'https://example.com/images/charity_concert.jpg',
    },
    {
      id: '8',
      name: 'Neighborhood Potluck',
      desc: 'A chance to meet and greet with your neighbors.',
      type: 'Social & Community',
      location: 'Boston, MA',
      doe: '2024-11-28',
      organisedBy: 'Boston Community Group',
      imageURL: 'https://example.com/images/potluck.jpg',
    },
    {
      id: '9',
      name: 'Leadership Excellence Awards',
      desc: 'Recognizing outstanding leadership in the industry.',
      type: 'Awards & Recognition',
      location: 'Houston, TX',
      doe: '2024-12-22',
      organisedBy: 'Excellence Forum',
      imageURL: 'https://example.com/images/leadership_awards.jpg',
    },
    {
      id: '10',
      name: 'Art & Craft Workshop',
      desc: 'Unleash your creativity with guided art sessions.',
      type: 'Various',
      location: 'Seattle, WA',
      doe: '2024-12-02',
      organisedBy: 'Art Lovers Society',
      imageURL: 'https://example.com/images/art_workshop.jpg',
    },
    {
      id: '11',
      name: 'E-commerce Mastery',
      desc: 'A workshop on building and growing e-commerce stores.',
      type: 'Business & Professional',
      location: 'Dallas, TX',
      doe: '2024-12-08',
      organisedBy: 'Ecom Gurus',
      imageURL: 'https://example.com/images/ecommerce_workshop.jpg',
    },
    {
      id: '12',
      name: 'Jazz Evening',
      desc: 'Enjoy a night of soulful jazz music.',
      type: 'Entertainment & Leisure',
      location: 'New Orleans, LA',
      doe: '2024-12-14',
      organisedBy: 'Jazz Club',
      imageURL: 'https://example.com/images/jazz_evening.jpg',
    },
    {
      id: '13',
      name: 'Holiday Food Drive',
      desc: 'Donate food and help those in need during the holidays.',
      type: 'Social & Community',
      location: 'Atlanta, GA',
      doe: '2024-11-25',
      organisedBy: 'Helping Hands',
      imageURL: 'https://example.com/images/food_drive.jpg',
    },
    {
      id: '14',
      name: 'Best Startup Awards',
      desc: 'Celebrating innovative startups across industries.',
      type: 'Awards & Recognition',
      location: 'San Diego, CA',
      doe: '2024-12-17',
      organisedBy: 'Innovation Hub',
      imageURL: 'https://example.com/images/startup_awards.jpg',
    },
    {
      id: '15',
      name: 'Annual Book Fair',
      desc: 'Discover new books and meet local authors.',
      type: 'Various',
      location: 'Portland, OR',
      doe: '2024-12-01',
      organisedBy: 'Readers Paradise',
      imageURL: 'https://example.com/images/book_fair.jpg',
    },
    {
      id: '16',
      name: "Women's Empowerment Conference",
      desc: 'Empowering women to succeed in business and life.',
      type: 'Business & Professional',
      location: 'Phoenix, AZ',
      doe: '2024-12-09',
      organisedBy: 'EmpowerHer',
      imageURL: 'https://example.com/images/empowerment_conference.jpg',
    },
    {
      id: '17',
      name: 'Rock Music Festival',
      desc: 'A weekend of rock music with local bands.',
      type: 'Entertainment & Leisure',
      location: 'Las Vegas, NV',
      doe: '2024-12-13',
      organisedBy: 'Rock United',
      imageURL: 'https://example.com/images/rock_festival.jpg',
    },
    {
      id: '18',
      name: 'Public Speaking Workshop',
      desc: 'Improve your public speaking skills.',
      type: 'Various',
      location: 'Denver, CO',
      doe: '2024-12-06',
      organisedBy: 'Orators Hub',
      imageURL: 'https://example.com/images/speaking_workshop.jpg',
    },
    {
      id: '19',
      name: 'Science & Tech Awards',
      desc: 'Honoring advancements in science and technology.',
      type: 'Awards & Recognition',
      location: 'San Jose, CA',
      doe: '2024-12-19',
      organisedBy: 'FutureTech',
      imageURL: 'https://example.com/images/science_awards.jpg',
    },
    {
      id: '20',
      name: 'Local Farmers Market',
      desc: 'Support local farmers and buy fresh produce.',
      type: 'Social & Community',
      location: 'Sacramento, CA',
      doe: '2024-12-07',
      organisedBy: 'Sacramento Farmers Association',
      imageURL: 'https://example.com/images/farmers_market.jpg',
    },
  ];

  eventObs: Observable<Event> = new Observable<Event>();
  activeUser: User;

  constructor(private authService: AuthService, private router: Router) {}

  addNewEvent(event: Event) {
    console.log('added event : ', event);
    this.eventList.push(event);
  }

  getEventByID(id: string): Observable<Event> {
    // return this.eventList.find((event) => event.id === id)
    const event = this.eventList.find((event) => event.id === id);
    return of(event);
  }

  getAllEvents(): Event[] {
    return this.eventList;
  }

  getAllEventsObservable(): Observable<Event[]> {
    return of(this.eventList).pipe(delay(1000)); 
  }

  registerForEvent(eventId: string): Observable<boolean> {
    this.activeUser = this.authService.getActiveUser();

    if (this.activeUser) {
      const alreadyRegisteredEvent = this.activeUser.regEvents?.find(
        (event) => event.id === eventId
      );

      if (alreadyRegisteredEvent) {
        console.error('User is already registered for this event.');
        return of(false);
      }

      return this.getEventByID(eventId).pipe(
        map((event) => {
          if (event) {
            if (!this.activeUser.regEvents) {
              this.activeUser.regEvents = [];
            }
            this.activeUser.regEvents.push(event);
            console.log('User registered for event:', event);
            return true;
          }
          return false;
        })
      );
    } else {
      console.error('No active user found.');
      return of(false);
    }
  }

  getRegisteredEvents(): Event[] {
    this.activeUser = this.authService.getActiveUser();
    console.log('Registered Events : ', this.activeUser.regEvents);
    return this.activeUser ? this.activeUser.regEvents : [];
  }

  editEventDetails(eventId: string, updatedEvent: Event): Observable<boolean> {
    const eventIndex = this.eventList.findIndex(
      (event) => event.id === eventId
    );

    if (eventIndex !== -1) {
      this.eventList[eventIndex] = updatedEvent;
      console.log('Event updated:', updatedEvent);
      return of(true); // Return success
    } else {
      console.error('Event not found.');
      return of(false); // Return failure
    }
  }

  deleteEvent(eventId: string): Observable<Event[]> {
    const eventIndex = this.eventList.findIndex(
      (event) => event.id === eventId
    );
    if (eventIndex !== -1) {
      this.eventList.splice(eventIndex, 1);
      console.log(`Event with ID ${eventId} successfully deleted.`);
      return of(this.eventList);
    } else {
      console.error(`Event with ID ${eventId} not found.`);
      return of(this.eventList);
    }
  }

  unRegisterEvent(eventId: string): Observable<boolean> {
    this.activeUser = this.authService.getActiveUser();

    if (this.activeUser && this.activeUser.regEvents) {
      const eventIndex = this.activeUser.regEvents.findIndex(
        (event) => event.id === eventId
      );

      if (eventIndex !== -1) {
        this.activeUser.regEvents.splice(eventIndex, 1);
        console.log(`Unregistered from event with ID ${eventId}`);
        return of(true);
      } else {
        console.error('Event not found in registered events.');
        return of(false);
      }
    } else {
      console.error('No active user or no registered events found.');
      return of(false);
    }
  }
}
