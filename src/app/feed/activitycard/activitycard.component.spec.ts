import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MomentModule } from 'ngx-moment';

import { Activity, PRActivity, Actor, Repository, PullRequest } from './activitycard.model';
import { ActivityCardComponent } from './activitycard.component';

function createActivity(id:string, type:string, action:string = 'merged') {
  const actor = new Actor(999, 'roger');
  const repo = new Repository();
  const pr = new PullRequest('117', 'This is a PR');
  return new Activity(id, type, actor, repo, pr, action, new Date());
}

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

  it('should set the card title to the PR title', () => {
    const activity = createActivity('12345', 'PullRequestReviewCommentEvent');

    component.activityCardComponent.activity = new PRActivity(activity);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.activity-card-title').innerText).toEqual('This is a PR');
  });

  it('should set the card body to the activities', () => {
    const activity = createActivity('12345', 'PullRequestReviewCommentEvent');

    component.activityCardComponent.activity = new PRActivity(activity);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.activity-card-body').innerText).toEqual('roger merged\n');
  });

  it('should set the card badge to the number of activities', () => {
    const activity = createActivity('12345', 'PullRequestReviewCommentEvent');
    const activity2 = createActivity('98765', 'IssueCommentEvent');
    const prActivity = new PRActivity(activity);
    prActivity.addActivity(activity2);
    component.activityCardComponent.activity = prActivity;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.badge').innerText).toEqual('2');
  });

  it('should set the card body to all activities', () => {
    const activity = createActivity('12345', 'PullRequestReviewCommentEvent', 'opened');
    const activity2 = createActivity('98765', 'IssueCommentEvent', 'commented');
    const prActivity = new PRActivity(activity);
    prActivity.addActivity(activity2);
    component.activityCardComponent.activity = prActivity;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.activity-card-body').innerText).toEqual('roger opened\nroger commented\n');
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
