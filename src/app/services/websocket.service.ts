import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Usuario } from '../classes/usuario';
//import * as io from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
 
  public socketStatus=false;
  private socket:any;
  //public usuario: Usuario;
 
  constructor() {
    this.socket = io(environment.wsUrl);
    this.checkStatus();
   }
 
   // Metodo para revisar estado del servidor
   checkStatus(){
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus=true;
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
        Subscriber.next(data)
      })
    })
  }


  loginWs(nombre: string){
    console.log("configurando")
    this.socket.emit('Configurar-usuario', {nombre}, ( resp: any )=> {
      console.log(resp)
    })

  }


 
}