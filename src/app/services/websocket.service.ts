import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Usuario } from '../classes/usuario';
import { Router } from '@angular/router';
//import * as io from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
 
  public socketStatus=false;
  private socket:any
  public usuario!: Usuario;
 
  constructor( 
    private router: Router
   ) {
    this.socket = io(environment.wsUrl);
    this.cargarStorage();
    this.checkStatus();

   }
 
   // Metodo para revisar estado del servidor
   checkStatus(){
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus=true;
      this.cargarStorage();
    });
 
    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus=false;
    });
  }
  
  // Para emitir o emisiones de algún tipo de eventos q quiero decir al sevidor q estoy disparando|| emit('EVENTO, payload?, callback?)
  emit( evento: string, payload?: any, callback?:Function ) {

    console.log('Emitiendo', evento)
    // Para emitir un evento al servidor('EVENTO, payload?, callback?)

    this.socket.emit(evento, payload, callback);
    
  }

  //escuchar cualquier evento || escuchar el evento q emita el servidor
  listen (evento: string) {
    return new Observable((Subscriber) => {
      this.socket.on(evento, (data: unknown) => {
        console.log('data',data)
        Subscriber.next(data)
      })
    })
  }


  loginWs(nombre: string){

    return new Promise<void>(( resolve, reject) => {
        console.log("configurando")
        this.socket.emit('Configurar-usuario', {nombre}, ( resp: any )=> {
        console.log("a",resp)

        this.usuario = new Usuario(nombre);
        this.guardarStorage();
        resolve();
      });
    });
  }

  logoutWS() {
    this.usuario = null!;
    localStorage.removeItem('usuario');

    const payload = {
      nombre: 'sin-nombre'
    };
    this.emit('Configurar-usuario', payload, ()=>{})
    this.router.navigateByUrl('');
  }

  getUsuario(){
    return this.usuario;
  }

  guardarStorage(){
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage(){
    if ( localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario') || '{}' );
      this.loginWs(this.usuario.nombre);
    }
    return this.usuario;
  }
}