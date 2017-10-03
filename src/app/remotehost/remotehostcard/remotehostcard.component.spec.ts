import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteHostCardComponent } from './remotehostcard.component';

describe('RemoteHostCardComponent', () => {
  let component: RemoteHostCardComponent;
  let fixture: ComponentFixture<RemoteHostCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoteHostCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteHostCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
