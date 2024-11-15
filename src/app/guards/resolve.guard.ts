import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { EventService } from '../services/event.service';
import { UserService } from '../services/user.service';
import { Event } from '../model/Event';

@Injectable({
  providedIn: 'root'
})
export class ResolveGuard implements Resolve<any> {

    constructor(private eventService : EventService, private userService : UserService){}

    resolve() {
        return ;
    }
}