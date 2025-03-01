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
  // Ruta pública para el login SIN authGuard
  { path: '', component: LoginComponent, canActivate: [authGuard], },
  { path: 'register', component: SignupComponent },

  { path: '404', component: NotfoundComponent},

  // Ruta protegida con AdminLayout
  {
    path: 'dashboard',  // 🔹 Prefijo para rutas de administración
    component: AdminLayoutComponent,
    canActivate: [authGuard], // Protege las rutas internas
    children: [
      { path: '', component: DashboardComponent },
    ]
  },

  {
    path: 'users',  // 🔹 Prefijo para rutas de administración
    component: AdminLayoutComponent,
    canActivate: [authGuard], // Protege las rutas internas
    children: [
      { path: '', component: UsersComponent } // Puedes cambiar este componente si es necesario
    ]
  },

  {
    path: 'tasks',  // 🔹 Prefijo para rutas de administración
    component: AdminLayoutComponent,
    canActivate: [authGuard], // Protege las rutas internas
    children: [
      { path: '', component: TaskListComponent } // Puedes cambiar este componente si es necesario
    ]
  },

  // Redirección por defecto si la ruta no existe
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];
