import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DatabaseProvider } from '../../providers/database/database';

import firebase from 'firebase';
import { CategoriesPage } from '../categories/categories';
/**
 * Generated class for the IdentityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-identity',
  templateUrl: 'identity.html',
})
export class IdentityPage {

  details;

  email;
  password;

  

  constructor(public navCtrl: NavController, public navParams: NavParams,public db:DatabaseProvider) {
   this.details= this.navParams.get("obj");
   console.log(this.details);
   
   this.email=this.details.email;
   this.password=this.details.password;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IdentityPage');
  }

  userRole(role)
  {
    var roles;

    console.log(role)

    if(role==1)
    {
  
      roles="user";
      console.log(roles);
    }
    else if(role==2)
    {
      roles="dj";
      console.log(roles);
    }

    console.log(this.email);
    console.log(this.password);
      
    this.db.registerUser(this.email,this.password).then(data =>{

      var userID = firebase.auth().currentUser.uid;

      console.log(userID);


      if(userID!=null)
      {

        firebase.database().ref('Registration/' +userID).set({

          name:this.details.name,
          surname:this.details.surname,
          location:this.details.location,
          phone:this.details.phone,
          email:this.details.email,
          role:roles
          
    
        });


        
      
        if(role==1)
        {
      
          roles="user";
          console.log(roles);

         
         this.navCtrl.setRoot(CategoriesPage);

        }
        else if(role==2)
        {
          roles="dj";
          console.log(roles);

     alert("Dj Profile")
       //this.navCtrl.setRoot(CategoriesPage,{obj: roles});

        }

      }


    });
    ;

    
  }

}
