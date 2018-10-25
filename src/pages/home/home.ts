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
  
  public listImagesNivel: Array < string > =[ "assets/img/NivelesTanque/nivel0.png",
                                              "assets/img/NivelesTanque/nivel1.png",
                                              "assets/img/NivelesTanque/nivel2.png",
                                              "assets/img/NivelesTanque/nivel3.png",
                                              "assets/img/NivelesTanque/nivel4.png",
                                              "assets/img/NivelesTanque/nivel5.png"];

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

  public pathImageNivel1: string;
  public pathImageNivel2: string;
  
  

  constructor(navCtrl: NavController, toastCtrl: ToastController) {
    this.webSocket = new WebSocket('ws://192.168.0.6:3000/rasp');
    this._toastCtrl = toastCtrl;
    this.isManualChecked = false;
    this.isBombaChecked = false;
    this.isValvula1Checked = false;
    this.isValvula2Checked = false;
    this.isValvula3Checked = false;
    this.isServidorChecked = false;

    this.isManualDisable = true;
    this.isBombaDisable = true;
    this.isValvula1Disable = true;
    this.isValvula2Disable = true;
    this.isValvula3Disable = true;
    this.isServidorDisable = true;


    this.distancia1 = 0;
    this.distancia2 = 0;
    this.altura1 = 0;
    this.altura2 = 0;
    this.nivel1 = this.getTextNivel(1); // Parameter 1:nivel1 ; 2:nivel2
    this.nivel2 = this.getTextNivel(2);

    this.changeImageTanque();

    var self = this;
    this.webSocket.onopen = function () {
      setTimeout(() => self.checkServer(), 5000);
      console.log('open');
      this.send('hello');         // transmit "hello" after connecting
    };
  }

  getTextNivel(nivel: number): string {
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
    
    //this.isServidorDisable = false;
    if (this.webSocket == undefined || this.webSocket.readyState === this.webSocket.CLOSED) this.isServidorChecked = false;
    else this.isServidorChecked = true;
    //this.isServidorDisable = true;


  }


  changeImageTanque() {
    //listImagesNivel
    this.altura1 = (this.altura1 == undefined || this.altura1 == 0) ? 1 : this.altura1;
    this.altura2 = (this.altura2 == undefined || this.altura2 == 0) ? 1 : this.altura2;

    let alturaPorcentaje1: number = this.distancia1 / this.altura1;
    let alturaPorcentaje2: number = this.distancia2 / this.altura2;

    if (alturaPorcentaje1 > 0.9999) alturaPorcentaje1 = 0.9999;
    if (alturaPorcentaje2 > 0.9999) alturaPorcentaje2 = 0.9999;

    alturaPorcentaje1 = 0.9999 - alturaPorcentaje1;
    alturaPorcentaje2 = 0.9999 - alturaPorcentaje2;

    let numberImage1: number = alturaPorcentaje1 * this.listImagesNivel.length;
    let numberImage2: number = alturaPorcentaje2 * this.listImagesNivel.length;

    this.pathImageNivel1 = this.listImagesNivel[parseInt(numberImage1)];
    this.pathImageNivel2 = this.listImagesNivel[parseInt(numberImage2)];
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
