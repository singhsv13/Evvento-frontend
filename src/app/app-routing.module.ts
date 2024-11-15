import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { AuthGuard } from './guards/auth.guard';
// import { AuthguardService } from './services/authguard.service';
import { MyEventsComponent } from './components/my-events/my-events.component';
import { ResolveGuard } from './guards/resolve.guard';

const routes: Routes = [
  // { path: 'home', component: HomeComponent },
  { path: 'all-events', component: HomeComponent},
  { path: 'my-events', component: MyEventsComponent, canActivate : [AuthGuard]},
  { path: 'register-event', component: EventFormComponent },
  { path: 'event/edit/:id', component: EventFormComponent },
  { path: 'event/:id', component: EventDetailsComponent, children : [
    // { path: 'my-events', component: MyEventsComponent, canActivate : [AuthguardService]},
  ], resolve : [ResolveGuard]},
  { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  { path: '', redirectTo : '/all-events', pathMatch : 'full' },
  { path: '**', component: NotFoundComponent  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
