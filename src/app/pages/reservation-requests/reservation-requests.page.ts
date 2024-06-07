import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-reservation-requests',
  templateUrl: './reservation-requests.page.html',
  styleUrls: ['./reservation-requests.page.scss'],
})
export class ReservationRequestsPage implements OnInit {
  solicitudes: any[];

  constructor(private api: ApiService) {}

  ngOnInit() {
    // Obtener el ID del usuario del local storage
    const userId: any = localStorage.getItem('idUsuario');

    this.api.obtenerSolicitudesReservaUsuario(userId).then((data: any) => {
      this.solicitudes = data;
    });
  }
}
