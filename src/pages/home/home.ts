import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private _toastCtrl: ToastController;
  

  constructor(navCtrl: NavController, toastCtrl: ToastController) {
    var webSocket = new WebSocket('ws://192.168.0.6:3000/rasp');
    this._toastCtrl = toastCtrl;

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

  showToast(position: string) {
    let toast = this._toastCtrl.create({
      message: 'Mmmm, buttered toast',
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }

}
