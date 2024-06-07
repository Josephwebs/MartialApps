import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
  userId: any = localStorage.getItem('idUsuario'); // Aquí deberías obtener el ID del usuario autenticado
  isModalOpen: boolean = false;
  modalType: string = '';
  modalTitle: string = '';
  modalLabel: string = '';
  modalInput: string = '';

  constructor(
    private userService: ApiService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  cerrarSesion() {
    localStorage.removeItem('idUsuario');
    this.router.navigate(['/ingreso']);
  }

  openModal(type: string) {
    this.modalType = type;
    switch (type) {
      case 'username':
        this.modalTitle = 'Cambiar Nombre de Usuario';
        this.modalLabel = 'Nombre de Usuario';
        break;
      case 'email':
        this.modalTitle = 'Cambiar Correo Electrónico';
        this.modalLabel = 'Correo Electrónico';
        break;
      case 'phone':
        this.modalTitle = 'Cambiar Teléfono';
        this.modalLabel = 'Teléfono';
        break;
      case 'password':
        this.modalTitle = 'Cambiar Contraseña';
        this.modalLabel = 'Contraseña';
        break;
      case 'delete':
        this.modalTitle = 'Eliminar Cuenta';
        break;
    }
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.modalType = '';
    this.modalTitle = '';
    this.modalLabel = '';
    this.modalInput = '';
  }

  async submitModal() {
    try {
      switch (this.modalType) {
        case 'username':
          await this.userService.changeUsername(this.userId, this.modalInput);
          break;
        case 'email':
          await this.userService.changeEmail(this.userId, this.modalInput);
          break;
        case 'phone':
          await this.userService.changePhone(this.userId, this.modalInput);
          break;
        case 'password':
          await this.userService.changePassword(this.userId, this.modalInput);
          break;
        case 'delete':
          await this.userService.deleteAccount(this.userId);
          this.cerrarSesion();
          break;
      }
      this.closeModal();
      this.presentToast('Accion realizada con exito', 'success');
    } catch (error) {
      this.presentToast(
        'Hubo un error en la acción, por favor intente nuevamente',
        'danger'
      );
      console.error(
        `Error al ${this.modalType === 'delete' ? 'eliminar' : 'cambiar'} ${
          this.modalType
        }:`,
        error
      );
    }
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
}
