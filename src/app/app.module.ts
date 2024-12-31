import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MatchesComponent } from './components/matches/matches.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { HeaderComponent } from './common/header/header.component';
import { CenterTableComponent } from './common/center-table/center-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CenterFormComponent } from './common/center-form/center-form.component';
import { TeamsComponent } from './components/teams/teams.component';
import { UsersComponent } from './components/users/users.component';
import { SpinnerComponent } from './common/spinner/spinner.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    MatchesComponent,
    SidebarComponent,
    HeaderComponent,
    CenterTableComponent,
    CenterFormComponent,
    TeamsComponent,
    UsersComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    // DatePipe,

    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing'
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
