import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatchesComponent } from './components/matches/matches.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { TeamsComponent } from './components/teams/teams.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: 'login',
    title:"Login",
    component: LoginComponent
  },
  { path: 'registration',
    title:"Register",
    component: RegistrationComponent
  },
  { path: 'profile',
    title:"Profile",
    component: ProfileComponent
  },
  { path: 'teams',
    title:"Teams",
    component: TeamsComponent
  },
  { path: 'matches',
    title:"Matches",
    component: MatchesComponent
  },
  { path: 'users',
    title:"Users",
    component: UsersComponent
  },
  { path: '',
    title:"Home",
    pathMatch: 'full',
    component: DashboardComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
