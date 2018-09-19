
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import firebase from "firebase";
import { DatabaseProvider } from "../../providers/database/database";

@IonicPage()
@Component({
  selector: "page-edit",
  templateUrl: "edit.html"
})
export class EditPage {
  arrProfile = new Array();

  name;
  surname;
  email;
  pic;

  profileObj = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: DatabaseProvider
  ) {}

  ionViewDidLoad() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("User has sign in");
        let id = firebase.auth().currentUser.uid;

        firebase
          .database()
          .ref("Pic/" + id)
          .on(
            "value",
            data => {
              let infor = data.val();
              this.pic = infor.url;
              console.log(this.pic);
            },
            error => {
              console.log(error.message);
            }
          );

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
                name: userDetails.name,
                surname: userDetails.surname,
                email: userDetails.email
              };

              this.arrProfile.push(obj);

              this.name = obj.name;
              this.surname = obj.surname;
              this.email = obj.email;

              console.log(this.name);
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

  insertImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      console.log(event.target.files);
      let selectedfile = event.target.files[0];
      let filename = selectedfile.name;
      let storageRef = firebase.storage().ref("profilepic/" + filename);

      let metadata = { contentType: "image/jpeg", size: 0.75 };
      let uploadTask = storageRef.put(selectedfile, metadata);

      this.profileObj = {
        filename: filename,
        metadata: metadata
      }
      uploadTask.on(
        "state_changed",
        function(snapshot) {},
        function(error) {
          // Handle unsuccessful uploads
          alert("error !!1");
        },
        function() {
          // Handle successful uploads on complete
          alert("successful !!1");
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log("File available at", downloadURL);

            firebase.auth().onAuthStateChanged(user => {
              if (user) {
                console.log("User has sign in");
                let userID = firebase.auth().currentUser.uid;
                let obj = {
                  url: downloadURL
                };

                firebase
                  .database()
                  .ref("Pic/" + userID)
                  .set({
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

      //});
    }
  }

  submit() {
    console.log(this.name + " " + this.surname + " " + this.email);

    let obj = {
      name: this.name,
      surname: this.surname,
      email: this.email
    };

    this.arrProfile.push(obj);

    let userID = firebase.auth().currentUser.uid;

    this.db.update(userID, obj);

    //firebase.database().ref('Registration/'+userID).update(obj);

    let user = firebase.auth().currentUser;
    user
      .updateEmail(obj.email)
      .then(() => {
        // Update successful.
        console.log();
      })
      .catch(function(error) {
        // An error happened.
        console.log(error);
      });
  }
}
