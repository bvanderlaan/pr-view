import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MomentModule } from 'ngx-moment';

import { Activity, Actor, Repository, PullRequest } from './activitycard.model';
import { ActivityCardComponent } from './activitycard.component';

describe('ActivityCardComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityCardComponent, TestHostComponent ],
      imports: [ RouterTestingModule, MomentModule ]
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

  it('should set the card title to the user and PR title', () => {
    const actor = new Actor(999, 'roger');
    const repo = new Repository();
    const pr = new PullRequest('117', 'This is a PR');

    component.activityCardComponent.activity = new Activity('12345', 'PullRequestReviewCommentEvent', actor, repo, pr, 'merged', new Date());
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.col-sm-10').innerText).toEqual('roger merged This is a PR');
  });
});

@Component({
  selector: `host-component`,
  template: `<activity-card></activity-card>`
})
class TestHostComponent {
  @ViewChild(ActivityCardComponent)
  public activityCardComponent: ActivityCardComponent;
}
