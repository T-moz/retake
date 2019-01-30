import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeApplicationComponent } from './make-application.component';

describe('MakeApplicationComponent', () => {
  let component: MakeApplicationComponent;
  let fixture: ComponentFixture<MakeApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
