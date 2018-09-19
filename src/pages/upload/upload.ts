import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import firebase from 'firebase';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {
  artistName;
  albumName;
  trackName;
  arrProfile = new Array();

  name;
  surname;
  files: number;
  filename: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: DatabaseProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad TrackUploadPage");

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("User has sign in");
        let id = firebase.auth().currentUser.uid;

        console.log(id);

        firebase
          .database()
          .ref("Registration/" + id)
          .on("value", (data: any) => {
            let userDetails = data.val();

            console.log(userDetails);

            let userID = firebase.auth().currentUser.uid;

            console.log(userID);

            if (userDetails != null && userDetails != "") {
              let obj = {
                id: userID,
                artistName: userDetails.name,
                surname: userDetails.surname,
                email: userDetails.email
              };

              this.arrProfile.push(obj);

              this.artistName = obj.artistName;
              this.surname = obj.surname;

              console.log(this.artistName);
              console.log(obj);
            } else if (userDetails === null && userDetails === "") {
              console.log("User doesnt exist");
            }
          });

        this.arrProfile = [];
      } else {
        console.log("User has not sign in");
      }
    });
  }

  url = "http://www.dealnetcapital.com/files/2014/10/blank-profile.png";

  upload(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      console.log(event.target.files);
      let selectedfile = event.target.files[0];
      this.files = event.target.files.length;
      console.log(event.target.files.length);
      this.filename = selectedfile.name;
      let storageRef = firebase.storage().ref("tracks/" + this.filename);

      let metadata = { contentType: "audio/mp3", size: 0.75 };
      let uploadTask = storageRef.put(selectedfile, metadata);

      uploadTask.on(
        "state_changed",
        function(snapshot) {},
        function(error) {
          // Handle unsuccessful uploads
          console.log("error !!1");
        },
        function() {
          // Handle successful uploads on complete
          console.log("successful !!1");
          const toast = this.toastCtrl.create({
            message: "Track uploaded successfully",
            duration: 5000
          });
          toast.present();

          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log("File available at", downloadURL);

            firebase.auth().onAuthStateChanged(user => {
              if (user) {
                console.log("User has sign in");
                let userID = firebase.auth().currentUser.uid;

                firebase
                  .database()
                  .ref("artists/" + userID)
                  .push({
                    url: downloadURL
                  });

                console.log(userID);
              } else {
                console.log("User has not sign in");
              }
            });
          });
        }
      );
    }
  }

  saveArtist(event: any) {
    console.log(this.artistName);

    let obj = {
      artistName: this.artistName,
      trackName: this.trackName
    };

    let userId = firebase.auth().currentUser.uid;
    this.db.saveArtists(userId, obj).then(() => {
      this.navCtrl.setRoot('ProfilePage');
    });
  }

  trackUpload(form: NgForm){
    console.log();
    let reader = new FileReader();
    reader.onload = (data) => {

    };

  }
}
