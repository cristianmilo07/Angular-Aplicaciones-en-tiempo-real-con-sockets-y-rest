import { Component } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  nombre = '';

  constructor(
    public wsService: WebsocketService,
    private router: Router
  ){}

  ingresar(){
    if (this.nombre.trim().length === 0) {
      return;
    }
    this.wsService.loginWs(this.nombre)
      .then( ()=> {
        this.router.navigateByUrl('/mensajes')
      });
  }



}
