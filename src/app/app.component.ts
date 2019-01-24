import { Component } from '@angular/core';
import * as firebase from 'firebase';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {

  constructor(
     private router: Router
  ) {
    // this is where we configure the application with firebase
    const config = {
      apiKey: "AIzaSyBhokNArhxCKl-UWjcFMowuJjaGk_g3XqQ",
      authDomain: "product-regisatration-system.firebaseapp.com",
      databaseURL: "https://product-regisatration-system.firebaseio.com",
      projectId: "product-regisatration-system",
      storageBucket: "",
      messagingSenderId: "781132851676"
    };
    firebase.initializeApp(config);
    // we do the navigation with the autentification state
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          const userid = firebase.auth().currentUser.uid;
          firebase.database().ref('users/' + userid + '/type').once('value').then( (data) => {
            if (data) {
              const usertype = data.val();
              console.log(data.val());
              if (usertype === 'a') {
                // when the user is an Applicant
                this.router.navigate(['navApplicant']);
              } if (usertype === 'r') {
                // when the user is a Regulator
                this.router.navigate(['navRegulator']);
              }
            }
           });
        } else {
          // when no user is connected
          console.log('user is not conected');
          this.router.navigate(['auth']);
        }
      }
    );

  }
  title = 'app';
}
