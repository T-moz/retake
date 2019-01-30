import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-nav-regulator',
  templateUrl: './nav-regulator.component.html',
  styleUrls: ['./nav-regulator.component.scss']
})
export class NavRegulatorComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  showMakeApp = true;
  showMyApp = false;
  showHelp = false;
  constructor(private breakpointObserver: BreakpointObserver,
              public authService: AuthService) {}


  ngOnInit() {
    this.authService.getCurentUser();
  }
  logout() {
    this.authService.signOutUser();
  }

  // the navigation inside mat-nav with *ngif
  showMake() {
    this.showMakeApp = true;
    this.showHelp = false;
    this.showMyApp = false;
  }
  showMy() {
    this.showMakeApp = false;
    this.showHelp = false;
    this.showMyApp = true;
  }
  showhe() {
    this.showMakeApp = false;
    this.showHelp = true;
    this.showMyApp = false;
  }
}