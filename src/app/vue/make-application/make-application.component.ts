import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

import * as firebase from 'firebase';

@Component({
  selector: 'app-make-application',
  templateUrl: './make-application.component.html',
  styleUrls: ['./make-application.component.scss']
})
export class MakeApplicationComponent implements OnInit {

  /*
  *
  * First we can find all the form controls use to register a new product
  * */
  // contry selector
  contryControl = new FormControl('', [Validators.required]);
  contrys = [
    {name: 'France', sound: 'Bonjour!'},
    {name: 'Germany', sound: 'Hallo!'},
    {name: 'Spain', sound: 'Hola!'},
    {name: 'Italia', sound: 'Buongiorno!'},
  ];

  // type selector
  typeControl = new FormControl('', [Validators.required]);
  types = [
    {name: 'Televsion'},
    {name: 'Laptop'},
    {name: 'Phone'},
    {name: 'Watch'},
    {name: 'Desktop'}
  ];

  // test selector
  testControl = new FormControl('', [Validators.required]);
  tests = [
    {name: 'TCVN 8525:2010 V1.0'}
  ];
  loader = false;
  nameOfProduct = '';
  constructor(public snackBar: MatSnackBar) { }

  // This function store the new product in the database
  submitApplication(name: string, contry: string) {
    if (this.testControl.value && this.contryControl.value && this.typeControl.value) {
      this.loader = true;
      // we create the product to store
      const application = {
        contry_of_production: this.contryControl.value.name,
        type: this.typeControl.value.name,
        test_standard: this.testControl.value.name,
        applicantid: firebase.auth().currentUser.uid,
        date: Date.now(),
        name: ''
      };
      if (name) {
        application.name = name;
      }
      // we store it in the database.
      // The methode push create a unique ID
      firebase.database().ref('products/').push(application).then((data) => {
        if (data) {
          console.log(data.key);
          this.loader = false;
          // We print a Toast Notification
          let snackBarRef = this.snackBar.open('The product is now register', '', {
            duration: 2000,
          });
          this.testControl.reset();
          this.contryControl.reset();
          this.typeControl.reset();
          this.nameOfProduct = ''; // there is an error but it work as it sould
        } else {
          console.log('the product is not register, please try again');
          let snackBarRef = this.snackBar.open('There has been an error','',{
            duration: 3000,
          });
          this.loader = false;
        }
      });
    } else {
      console.log('You have to submit all information');
    }
  }
  ngOnInit() {
  }


}
