import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { NgForm } from '@angular/forms';

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
  register(form: NgForm){
    console.log(form.value);

    this.name=form.value.name;
    this.surname=form.value.surname;
    this.location=form.value.location;
    this.password=form.value.password;
    this.email=form.value.email;
    this.phone=form.value.phone;

    
    this.db.registerUser(this.name,this.surname,this.email,this.password,this.location,this.phone);
    
  }
}
