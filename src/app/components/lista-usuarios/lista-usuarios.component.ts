import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent {

  usuariosActivosObs!: Observable<any>;

  constructor(
    public chatService: ChatService
  ){}


  ngOnInit(): void {
    this.usuariosActivosObs = this.chatService.getUsuariosActivos();

    this.chatService.emitirUsuariosActivos();

  }
  
  

}
