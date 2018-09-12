import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { DatabaseProvider } from '../../providers/database/database';
import firebase from 'firebase';
import { LoadingController } from 'ionic-angular';
import { CategoriesPage } from '../categories/categories';
import { IdentityPage } from '../identity/identity';
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

 constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private db :DatabaseProvider,public loadingCtrl: LoadingController) {

 }

 ionViewDidLoad() {
   console.log('ionViewDidLoad LoginPage');


 }


 login(form: NgForm){
   this.db.login(form.value.email, form.value.password).then((data)=>{

     var userID = firebase.auth().currentUser.uid;


     const alert = this.alertCtrl.create({
       title: 'Success',
       subTitle: 'You have successfully logged in!!!',
       buttons: [
         {
           text: 'Ok',
           handler: ()=>{
             console.log(data);
             this.navCtrl.push(IdentityPage);
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

 resetPassword(){
   const prompt = this.alertCtrl.create({
     title: 'Auth',
     message: "Enter your email to reset your password",
     inputs: [
       {
         name:'email',
         placeholder: 'Example@gmail.com'
       },
     ],
     buttons: [
       {
         text: 'Cancel',
         handler: data => {
           console.log('Cancel clicked');
            this.navCtrl.setRoot(LoginPage);
           
         }
       },
       {
         text: 'Save',
         handler: data => {

           this.db.resetPassword(data.email).then(()=>{


        const alert = this.alertCtrl.create({
        title: 'Caution',
        message: 'your request is been proccessed check your email ',
        buttons: ['OK']
        });
        alert.present();
           },(error)=>{
             const alert = this.alertCtrl.create({
               title: 'Caution',
               message: error.message,
               buttons: ['OK']
             });
             alert.present();


           })
           console.log('Saved clicked');
         }
       }
     ]
   });
   prompt.present();
 }
 }