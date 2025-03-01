import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Task {
  id?: number;
  title: string;
  description?: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://127.0.0.1:8000/api/tasks'; // Ajusta la URL según el backend

  private http = inject(HttpClient);

  // Obtener todas las tareas
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // Crear tarea
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  // Actualizar tarea
  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  // Eliminar tarea
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Obtener el total de tareas
  getTotalTasks(): Observable<number> {
    return this.getTasks().pipe(
      map(tasks => tasks.length) // Contamos el total de tareas
    );
  }

  // 🔹 Obtener el total de tareas completadas
  getCompletedTasks(): Observable<number> {
    return this.getTasks().pipe(
      map(tasks => tasks.filter(task => task.completed).length) // Filtramos solo las tareas completadas
    );
  }

  // 🔹 Obtener el total de tareas completadas
  getUncompletedTasks(): Observable<number> {
    return this.getTasks().pipe(
      map(tasks => tasks.filter(task => !task.completed).length) // Filtramos solo las tareas completadas
    );
  }
}
