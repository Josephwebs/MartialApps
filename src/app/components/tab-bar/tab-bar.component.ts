import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss'],
})
export class TabBarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  cerrarSesion() {
    let extras: NavigationExtras = {
      replaceUrl: true,
      state: {},
    };
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('user');
    this.router.navigate(['ingreso'], extras);
  }

  home() {
    this.router.navigate(['principal']);
  }

  buscar() {
    this.router.navigate(['buscar']);
  }

  configuracion() {
    this.router.navigate(['configuracion']);
  }
}
