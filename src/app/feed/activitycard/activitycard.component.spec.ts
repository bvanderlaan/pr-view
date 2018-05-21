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
  pr.owner = actor;
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
    expect(fixture.nativeElement.querySelector('.activity-card-body').innerText).toContain('roger merged');
  });

  it('should set the card badge to new', () => {
    const activity = createActivity('12345', 'PullRequestReviewCommentEvent');
    const prActivity = new PRActivity(activity);
    activity.read = true;
    component.activityCardComponent.activity = prActivity;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.badge')).toBeNull();

    const activity2 = createActivity('98765', 'IssueCommentEvent');
    prActivity.addActivity(activity2);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.badge').innerText).toEqual('New');
  });

  it('should set the card body to all activities', () => {
    const activity = createActivity('12345', 'PullRequestReviewCommentEvent', 'opened');
    const activity2 = createActivity('98765', 'IssueCommentEvent', 'commented');
    const prActivity = new PRActivity(activity);
    prActivity.addActivity(activity2);
    component.activityCardComponent.activity = prActivity;
    fixture.detectChanges();

    const body = fixture.nativeElement.querySelector('.activity-card-body').innerText;
    expect(body).toContain('roger opened New');
    expect(body).toContain('roger commented New');
  });

  it('should be visible if not deleted', () => {
    const activity = createActivity('12345', 'PullRequestReviewCommentEvent', 'opened');
    const prActivity = new PRActivity(activity);
    component.activityCardComponent.activity = prActivity;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.activity-card')).not.toBeNull();
  });

  it('should be hidden if deleted', () => {
    const activity = createActivity('12345', 'PullRequestReviewCommentEvent', 'opened');
    const prActivity = new PRActivity(activity);
    prActivity.delete();
    component.activityCardComponent.activity = prActivity;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.activity-card')).toBeNull();
  });

  it('should hidden card when deleted', () => {
    const activity = createActivity('12345', 'PullRequestReviewCommentEvent', 'opened');
    const prActivity = new PRActivity(activity);
    component.activityCardComponent.activity = prActivity;
    expect(prActivity.isDeleted).toBeFalsy();
    fixture.detectChanges();

    fixture.nativeElement.querySelector('.close').click();
    fixture.detectChanges();

    expect(prActivity.isDeleted).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.activity-card')).toBeNull();
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
