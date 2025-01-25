import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Event } from 'src/app/model/Event';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute } from '@angular/router';
import { DialogueService } from 'src/app/services/dialogue.service';  

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
    expired: false,
    isRegistered: false,
  };

  eventTypes = this.eventService.getEventTypes();
  isImageUpload: boolean = false; // New property to handle image upload toggle
  isEditMode: boolean = false;
  eventId: string = '';

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private dialogueService: DialogueService 
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.eventId = params['id'];
        this.isEditMode = !!params['id'];
        this.fetchEventDetails(this.eventId);
      }
    });
  }

  fetchEventDetails(id: string): void {
    this.eventService.getEventByID(id).subscribe({
      next: (event) => {
        this.event = { ...event };
        this.updateExpiryStatus();
        if (this.eventForm) {
          this.populateFormWithEventDetails();
        }
      },
      error: (err) => {
        console.error('Error fetching event details:', err);
        this.dialogueService.showDialogue('networkError'); 
      },
    });
  }

  updateExpiryStatus(): void {
    const today = new Date();
    const eventDate = new Date(this.event.doe);
    this.event.expired = eventDate < today;
  }

  populateFormWithEventDetails(): void {
    this.eventForm.setValue({
      eventName: this.event.name || '',
      eventType: this.event.type || '',
      eventDate: this.event.doe || '',
      eventDesc: this.event.desc || '',
      eventLoc: this.event.location || '',
      eventOrganiser: this.event.organisedBy || '',
      eventImageURL: this.event.imageURL || '',
    });
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

  // onFormSubmit(): void {
  //   if (this.eventForm.invalid) {
  //     console.error('Form is invalid');
  //     this.dialogueService.showDialogue('registrationError');  
  //     return;
  //   }

  //   const formValues = this.eventForm.value;
  //   const today = new Date();
  //   const eventDate = new Date(formValues.eventDate);

  //   const isExpired = eventDate < today;

  //   if (this.isEditMode) {
  //     const updatedEvent: Event = {
  //       id: this.eventId,
  //       name: formValues.eventName,
  //       type: formValues.eventType,
  //       doe: formValues.eventDate,
  //       desc: formValues.eventDesc,
  //       location: formValues.eventLoc,
  //       organisedBy: formValues.eventOrganiser,
  //       imageURL: formValues.eventImageURL,
  //       expired: isExpired,
  //       isRegistered: this.event.isRegistered,
  //     };

  //     this.eventService.editEventDetails(this.eventId, updatedEvent).subscribe({
  //       next: () => {
  //         this.dialogueService.showDialogue('eventUpdated'); 
  //         this.eventForm.reset();
  //         this.isEditMode = false;
  //       },
  //       error: (err) => {
  //         console.error('Error updating event:', err);
  //         this.dialogueService.showDialogue('serverError');  
  //       },
  //     });
  //   } else {
  //     const newEvent: Event = {
  //       id: this.eventIDGenerate(),
  //       name: formValues.eventName,
  //       type: formValues.eventType,
  //       doe: formValues.eventDate,
  //       desc: formValues.eventDesc,
  //       location: formValues.eventLoc,
  //       organisedBy: formValues.eventOrganiser,
  //       imageURL: formValues.eventImageURL,
  //       expired: isExpired,
  //       isRegistered: this.event.isRegistered,
  //     };

  //     this.eventService.addNewEvent(newEvent);
  //     this.dialogueService.showDialogue('eventCreated'); 
  //     this.eventForm.reset();
  //   }
  // }

  onFormSubmit(): void {
    if (this.eventForm.invalid) {
      console.error('Form is invalid');
      this.dialogueService.showDialogue('registrationError');  
      return;
    }
  
    const formValues = this.eventForm.value;
    const today = new Date();
    const eventDate = new Date(formValues.eventDate);
  
    const isExpired = eventDate < today;
  
    const newEvent: Event = {
      id: this.isEditMode ? this.eventId : this.eventIDGenerate(),
      name: formValues.eventName,
      type: formValues.eventType,
      doe: formValues.eventDate,
      desc: formValues.eventDesc,
      location: formValues.eventLoc,
      organisedBy: formValues.eventOrganiser,
      imageURL: formValues.eventImageURL,
      expired: isExpired,
      isRegistered: this.event.isRegistered,
    };
  
    if (this.isEditMode) {
      this.eventService.editEventDetails(this.eventId, newEvent).subscribe({
        next: () => {
          this.dialogueService.showDialogue('eventUpdated'); 
          this.eventForm.reset();
          this.isEditMode = false;
        },
        error: (err) => {
          console.error('Error updating event:', err);
          this.dialogueService.showDialogue('serverError');  
        },
      });
    } else {
      this.eventService.addNewEvent(newEvent).subscribe({
        next: () => {
          this.dialogueService.showDialogue('eventCreated');
          this.eventService.registerEventForManager(newEvent); // Register event for eventManager
          this.eventForm.reset();
        },
        error: (err) => {
          console.error('Error creating event:', err);
          this.dialogueService.showDialogue('serverError');  
        },
      });
    }
  }
  

  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.event.imageURL = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
