import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private _toastCtrl: ToastController;
  public webSocket: WebSocket;
  public isManualChecked: boolean;
  public isBombaChecked: boolean;
  public isValvula1Checked: boolean;
  public isValvula2Checked: boolean;
  public isValvula3Checked: boolean;
  public isServidorChecked: boolean;

  public isManualDisable: boolean;
  public isBombaDisable: boolean;
  public isValvula1Disable: boolean;
  public isValvula2Disable: boolean;
  public isValvula3Disable: boolean;
  public isServidorDisable: boolean;

  public distancia1: number;
  public distancia2: number;
  public altura1: number;
  public altura2: number;
  public nivel1: string;
  public nivel2: string;
  
  

  constructor(navCtrl: NavController, toastCtrl: ToastController) {
    this.webSocket = new WebSocket('ws://192.168.0.6:3000/rasp');
    this._toastCtrl = toastCtrl;
    this.isManualChecked = false;
    this.isBombaChecked = false;
    this.isValvula1Checked = false;
    this.isValvula2Checked = false;
    this.isValvula3Checked = true;
    this.isServidorChecked = false;

    this.isManualDisable = true;
    this.isBombaDisable = false;
    this.isValvula1Disable = false;
    this.isValvula2Disable = false;
    this.isValvula3Disable = false;
    this.isServidorDisable = false;

    this.distancia1 = 0;
    this.distancia2 = 0;
    this.altura1 = 0;
    this.altura2 = 0;
    this.nivel1 = this.getnivel(3);
    this.nivel2 = this.getnivel(3);

    var self = this;

    this.webSocket.onopen = function () {
      setTimeout(()=>self.checkServer(), 5000);
      console.log('open');
      this.send('hello');         // transmit "hello" after connecting
    };
  }

  getnivel(nivel: number): string {
    switch (nivel) {
      case 1: {
        return (this.distancia1 as any as string) + "/" + (this.altura1 as any as string);        
      }
      case 2: {
        return (this.distancia2 as any as string) + "/" + (this.altura2 as any as string);                
      }
    }
    return "0/0";
  }

  checkServer() {
    this.isServidorDisable = false;
    if (this.webSocket == undefined || this.webSocket.readyState === this.webSocket.CLOSED) this.isServidorChecked = true;
    else this.isServidorChecked = false;
    this.isServidorDisable = true;
  }


  showToast(position: string) {
    let toast = this._toastCtrl.create({
      message: 'Mmmm, buttered toast',
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }

}
