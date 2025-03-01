import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private API_URL = 'http://127.0.0.1:8000/api/users';
  private API_URL_REGISTER = 'http://127.0.0.1:8000/api/register';

  constructor(private http: HttpClient) {}

  // Crear usuario
  createUser(userData: any): Observable<any> {
    return this.http.post<any>(this.API_URL_REGISTER, userData).pipe(
      tap(response => console.log('Usuario creado:', response)),
      catchError(this.handleError)
    );
  }

  // Obtener todos los usuarios
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL).pipe(
      tap(users => console.log('Usuarios obtenidos:', users)),
      catchError(this.handleError)
    );
  }

  // Obtener un usuario por ID
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}`).pipe(
      tap(user => console.log(`Usuario obtenido (ID: ${id}):`, user)),
      catchError(this.handleError)
    );
  }

  // Actualizar un usuario por ID
  updateUser(id: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/${id}`, userData).pipe(
      tap(response => console.log(`Usuario actualizado (ID: ${id}):`, response)),
      catchError(this.handleError)
    );
  }

  // Eliminar un usuario por ID
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`).pipe(
      tap(() => console.log(`Usuario eliminado (ID: ${id})`)),
      catchError(this.handleError)
    );
  }

  // Obtener solo el total de usuarios
  getTotalUsers(): Observable<number> {
    return this.getUsers().pipe(
      map(users => users.length),
      tap(total => console.log('Total de usuarios:', total)),
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: any): Observable<never> {
    console.error('Error en la API:', error);
    
    let errorMessage = 'An error occurred. Please try again.';
    
    if (error.error) {
      if (error.status === 422) {
        // Laravel devuelve errores de validación en `errors`
        errorMessage = Object.values(error.error.errors).flat().join(' ');
      } else if (error.status === 400 || error.status === 500) {
        errorMessage = error.error.message || 'Something went wrong. Try again later.';
      }
    }
  
    return throwError(() => new Error(errorMessage));
  }
  
}
