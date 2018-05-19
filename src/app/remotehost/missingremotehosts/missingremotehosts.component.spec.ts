import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { MissingRemoteHostsComponent } from './missingremotehosts.component';
import { RemoteHost, RemoteHostListService } from '../../remotehost';

describe('MissingRemoteHostsComponent', () => {
  let component: MissingRemoteHostsComponent;
  let fixture: ComponentFixture<MissingRemoteHostsComponent>;
  let remoteHostListService: RemoteHostListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ MissingRemoteHostsComponent ],
      providers: [ RemoteHostListService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingRemoteHostsComponent);
    component = fixture.componentInstance;

    // Docs say that TestBed.get(RemoteHostListService) should work but it was
    // not giving me the same object, when I tried to stub it (spyOn) it was always
    // calling into the original method. Using fixture.debugElement.injector.get()
    // is the only thing I could find which would do the trick. Odd as TestBed.get() works
    // in my service tests.
    remoteHostListService = fixture.debugElement.injector.get(RemoteHostListService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return false if no remote hosts', () => {
    spyOn(remoteHostListService, 'get').and.returnValue([]);

    fixture.detectChanges();
    expect(component.hasRemoteHosts).toBeFalsy();
  });

  it('should return true if remote hosts exist', () => {
    const remoteHost = new RemoteHost('123', 'me', 'url', 'uname', 'token', new Date(), new Date());
    spyOn(remoteHostListService, 'get').and.returnValue([remoteHost]);

    fixture.detectChanges();
    expect(component.hasRemoteHosts).toBeTruthy();
  });

  it('should render component if hosts do not exist', () => {
    spyOn(remoteHostListService, 'get').and.returnValue([]);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    expect(component.hasRemoteHosts).toBeFalsy();
    expect(compiled.querySelector('section')).toBeDefined;
    expect(compiled.querySelector('button')).toBeDefined;
    expect(compiled.querySelector('button').innerText).toEqual('Add a Remote Host');
  });

  it('should not render component if hosts exist', () => {
    const remoteHost = new RemoteHost('123', 'me', 'url', 'uname', 'token', new Date(), new Date());
    spyOn(remoteHostListService, 'get').and.returnValue([remoteHost]);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    expect(component.hasRemoteHosts).toBeTruthy();
    expect(compiled.querySelector('section')).toBeNull;
  });
});
