import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AllEventsComponent } from './components/all-events/all-events.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { AuthGuard } from './guards/auth.guard';
import { MyEventsComponent } from './components/my-events/my-events.component';
import { ResolveGuard } from './guards/resolve.guard';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'all-events', component: AllEventsComponent, resolve: { events: ResolveGuard }, canActivate : [AuthGuard] },
  { path: 'profile', component: ProfileComponent },
  { path: 'my-events', component: MyEventsComponent, canActivate: [AuthGuard] },
  { path: 'register-event', component: EventFormComponent, canActivate: [AuthGuard] },
  { path: 'event/edit/:id', component: EventFormComponent },
  { path: 'event/:id', component: EventDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
