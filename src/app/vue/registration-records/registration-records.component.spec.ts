import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationRecordsComponent } from './registration-records.component';

describe('RegistrationRecordsComponent', () => {
  let component: RegistrationRecordsComponent;
  let fixture: ComponentFixture<RegistrationRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
