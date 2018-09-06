import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database'
import firebase from 'firebase';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private database: DatabaseProvider) {

  }

  loginMethod() {
    this.database.getLoginDetails(this.email, this.password).then((data) => {
      var userid = firebase.auth().currentUser.uid
      console.log(userid);
      
    }, (error) => {
      var errorCode = error.code;
      var errorEmail = error.message;
      // console.log(errorEmail);

      const prompt = this.alertCtrl.create({
        title: 'Caution !',
        message: errorEmail,
        buttons: [
          {
            text: 'OK',
            handler: data => {
              this.email="";
              this.password="";
            }

          }
        ]
      });
      prompt.present();



    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }



  /* 
    myMethod(){
      if(this.email == undefined, this.password == undefined){
        const prompt = this.alertCtrl.create({
          title: 'Please Check',
          message: 'Please Enter required imformation!',
          buttons: [
            {
              text: 'OK',
              handler: data => {
                console.log('ok');
              }
  
            }
          ]
        });
        prompt.present();
      }
      else if(this.email == undefined){
        const prompt = this.alertCtrl.create({
          title: 'Please Check',
          message: 'Plaese Enter Your Email!',
          buttons: [
            {
              text: 'OK',
              handler: data => {
                console.log('ok');
              }
  
            }
          ]
        });
        prompt.present();
      }
      else if(this.password == undefined){
        const prompt = this.alertCtrl.create({
          title: 'Please Check',
          message: 'Please Enter Your Password!',
          buttons: [
            {
              text: 'OK',
              handler: data => {
                console.log('ok');
              }
  
            }
          ]
        });
        prompt.present();
      }
      else{
  
        // this.navCtrl.push(CategoriesPage);
      } */
  ///}

}
