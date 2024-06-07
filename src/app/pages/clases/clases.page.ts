import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {
  clases: any;
  gymId: number;
  gymName: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.gymId = params['gymId'];
      this.gymName = params['gymName'];
      this.listarClases();
    });
  }

  async listarClases() {
    const loading = await this.loadingController.create({
      message: 'Obteniendo clases...',
      spinner: 'lines',
    });

    await loading.present();

    try {
      const data = await this.api.obtenerClases(this.gymId);
      this.clases = data;
    } catch (error) {
      this.presentErrorToast('Error al obtener las clases');
      console.error(error);
    } finally {
      loading.dismiss();
    }
  }

  async presentToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      position: 'middle',
      color: color,
    });
  }

  async presentErrorToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 5000,
      position: 'middle',
      color: 'danger',
    });

    await toast.present();
  }

  verDetalleClase(clase: any) {
    const navigationExtras: NavigationExtras = {
      replaceUrl: true,
      state: {
        clase: clase,
      },
    };
    this.router.navigate(['clases-detalle', clase.id], navigationExtras);
  }
}
