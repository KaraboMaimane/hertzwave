import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { NgForm } from '@angular/forms';
import firebase from 'firebase';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  name;
  surname;
  location;
  password;
  email;
  phone;

  constructor(public navCtrl: NavController, public navParams: NavParams,public db:DatabaseProvider) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  //method for registering a user
  register(form: NgForm){
    console.log(form.value);

    this.name=form.value.name;
    this.surname=form.value.surname;
    this.location=form.value.location;
    this.password=form.value.password;
    this.email=form.value.email;
    this.phone=form.value.phone;

    
    this.db.registerUser(this.email,this.password).then(data =>{

      var userID = firebase.auth().currentUser.uid;

      if(userID!=null)
      {
        firebase.database().ref('Registration/' +userID).set({

          name:this.name,
          surname:this.surname,
          location:this.location,
          phone:this.phone,
          email:this.email,
          password:this.password
    
        });

        
      }


    });
    ;
    
  }
}
