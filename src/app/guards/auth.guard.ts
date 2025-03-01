import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    // Si el usuario intenta ir a "/" y ya está logueado, lo mandamos a "/dashboard"
    if (route.routeConfig?.path === '') {
      router.navigate(['/dashboard']);
      return false;
    }
    return true; // Permitir acceso a rutas protegidas
  }

  // Si el usuario no está autenticado y trata de ir a una ruta protegida, lo mandamos a "/"
  if (route.routeConfig?.path !== '') {
    router.navigate(['/']);
    return false;
  }

  return true; // Permitir acceso a "/" si no está autenticado
};
