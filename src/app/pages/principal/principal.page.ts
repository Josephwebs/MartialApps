// principal.page.ts
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

interface Gimnasio {
  id: number;
  nombre: string;
  correo_electronico: string;
  telefono: string;
  ubicacion: string;
  horario: string;
  fecha_ingreso: string;
  descripcion: string;
  imagen_url: string;
  estado_id: number;
}

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  nombre: string = '';
  apellido: string = '';
  mdl_correo: string = '';
  gimnasios: any;

  constructor(
    private router: Router,
    private api: ApiService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    if (localStorage.getItem('idUsuario') === null) {
      this.presentToast('Debes ingresar a tu sesión', 'warning');
      this.router.navigate(['ingreso']);
    } else if (localStorage.getItem('idUsuario') === '') {
      this.mdl_correo = this.router.getCurrentNavigation().extras.state.correo;
    } else {
      this.mdl_correo = localStorage.getItem('idUsuario');
    }

    this.loadingController
      .create({
        message: 'Obteniendo Información...',
        spinner: 'lines',
      })
      .then((data) => {
        data.dismiss();
      });

    this.listarGimnasios();
  }

  registrarAsistencia() {
    let extras: NavigationExtras = {
      replaceUrl: true,
      state: {},
    };
    this.router.navigate(['scanner'], extras);
  }

  editar() {
    let extras: NavigationExtras = {
      replaceUrl: true,
      state: {},
    };
    this.router.navigate(['editar'], extras);
  }

  async listarGimnasios() {
    this.loadingController
      .create({
        message: 'Obteniendo Información...',
        spinner: 'lines',
      })
      .then(async (res) => {
        try {
          res.present();
          // Llama al método obtenerGimnasios() del servicio ApiService
          let data: any = await this.api.obtenerGimnasios();
          this.gimnasios = data.gimnasios;
          console.log(this.gimnasios); // Aquí puedes ver los datos de los gimnasios en la consola

          res.dismiss();
        } catch (error) {
          this.presentToast(
            'Ocurrió un error tratando de obtener la información. Por favor, inténtelo de nuevo más tarde.',
            'danger'
          );
          res.dismiss();
        }
      });
  }

  async presentToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      position: 'middle',
      color: color,
    });

    await toast.present();
  }

  capitalize(word: string) {
    return word[0].toUpperCase() + word.slice(1);
  }

  verClases(gimnasio: Gimnasio) {
    const extras: NavigationExtras = {
      queryParams: {
        gymId: gimnasio.id,
        gymName: gimnasio.nombre,
      },
    };
    this.router.navigate(['clases'], extras);
  }

  verSolicitudesReserva() {
    this.router.navigate(['/reservation-requests']);
  }
}
