import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import * as firebase from 'firebase';
import {MatSnackBar} from '@angular/material';
import {Product} from "../../models/Product.model";
import {User} from "../../models/User.model";

@Component({
  selector: 'app-registration-records',
  templateUrl: './registration-records.component.html',
  styleUrls: ['./registration-records.component.scss']
})
export class RegistrationRecordsComponent implements OnInit {

  // First the logic behind the selectors
  // slect what type of reshearch you want
  selectControl = new FormControl('', [Validators.required]);
  selects = [
    {name: 'Contry'},
    {name: 'Type'},
    {name: 'Test'}
  ];

  // contry selector
  contryControl = new FormControl('', [Validators.required]);
  contrys = [
    {name: 'France', sound: 'Woof!'},
    {name: 'Germany', sound: 'Meow!'},
    {name: 'Spain', sound: 'Moo!'},
    {name: 'Italia', sound: 'Wa-pa-pa-pa-pa-pa-pow!'},
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

  MyProduct = []; // here we store the result of a request
  showRecords = true; // use to show or not A product
  theApplicant: User = {};
  theProduct: Product = {};
  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  // the request for the products with firebase
  searchProduct() {
    this.MyProduct = [];
    let firstSelect = '';
    let select = '';
    if (this.selectControl.value.name === 'Contry') {
      select = this.contryControl.value.name;
      firstSelect = 'contry_of_production';
    }
    if (this.selectControl.value.name === 'Type') {
      select = this.typeControl.value.name;
      firstSelect = 'type';
    }
    if (this.selectControl.value.name === 'test') {
      select = this.testControl.value.name;
      firstSelect = 'test_standard';
    }
    firebase.database().ref('products/')
      .orderByChild(firstSelect)
      .equalTo(select)
      .once('value')
      .then(
        (data) => {
          if (data) {
            const products = data.val();
            for (const aproduct  in products) {
              if (aproduct) {
                products[aproduct].productid = aproduct;
                console.log(aproduct);
                this.MyProduct.push(products[aproduct]);
              }
            }
          }
        }
      );
  }

  // the function to get the applicant who made register the product
  getApplicant(oneProduct) {
    const userid = oneProduct.applicantid;
    this.showRecords = false;
    this.theProduct = oneProduct;
    firebase.database().ref('users/' + userid).once('value').then(
      (data) => {
        if (data) {
          this.theApplicant = data.val();
        }
      }
    );
  }

  closeProduct() {
    this.theProduct = {};
    this.theApplicant = {};
    this.showRecords = true;
  }

  deleteProduct() {
    // on suprime le produit de la bdd
    firebase.database().ref('products/' + this.theProduct.productid).set(null).then(
      () => {
        this.snackBar.open('The product has been deleted', '', {duration: 3000});
      }
    );
    // we delete the product in the front end
    for (const aprod in this.MyProduct) {
      if (aprod) {
        if (this.MyProduct[aprod].productid && this.theProduct.productid) {
          if (this.MyProduct[aprod].productid === this.theProduct.productid) {
            const k =  Number(aprod);
            this.MyProduct.splice(k, 1);
          }
        }
      }
    }
    this.closeProduct();
  }
}
