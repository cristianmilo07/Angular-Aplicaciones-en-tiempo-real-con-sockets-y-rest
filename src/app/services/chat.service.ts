import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsService: WebsocketService
  ) {}

  // Enviar mensajes
  sendMessage( mensaje:string ){

    const payload = {
      de: 'Cristian',
      cuerpo: mensaje
    };

    this.wsService.emit('mensaje', payload);
  }

  // Escuchar mensajes estar pendiente del observable de listen()
  getMessages(){
    return this.wsService.listen('mensaje-nuevo')
  }

}