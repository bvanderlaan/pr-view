import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteHostListComponent } from './remotehostlist.component';

describe('RemoteHostListComponent', () => {
  let component: RemoteHostListComponent;
  let fixture: ComponentFixture<RemoteHostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoteHostListComponent ]
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
