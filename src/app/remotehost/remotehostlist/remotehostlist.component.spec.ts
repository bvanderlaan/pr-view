import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';

import { RemoteHostListComponent } from './remotehostlist.component';
import { RemoteHostCardComponent } from '../remotehostcard/remotehostcard.component';
import { RemoteHostListService } from './remotehostlist.service';

describe('RemoteHostListComponent', () => {
  let component: RemoteHostListComponent;
  let fixture: ComponentFixture<RemoteHostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ RemoteHostListComponent, RemoteHostCardComponent ],
      providers: [ RemoteHostListService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteHostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
