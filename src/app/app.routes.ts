import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UsersComponent } from './components/users/users.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
  
  { path: '', component: LoginComponent, canActivate: [authGuard], },
  { path: 'register', component: SignupComponent },
  { path: '404', component: NotfoundComponent},
  {
    path: 'dashboard',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardComponent },
    ]
  },
  {
    path: 'users',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: UsersComponent } 
    ]
  },
  {
    path: 'tasks',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: TaskListComponent }
    ]
  },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];
