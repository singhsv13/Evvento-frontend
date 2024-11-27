import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/model/Event';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css'],
})
export class MyEventsComponent implements OnInit {
  events: Event[] = [];
  paginatedEvents: Event[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;

  constructor(private router: Router, private eventService: EventService) {}

  ngOnInit(): void {
    this.fetchRegisteredEvents();
    this.updatePaginatedEvents();
  }

  fetchRegisteredEvents(): void {
    // this.events = this.eventService.getRegisteredEvents();
    // this.updatePaginatedEvents();
    const allRegisteredEvents = this.eventService.getRegisteredEvents();
    const allEvents = this.eventService.getAllEvents(); // Fetch all current events from the service.

    // Filter registered events to ensure they still exist in the event list.
    this.events = allRegisteredEvents.filter((registeredEvent) =>
      allEvents.some((event) => event.id === registeredEvent.id)
    );

    this.updatePaginatedEvents();
  }

  updatePaginatedEvents(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedEvents = this.events.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedEvents();
  }

  totalPages(): number {
    return Math.ceil(this.events.length / this.itemsPerPage);
  }

  readMoreClicked(id: string): void {
    this.router.navigate(['event', id]);
  }
}
