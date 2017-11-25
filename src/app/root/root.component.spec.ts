import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LayoutModule } from '../layout';
import { RootComponent } from './root.component';

describe('RootComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootComponent ],
      imports: [ RouterTestingModule, LayoutModule ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(RootComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});