import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule,
  ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatInputModule, MatCardModule, MatOptionModule, MatSelectModule,
  MatSnackBarRef, MatSnackBarModule, MatRippleModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { AuthComponent } from './vue/auth/auth.component';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from './services/auth.service';
import { NavApplicantComponent } from './vue/nav-applicant/nav-applicant.component';
import { NavRegulatorComponent } from './vue/nav-regulator/nav-regulator.component';
import { HeadNavComponent } from './vue/head-nav/head-nav.component';
import { MakeApplicationComponent } from './vue/make-application/make-application.component';
import { MyApplicationComponent } from './vue/my-application/my-application.component';
import { RegistrationRecordsComponent } from './vue/registration-records/registration-records.component';
import { ApplicantsComponent } from './vue/applicants/applicants.component';


// here we define the routes of the app
const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: '', component: AuthComponent},
  {path: 'navApplicant', component: NavApplicantComponent},
  {path: 'navRegulator', component: NavRegulatorComponent}

];


// And here we have all the importation we need
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavApplicantComponent,
    NavRegulatorComponent,
    HeadNavComponent,
    MakeApplicationComponent,
    MyApplicationComponent,
    RegistrationRecordsComponent,
    ApplicantsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    LayoutModule,
    MatRippleModule,
    MatOptionModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [RouterModule,
    MatInputModule,
    Validators,
    AuthService,
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}],
  bootstrap: [AppComponent]
})


export class AppModule {

}
