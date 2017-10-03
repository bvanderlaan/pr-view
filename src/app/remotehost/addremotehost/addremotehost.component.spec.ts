import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRemoteHostComponent } from './addremotehost.component';

describe('AddRemoteHostComponent', () => {
  let component: AddRemoteHostComponent;
  let fixture: ComponentFixture<AddRemoteHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRemoteHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRemoteHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
