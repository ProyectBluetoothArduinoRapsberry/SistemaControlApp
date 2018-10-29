import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { FUNCTION_TYPE } from '@angular/compiler/src/output/output_ast';

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

  public optionsList: Array<string> = ["bomba", "valvula1", "valvula2", "valvula3", "RcvParametros", "manual", "servidor"];
  public nivelOptionsList: Array<string> = ["nivel1", "nivel2"];
  public numericOptionsList: string[] = new Array(); 

  public estadosdict: { [key: string]: number; } = {};

  public checkedDict: { [key: string]: boolean; } = {};
  public disableDict: { [key: string]: boolean; } = {};

  public numericOpDict: { [key: string]: number; } = {};
  public nivelDict: { [key: string]: string; } = {};

  public nivelViewList: string[] = new Array();    

  constructor(navCtrl: NavController, toastCtrl: ToastController) {
    this.webSocket = new WebSocket('ws://192.168.0.6:3000/rasp');
    this._toastCtrl = toastCtrl;

    for (let option in this.optionsList) {
      this.checkedDict[this.optionsList[option]] = false;
      this.disableDict[this.optionsList[option]] = true;
    }    
    
    for (let option in this.nivelOptionsList) this.numericOptionsList.push("altura" + this.getNumberLevel(this.nivelOptionsList[option]));          
    
    for (let option in this.nivelOptionsList) this.numericOptionsList.push("distancia" + this.getNumberLevel(this.nivelOptionsList[option]));            
        
    for (let option in this.numericOptionsList) this.numericOpDict[this.numericOptionsList[option]] = 0;    
    for (let option in this.nivelOptionsList)
    {
      this.nivelDict[this.nivelOptionsList[option]] = this.getTextNivel(this.nivelOptionsList[option]);      
      this.nivelViewList.push(this.listImagesNivel[0]);
    }    
    
    var increment: number = 0;
    var allOptions: string[] = this.getAllOptions();
    for (let option in allOptions) this.estadosdict[allOptions[option]] = increment++;

    this.changeImageTanque();

    var self = this;
    this.webSocket.onopen = function () {
      setTimeout(() => self.checkServer(), 5000);
      console.log('open');
      this.send('hello');         // transmit "hello" after connecting
    };    

  }

  getTextNivel(nivel: string): string {    
    return (this.numericOpDict["distancia" + this.getNumberLevel(nivel)] as any as string) + "/" + (this.numericOpDict["altura" + this.getNumberLevel(nivel)] as any as string); 
  }

  checkServer() {       
    if (this.webSocket == undefined || this.webSocket.readyState === this.webSocket.CLOSED) this.checkedDict["servidor"] = false;
    else this.checkedDict["servidor"] = true;
  }

  getNumberLevel(nivel:string): string{
    return nivel.replace("nivel", "");
  }

  getAllOptions(): Array<string> {
    return this.numericOptionsList.concat(this.optionsList)
  }

  changeImageTanque() {    
    var porcetajesList: number[] = new Array();
    
    for (let option in this.nivelOptionsList) {
      var numberOption: string = this.getNumberLevel(this.nivelOptionsList[option]);      
      this.numericOpDict["altura" + numberOption] = ( this.numericOpDict["altura" + numberOption] == undefined ||
        this.numericOpDict["altura" + numberOption] == 0) ? 1 : this.numericOpDict["altura" + numberOption];      
      
      porcetajesList.push(this.numericOpDict["distancia" + numberOption] / this.numericOpDict["altura" + numberOption]);
    }
    
    var temp: number;
    for (var i: number = 0; i < porcetajesList.length; i++) {      
      if (porcetajesList[i] > 0.9999) porcetajesList[i] = 0.9999;
      porcetajesList[i] = 0.9999 - porcetajesList[i];
      temp = Math.floor(porcetajesList[i] * this.listImagesNivel.length);
      this.nivelViewList[i] = this.listImagesNivel[temp];      
    }    
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
