import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/model/Event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  eventList: Event[] = [];

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.eventService.getAllEventsObservable().subscribe((data) => {
      this.eventList = data;
    });
    this.eventList = this.getUpcomingEvents();
    // console.log(this.eventList);
  }

  onExploreClicked() {
    this.router.navigateByUrl('all-events');
  }

  getUpcomingEvents() {
    const today = new Date();

    const upcomingEvents = this.eventList.filter(
      (event) => new Date(event.doe) > today
    );

    upcomingEvents.sort(
      (a, b) => new Date(a.doe).getTime() - new Date(b.doe).getTime()
    );

    return upcomingEvents.slice(0, 3);
  }

  onBtnClicked() {
    this.router.navigateByUrl('login');
  }
}
