import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  texto = '';
  
  mensajes: any[] = [];
  
  constructor(
    public chatService: ChatService,
    //public elemento: HTMLElement
  ){}

  ngOnInit(): void {
    //this.elemento = document.getElementById('chat-mensajes')!;
    
     this.chatService.getMessages().subscribe( (msg) => {
      
      console.log(msg);
      this.mensajes.push(msg);
      setTimeout(() => {
        //this.elemento.scrollTop = this.elemento.scrollHeight
      }, 50);

    })
  }
  enviar(){
    if (this.texto.trim().length === 0) {
      return;
    }
    this.chatService.sendMessage(this.texto);
    this.texto = '';
  }
}
