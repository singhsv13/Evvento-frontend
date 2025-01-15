import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/modules/shared.module';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AllEventsComponent } from './components/all-events/all-events.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { MyEventsComponent } from './components/my-events/my-events.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';

import { CustomDateValidatorDirective } from './shared/validators/custom-date-validator.directive';
import { HomeComponent } from './components/home/home.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    AllEventsComponent,
    NotFoundComponent,
    EventFormComponent,
    EventDetailsComponent,
    MyEventsComponent,
    FooterComponent,
    ProfileComponent,
    CustomDateValidatorDirective,
    HomeComponent,
    UnauthorizedComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
