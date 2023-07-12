import { Component } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  nombre = '';

  constructor(
    public wsService: WebsocketService
  ){}

  ingresar(){
    if (this.nombre.trim().length === 0) {
      return;
    }
    this.wsService.loginWs(this.nombre);
  }



}
