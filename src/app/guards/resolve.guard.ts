import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { EventService } from '../services/event.service';
import { Event } from '../model/Event';

@Injectable({
  providedIn: 'root'
})
export class ResolveGuard implements Resolve<Event[]> {
  constructor(private eventService: EventService) {}

  resolve(): Observable<Event[]> {
    return this.eventService.getAllEventsObservable().pipe(
      catchError((error) => {
        console.error('Error fetching events:', error);
        return of([]); 
      })
    );
  }
}
