import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


declare var firebase;
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

 
  registerUser(username,email,password)
  {

        firebase.auth().createUserWithEmailAndPassword(email, password).then(()=>{
            
          var userID = firebase.auth().currentUser.uid;

          if(userID!=null)
          {
            firebase.database().ref('Registration/' +userID).set({
    
              username:username,
              email:email,
              password:password
        
            });
          }

        });
  }

}
