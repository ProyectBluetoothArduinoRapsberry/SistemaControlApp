import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private _toastCtrl: ToastController;
  public isManualChecked: boolean;
  public isBombaChecked: boolean;
  public isValvula1Checked: boolean;
  public isValvula2Checked: boolean;
  public isValvula3Checked: boolean;
  public isServidorChecked: boolean;
  public distancia1: number;
  public distancia2: number;
  public altura1: number;
  public altura2: number;
  public nivel1: string;
  public nivel2: string;
  
  

  constructor(navCtrl: NavController, toastCtrl: ToastController) {
    var webSocket = new WebSocket('ws://192.168.0.6:3000/rasp');
    this._toastCtrl = toastCtrl;
    this.isManualChecked = true;
    this.isBombaChecked = false;
    this.isValvula1Checked = false;
    this.isValvula2Checked = false;
    this.isValvula3Checked = true;
    this.isServidorChecked = false;
    this.distancia1 = 0;
    this.distancia2 = 0;
    this.altura1 = 0;
    this.altura2 = 0;
    this.nivel1 = this.getnivel(3);
    this.nivel2 = this.getnivel(3);

    webSocket.onopen = function () {
      console.log('open');
      this.send('hello');         // transmit "hello" after connecting
    };

   // let self = this._webSocket;
    //this._webSocket.onopen = function () {
    //  //console.log("Test");
    //  //self.send("Something");
    //};
  }

  getnivel(nivel: number): string {
    switch (nivel) {
      case 1: {
        return this.distancia1 + "/" + this.altura1;        
      }
      case 2: {
        return this.distancia2 + "/" + this.altura2;
        break;
      }
    }
    return "0/0";
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
