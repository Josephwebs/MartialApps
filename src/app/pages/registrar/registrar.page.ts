import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  mdl_correo: string = '';
  mdl_pass: string = '';
  mdl_nombre: string = '';
  mdl_apellido: string = '';
  mdl_telefono: string = '';
  mdl_nivel_artes_marciales_id: number;
  mdl_tipo_usuario_id: number;
  mdl_usuario_estado_id: number;
  mdl_nivel_id: number;
  mdl_contacto_emergencia_id: any;

  constructor(
    private router: Router,
    private api: ApiService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  navegar() {
    let extras: NavigationExtras = {
      replaceUrl: true,
      state: {},
    };
    this.router.navigate(['ingreso'], extras);
  }

  registerUser() {
    let that = this;
    this.loadingController
      .create({
        message: 'Creando usuario...',
        spinner: 'lines',
      })
      .then(async (loading) => {
        loading.present();
        if (
          this.mdl_correo !== '' &&
          this.mdl_pass !== '' &&
          this.mdl_nombre !== '' &&
          this.mdl_apellido !== ''
        ) {
          try {
            await this.api.registrarUsuario(
              this.mdl_nombre,
              this.mdl_correo,
              this.mdl_pass,
              this.mdl_telefono, // Agrega el teléfono aquí
              this.mdl_nivel_artes_marciales_id, // Agrega el ID del nivel de artes marciales aquí
              this.mdl_tipo_usuario_id, // Agrega el ID del tipo de usuario aquí
              this.mdl_usuario_estado_id, // Agrega el ID del estado de usuario aquí
              this.mdl_nivel_id, // Agrega el ID del nivel aquí
              this.mdl_contacto_emergencia_id // Agrega el ID del contacto de emergencia aquí
            );
            that.presentToast('Usuario creado correctamente');
            this.navegar();
          } catch (error) {
            console.error(error);
            that.presentErrorToast('Error al crear usuario');
          }
        } else {
          that.presentErrorToast('Debe rellenar todos los campos');
        }
        loading.dismiss();
      });
  }
  

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1700,
      position: 'middle',
      color: 'success',
    });

    await toast.present();
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
  back() {
    this.router.navigate(['ingreso']);
  }
}
