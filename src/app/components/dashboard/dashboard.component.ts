import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalUsers: number = 0;
  totalTasks: number = 0;
  completedTasks: number = 0;
  uncompletedTasks: number = 0;

  constructor(private router: Router, private usersService: UsersService, private taskService: TaskService) {}

  ngOnInit() {
    this.getTotalUsers();

    this.taskService.getTotalTasks().subscribe(total => {
      this.totalTasks = total;
    });

    this.taskService.getCompletedTasks().subscribe(completed => {
      this.completedTasks = completed;
    });

    this.taskService.getUncompletedTasks().subscribe(uncompleted => {
      this.uncompletedTasks = uncompleted;
    });

  }

  getTotalUsers() {
    this.usersService.getTotalUsers().subscribe(total => {
      this.totalUsers = total;
    });
  }

  logout() {
    localStorage.removeItem('token'); // Elimina el token de sesión
    this.router.navigate(['/login']); // Redirige al login
  }
}
