import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [CommonModule, RouterOutlet],
  standalone: true,
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  constructor(private renderer: Renderer2, private router: Router) {}
  name:string|null = '';

  ngOnInit() {
    this.loadScript('/assets/template/vendor/jquery/jquery.min.js');
    this.loadScript('/assets/template/vendor/bootstrap/js/bootstrap.bundle.min.js');
    this.loadScript('/assets/template/vendor/jquery-easing/jquery.easing.min.js');
    this.loadScript('/assets/template/js/sb-admin-2.min.js');
    this.name = localStorage.getItem('name');
  }

  private loadScript(scriptUrl: string) {
    const script = this.renderer.createElement('script');
    script.src = scriptUrl;
    script.type = 'text/javascript';
    script.defer = true;
    this.renderer.appendChild(document.body, script);
  }

  logout() {
    localStorage.removeItem('token'); // Elimina el token de sesión
    localStorage.removeItem('name'); // Elimina el token de sesión
    this.router.navigate(['/']); // Redirige al login
  }
}

