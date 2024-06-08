import { Component, Input } from '@angular/core';
import {
  ModalController,
  ToastController,
  LoadingController,
} from '@ionic/angular';
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
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state && navigation.extras.state.clase) {
      this.clase = navigation.extras.state.clase;
    } else {
      // handle no state passed
    }
  }

  async tomarClase() {
    const usuario = JSON.parse(localStorage.getItem('user'));
    const solicitud = {
      clase_id: this.clase.id,
      gimnasio_id: this.clase.tb_gimnasio_id,
      usuario_id: usuario.id,
      fecha: this.clase.df_fecha,
      hora: this.clase.df_hora,
    };

    const loading = await this.loadingController.create({
      message: 'Procesando solicitud...',
    });
    await loading.present();

    this.apiService
      .reservarClase(solicitud)
      .then(async (response) => {
        if (response.ok) {
          await loading.dismiss();
          this.presentToast('Solicitud de reserva enviada', 'success');
          this.router.navigate(['principal']);
        } else {
          await loading.dismiss();
          this.presentToast('Error al enviar la solicitud', 'danger');
        }
        this.modalController.dismiss();
      })
      .catch(async (error) => {
        await loading.dismiss();
        this.presentToast('Error al enviar la solicitud', 'danger');
        this.modalController.dismiss();
      });
  }

  async presentToast(mensaje, color) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1700,
      position: 'middle',
      color: color,
    });

    await toast.present();
  }
}
