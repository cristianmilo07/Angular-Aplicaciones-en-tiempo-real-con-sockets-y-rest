import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
//import * as io from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
 
  public socketStatus=false;
  private socket:any;
 
  constructor() {
    this.socket = io(environment.wsUrl);
    this.checkStatus();
   }
 
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

  // Para emitir || emit('EVENTO, payload?, callback?)
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


 
}