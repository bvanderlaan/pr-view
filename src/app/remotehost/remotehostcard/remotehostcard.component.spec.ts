import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RemoteHost } from './remotehostcard.model';

import { RemoteHostCardComponent } from './remotehostcard.component';

describe('RemoteHostCardComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoteHostCardComponent, TestHostComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the user name in the link', () => {
    component.remoteHostCardComponent.remote = new RemoteHost('hello', 'world', 'url', 'uname', 'token', new Date(), new Date());
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('a').innerText).toEqual('world');
  });
});

@Component({
  selector: `host-component`,
  template: `<remote-host-card></remote-host-card>`
})
class TestHostComponent {
  @ViewChild(RemoteHostCardComponent)
  public remoteHostCardComponent: RemoteHostCardComponent;
}
