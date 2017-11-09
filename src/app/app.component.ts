import {Component, OnInit} from '@angular/core';
import {WebsocketService} from "./app.service";
import {Subscriber} from "rxjs/Subscriber";
import {notificacion} from "./notificacion";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WebsocketService]
})
export class AppComponent implements OnInit{

  public notif:notificacion;
  constructor(private websocket:WebsocketService){}
  ngOnInit(): void {
    this.notif=new notificacion();
    this.recibir().subscribe(
        mensaje=>{
          console.log(mensaje);
        }
    );


  }
  mess(){
    this.websocket.send(JSON.stringify(this.notif));
  }

  recibir(){
      let obs=Subscriber.create();
      return this.websocket.createObservableSocket('ws://localhost:8080','echo-protocol',obs)
          .map(res=>JSON.parse(res));
  }
}
