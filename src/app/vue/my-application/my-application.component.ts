import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/Product.model";
import * as firebase from 'firebase';

@Component({
  selector: 'app-my-application',
  templateUrl: './my-application.component.html',
  styleUrls: ['./my-application.component.scss']
})
export class MyApplicationComponent implements OnInit {

  MyProduct = [];
  curentUser = firebase.auth().currentUser;
  constructor() { }

  ngOnInit() {
    this.getMyProduct();
  }
  // just a siple request with firebase to get all the Product register by the user
  getMyProduct() {
    firebase.database().ref('products/')
      .orderByChild('applicantid')
      .equalTo(this.curentUser.uid)
      .once('value').then(
      (data) => {
        if (data) {
          const products = data.val();
          for (const aproduct  in products) {
            if (aproduct) {
              products[aproduct].productid = aproduct;
              this.MyProduct.push(products[aproduct]);
            }
          }
        }
      }
    );
  }

}
