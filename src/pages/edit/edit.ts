import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  arrProfile= new Array()

  name;
  surname;
  email;
  pic;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
   

    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        console.log('User has sign in');
        var id =firebase.auth().currentUser.uid;

     

      firebase.database().ref('Pic/' + id).on('value', (data) => {
        var infor = data.val();
        this.pic = infor.url;
        console.log(this.pic);

      }, (error) => {

        console.log(error.message);


      });


        console.log(id);
 
        firebase.database().ref('Registration/' +id).on('value', (data: any) => {
 
          var userDetails = data.val();
     
          console.log(userDetails);
    
          var userID =firebase.auth().currentUser.uid;
    
          console.log(userID);
 
          if(userDetails!=null && userDetails!='')
          {
            let obj = {
              id:userID,
              name: userDetails.name,
              surname:userDetails.surname,
              email:userDetails.email
            
           
            }
           
            this.arrProfile.push(obj);

            this.name=obj.name;
            this.surname=obj.surname;
            this.email=obj.email;

            console.log(this.name);
           console.log(obj);
          }
          else if(userDetails===null && userDetails===''){
            console.log('User doesnt exist')
          }
         
     
        })
       
        this.arrProfile=[];
 
      }
      else{
        console.log('User has not sign in');
 
   
        
      }
    });
  }

  url ='http://www.dealnetcapital.com/files/2014/10/blank-profile.png';

  insertImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      console.log(event.target.files);
      var selectedfile = event.target.files[0];
      var filename = selectedfile.name;
      var storageRef = firebase.storage().ref('profilepic/' + filename);
 
      var metadata = { contentType: 'image/jpeg', size: 0.75 }
      var uploadTask = storageRef.put(selectedfile, metadata);
 
     uploadTask.on('state_changed', function (snapshot) {
 
      }, function (error) {
        // Handle unsuccessful uploads
        alert("error !!1");
      }, function () {
        // Handle successful uploads on complete
        alert("successful !!1");
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log('File available at', downloadURL);
 
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              console.log('User has sign in');
              var userID = firebase.auth().currentUser.uid;
              let obj = {
                url: downloadURL
              }
 
              firebase.database().ref('Pic/' + userID).set({
                url: downloadURL
              });
 
              console.log(userID);
 
            }
            else {
              console.log('User has not sign in');
            }
          });
 
        });
      });
 
      //});
    }
  }



 submit()
 {
    console.log(this.name+" "+this.surname+" "+this.email);

    let obj = {
     
      name: this.name,
      surname: this.surname,
      email: this.email
        }
        
       this.arrProfile.push(obj);

       var userID =firebase.auth().currentUser.uid;

      firebase.database().ref('Registration/'+userID).update(obj);
      
      var user = firebase.auth().currentUser;
      user.updateEmail(obj.email).then(()=> {
        // Update successful.
        console.log()
      }).catch(function(error) {
        // An error happened.
        console.log(error)
      });
          
        

 }
}
