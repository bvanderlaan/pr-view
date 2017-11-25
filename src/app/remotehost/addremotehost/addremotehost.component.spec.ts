import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AddRemoteHostComponent } from './addremotehost.component';

describe('AddRemoteHostComponent', () => {
  let component: AddRemoteHostComponent;
  let fixture: ComponentFixture<AddRemoteHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRemoteHostComponent ],
      imports: [ FormsModule, RouterTestingModule, ]
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
