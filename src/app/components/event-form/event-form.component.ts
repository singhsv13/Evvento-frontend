import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Event } from 'src/app/model/Event';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent implements OnInit {
  @ViewChild('regForm') eventForm: NgForm;

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

  eventTypes: string[] = [
    'Business & Professional',
    'Entertainment & Leisure',
    'Social & Community',
    'Awards & Recognition',
    'Various'
  ];

  isEditMode: boolean = false;
  eventId: string = '';

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.eventId = params['id'];
        console.log('Event Id fetched:', this.eventId);
        this.fetchEventDetails(this.eventId);
      }
    });

    this.route.queryParams.subscribe((params) => {
      this.isEditMode = params['edit'] === 'true';
      console.log('Edit Mode:', this.isEditMode);
    });
  }

  fetchEventDetails(id: string) {
  
    this.eventService.getEventByID(id).subscribe({
      next: (event) => {
        this.event = { ...event };
        console.log('Event Fetched:', this.event);
        if (this.isEditMode) {
          this.populateFormWithEventDetails(this.event);
        }
      },
      error: (err) => {
        console.error('Error fetching event details', err);
      },
    });
  }

  populateFormWithEventDetails(event: Event) {
    if (this.eventForm) {
      console.log('Populating form with event details:', this.eventForm);
      this.eventForm.setValue({
        eventName: event.name || '',
        eventType: event.type || '',
        eventDate: event.doe || '',
        eventDesc: event.desc || '',
        eventLoc: event.location || '',
        eventOrganiser: event.organisedBy || '',
        eventImageURL: event.imageURL || '',
      });
    }
  }

  eventIDGenerate(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const length = 10;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

  onFormSubmit() {
    if (this.eventForm.invalid) {
      console.error('Form is invalid');
      return;
    }
  
    const formValues = this.eventForm.value;
    console.log('Form Values:', formValues);
  
    if (this.isEditMode) {
      const updatedEvent: Event = {
        id: this.eventId,
        name: formValues.eventName,
        type: formValues.eventType,
        doe: formValues.eventDate,
        desc: formValues.eventDesc,
        location: formValues.eventLoc,
        organisedBy: formValues.eventOrganiser,
        imageURL: formValues.eventImageURL,
      };
      console.log('Updated Event:', updatedEvent);
  
      this.eventService.editEventDetails(this.eventId, updatedEvent).subscribe({
        next: (success) => {
          if (success) {
            alert('Event updated successfully');
            this.eventForm.reset();
            this.isEditMode = false; // Reset edit mode
          } else {
            alert('Failed to update event');
            console.error('Failed to update event');
          }
        },
        error: (err) => {
          alert(`Error updating event : ${err}`);
          console.error('Error updating event', err);
        },
      });
    } else {
      const newEvent: Event = {
        id: this.eventIDGenerate(),
        name: formValues.eventName,
        type: formValues.eventType,
        doe: formValues.eventDate,
        desc: formValues.eventDesc,
        location: formValues.eventLoc,
        organisedBy: formValues.eventOrganiser,
        imageURL: formValues.eventImageURL,
      };
  
      this.eventService.addNewEvent(newEvent);
    }
  
    this.eventForm.reset();
  }
}

