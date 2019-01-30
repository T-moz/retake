import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {User} from "../models/User.model";

/*
*   we Use this service to log a User and to get his informations
*/


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  curentUser: User = {};
  constructor() { }

  // we use firebase to create a user
  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
            console.log(error === 'The email address is already in use by another account.');
          }
        );
      }
    );
  }

  // the signIn function
  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
            console.log('we just signIn');
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }


  signOutUser() {
    firebase.auth().signOut();
  }

  // this fonction is use to get the information of the curent user, we store them in curentUser
  getCurentUser() {
    const userid = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + userid).once('value').then(
      (data) => {
        this.curentUser = data.val();
      }
    );
  }

}
