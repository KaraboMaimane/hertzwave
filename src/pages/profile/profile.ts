import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import firebase from 'firebase';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  name;
  email;
  surname;
  pic;
  track;

  trackarray =[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController) {
  }

//   ionViewDidLoad() {
//     console.log('ionViewDidLoad ProfilePage');

//     firebase.auth().onAuthStateChanged((user)=> {
//       if (user) {
//         console.log('User has sign in');
//         var id =firebase.auth().currentUser.uid;
//         console.log(id);
 
//         firebase.database().ref('Registration/' +id).on('value', (data: any) => {
 
//           var userDetails = data.val();
     
//           console.log(userDetails);
    
//           var userID =firebase.auth().currentUser.uid;
    
//           console.log(userID);
 
//           if(userDetails!=null && userDetails!='')
//           {
//             firebase.database().ref('Pic/' + userID).on('value', (data) => {
//               var infor = data.val();
//               this.pic = infor.url;
//               console.log("pciture"+infor);
      
//             }, (error) => {
      
//               console.log(error.message);
      
      
//             });
      
// ///track
//             firebase.database().ref('track/' + userID).on('value', (data) => {
//               var infor = data.val();
           

//               console.log(infor);
//               var tracks = infor.url;

//               var keys: any = Object.keys(infor);

//               console.log(infor);
             

//               for (var i = 0; i < keys.length; i++) {
//                 var k = keys[i];
         

//               let objtrack = {
//                    url: infor[k].url,
              
//                  key: k 
                 
//               }
         
//              // console.log(infor[k].url);
   
//              console.log("track " + i );

//                 this.trackarray.push(objtrack);
//                 console.log(this.trackarray);
     

//               }
              
              
//               console.log("track" );
        
      
//             }, (error) => {
      
//               console.log(error.message);
      
      
//             });


// /////
//             let obj = {
//               id:userID,
//               name: userDetails.name,
//               email:userDetails.email,
//               surname:userDetails.surname
            
           
//             }

//             this.name=obj.name;

           
//            console.log(obj);
//           }
         
     
//         })
       
 
 
//       }
//       else{
//         console.log('User has not sign in');
 
//         // let alert = this.alertCtrl.create({
//         //   title: 'User',
//         //   message: 'Sign in to view your profile ',
//         //   buttons: [
//         //     {
//         //       text: 'Cancel',
//         //       role: 'cancel',
//         //       handler: () => {
//         //         console.log('Cancel clicked');
//         //         this.navCtrl.setRoot(ViewPage);
//         //       }
//         //     },
//         //     {
//         //       text: 'Ok',
//         //       handler: () => {
//         //         console.log('Ok clicked');
//         //         this.navCtrl.setRoot(SigninPage);
 
//         //       }
//         //     }
//         //   ]
//         // });
//         // alert.present();
        
//       }
//     });
//   }


  edit()
  {

    const actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Edit Profile',
          role: 'Edit Profile',
          handler: () => {
            console.log('Edit Profile clicked');

            this.navCtrl.push('EditPage');
          }
        },{
          text: 'Upload Track',
          handler: () => {
            console.log('Upload Track clicked');
            this.navCtrl.push('UploadPage');
          }
        },{
          
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
