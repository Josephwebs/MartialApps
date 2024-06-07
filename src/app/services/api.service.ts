import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  ruta: string = 'http://127.0.0.1:5000/';

  constructor(private http: HttpClient) {}

  loginPersona(correo, contrasena) {
    let that = this;
    let body = {
      dc_correo_electronico: correo,
      dc_contrasena: contrasena,
      user_type: 'usuario',
    };

    return that.http.post(that.ruta + 'login', body).toPromise();
  }
  AlmacenarUsuario(correo, contrasena, nombre, apellido) {
    let that = this;

    return new Promise((resolve) => {
      resolve(
        that.http
          .post(that.ruta, {
            nombreFuncion: 'UsuarioAlmacenar',
            parametros: [correo, contrasena, nombre, apellido],
          })
          .toPromise()
      );
    });
  }

  modificarPass(correo, contrasenaNueva, contrasenaActual) {
    let that = this;

    return new Promise((resolve) => {
      resolve(
        that.http
          .patch(that.ruta, {
            nombreFuncion: 'UsuarioModificarContrasena',
            parametros: [correo, contrasenaNueva, contrasenaActual],
          })
          .toPromise()
      );
    });
  }

  obtenerGimnasios() {
    let that = this;

    return that.http.get(that.ruta + 'gyms').toPromise();
  }

  obtenerNiveles() {
    return this.http.get<any[]>(`${this.ruta}niveles`).toPromise();
  }

  obtenerClases(gymId: number): Promise<any> {
    return this.http.get(`${this.ruta}classes/${gymId}`).toPromise();
  }

  // Método para registrar un nuevo usuario
  registrarUsuario(
    correo: string,
    contrasena: string,
    nombre: string,
    telefono: string,
    nivelArtesMarcialesId: number,
    tipoUsuarioId: number,
    usuarioEstadoId: number,
    nivelId: number,
    contactoEmergenciaId: number,
    dc_apellido: string
  ) {
    console.log(correo, contrasena);
    const body = {
      dc_nombre: nombre,
      dc_correo_electronico: correo,
      dc_contrasena: contrasena,
      dc_telefono: telefono,
      tb_nivel_artes_marciales_id: nivelArtesMarcialesId,
      tb_tipo_usuario_id: tipoUsuarioId,
      tb_usuario_estado_id: usuarioEstadoId,
      tb_nivel_id: nivelId,
      tb_contacto_emergencia_id: contactoEmergenciaId,
      es_gimnasio: false,
      dc_apellido: dc_apellido,
    };

    return this.http.post(this.ruta + 'register', body).toPromise();
  }

  /**
   * Servicios de configuracion de usuario
   */

  changeUsername(userId: number, nombre: string): Promise<any> {
    return this.http
      .put<any>(`${this.ruta}/change_username`, {
        user_id: userId,
        nombre,
      })
      .toPromise();
  }

  changeEmail(userId: number, correo: string): Promise<any> {
    return this.http
      .put<any>(`${this.ruta}/change_email`, {
        user_id: userId,
        correo,
      })
      .toPromise();
  }

  changePhone(userId: number, telefono: string): Promise<any> {
    return this.http
      .put<any>(`${this.ruta}/change_phone`, {
        user_id: userId,
        telefono,
      })
      .toPromise();
  }

  changePassword(userId: number, contrasena: string): Promise<any> {
    return this.http
      .put<any>(`${this.ruta}/change_password`, {
        user_id: userId,
        contrasena,
      })
      .toPromise();
  }

  deleteAccount(userId: number): Promise<any> {
    return this.http
      .delete<any>(`${this.ruta}/delete_account`, {
        body: { user_id: userId },
      })
      .toPromise();
  }

  // Método para reservar una clase
  reservarClase(solicitud: any): Promise<any> {
    return this.http.post(`${this.ruta}reservarClase`, solicitud).toPromise();
  }

  obtenerSolicitudesReservaUsuario(tb_usuario_id: string) {
    return this.http
      .get<any[]>(
        `${this.ruta}user/reservation-requests?tb_usuario_id=${tb_usuario_id}`
      )
      .toPromise();
  }
}
