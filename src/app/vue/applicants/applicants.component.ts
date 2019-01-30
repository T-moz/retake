import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.scss']
})
export class ApplicantsComponent implements OnInit {

  applicants = []; // we store the applicants
  theApplicant = {}; // use to show all the information of one applicant
  showOne = false; // use to print or not all the information of one applicant with *ngIf
  constructor() { }

  ngOnInit() {
    this.getApplicants();
  }
  // we are looking for the applicants
  getApplicants() {
    firebase.database().ref('users/')
      .orderByChild('type')
      .equalTo('a')
      .once('value')
      .then(
        (data) => {
          if (data) {
            const users = data.val();
            for (const aUser in users) {
              if (aUser) {
                this.applicants.push(users[aUser]);
              }
            }
          }
        }
      );
  }
  getOneApplicant(applicant) {
    this.theApplicant = applicant;
      this.showOne = true;
  }
  // Use to print or not an Applicant informations
  closeApplicant() {
    this.theApplicant = {};
    this.showOne = false;
  }
}
