import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clases-detalle',
  templateUrl: './clases-detalle.page.html',
  styleUrls: ['./clases-detalle.page.scss'],
})
export class ClasesDetallePage {
  @Input() clase: any;

  constructor(
    private modalController: ModalController,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.clase = this.router.getCurrentNavigation().extras.state.clase;
    console.log(this.clase);
  }

  tomarClase() {
    const usuario = JSON.parse(localStorage.getItem('user'));
    const solicitud = {
      clase_id: this.clase.id,
      gimnasio_id: this.clase.tb_gimnasio_id,
      usuario_id: usuario.id,
      fecha: this.clase.df_fecha,
      hora: this.clase.df_hora,
    };

    this.apiService
      .reservarClase(solicitud)
      .then((response) => {
        if (response.ok) {
          alert('Solicitud de reserva enviada');
          this.router.navigate(['principal']);
        } else {
          alert('Error al enviar la solicitud');
        }
        this.modalController.dismiss();
      })
      .catch((error) => {
        alert('Error al enviar la solicitud');
        this.modalController.dismiss();
      });
  }
}
