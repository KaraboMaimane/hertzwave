import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';
import { CategoriesPage } from '../categories/categories';
import { DatabaseProvider } from '../../providers/database/database';
import firebase
  from 'firebase';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  file: any;
  song = [];
  constructor(public navCtrl: NavController, public db: DatabaseProvider) {
  }

  ngOnInit() {
    this.db.retrieveSong('1536752771503DJ_Maphorisa_DJ_Shimza_-_Makhe_ft_MoonChild.mp3').then((data) => {
      this.song.push(data);
      console.log(this.file);
    });
  }

  Register() {
    this.navCtrl.push(RegisterPage);
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

  nextPage() {
    this.navCtrl.push(CategoriesPage);
  }


  upload(event) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.db.uploadTrack(file, file);
      }
    };
  }


}
