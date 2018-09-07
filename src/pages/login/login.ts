import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email;
  password;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private db :DatabaseProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  login(form: NgForm){
    this.db.login(form.value.email, form.value.password).then((data)=>{
      const alert = this.alertCtrl.create({
        title: 'Success',
        subTitle: 'You have successfully logged in!!!',
        buttons: [
          {
            text: 'Ok',
            handler: ()=>{
              console.log(data);
            }
          }
        ]
      });
      alert.present();  
    }).catch((error)=>{
      const alert = this.alertCtrl.create({
        title: error.code,
        subTitle: error.message,
        buttons: [
          {
            text: 'Ok',
            handler: ()=>{
              console.log(error);
            }
          }
        ]
      });
      alert.present();
    });
  }

  // myMethod(){
  //   if(this.email == undefined, this.password == undefined){
  //     const prompt = this.alertCtrl.create({
  //       title: 'Please Check',
  //       message: 'Please Enter required imformation!',
  //       buttons: [
  //         {
  //           text: 'OK',
  //           handler: data => {
  //             console.log('ok');
  //           }

  //         }
  //       ]
  //     });
  //     prompt.present();
  //   }
  //   else if(this.email == undefined){
  //     const prompt = this.alertCtrl.create({
  //       title: 'Please Check',
  //       message: 'Plaese Enter Your Email!',
  //       buttons: [
  //         {
  //           text: 'OK',
  //           handler: data => {
  //             console.log('ok');
  //           }

  //         }
  //       ]
  //     });
  //     prompt.present();
  //   }
  //   else if(this.password == undefined){
  //     const prompt = this.alertCtrl.create({
  //       title: 'Please Check',
  //       message: 'Please Enter Your Password!',
  //       buttons: [
  //         {
  //           text: 'OK',
  //           handler: data => {
  //             console.log('ok');
  //           }

  //         }
  //       ]
  //     });
  //     prompt.present();
  //   }
  //   else{

  //     // this.navCtrl.push(CategoriesPage);
  //   }
  // }

}
