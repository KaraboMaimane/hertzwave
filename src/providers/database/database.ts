import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class DatabaseProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DatabaseProvider Provider');
  }

 
  registerUser(name,surname,email,password,location,phone)
  {

        firebase.auth().createUserWithEmailAndPassword(email, password).then(()=>{
            
          var userID = firebase.auth().currentUser.uid;

          if(userID!=null)
          {
            firebase.database().ref('Registration/' +userID).set({
    
              name:name,
              surname:surname,
              location:location,
              phone:phone,
              email:email,
              password:password
        
            });
          }

        });
  }

}
