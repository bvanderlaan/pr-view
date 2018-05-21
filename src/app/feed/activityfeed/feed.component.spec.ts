import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

import { MomentModule } from 'ngx-moment';

import { FeedComponent } from './feed.component';
import { ActivityCardComponent } from '../activitycard/activitycard.component';
import { Activity, PRActivity, Actor, Repository, PullRequest } from '../activitycard/activitycard.model';
import { RemoteHostListService } from '../../remotehost';

function createActivity(id:string, type:string, prNumber:string, action:string = 'merged') {
  const actor = new Actor(999, 'roger');
  const repo = new Repository();
  const pr = new PullRequest(prNumber, 'This is a PR');
  pr.owner = actor;
  return new Activity(id, type, actor, repo, pr, action, new Date());
}

describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, MomentModule ],
      declarations: [ FeedComponent, ActivityCardComponent ],
      providers: [RemoteHostListService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should remove the PR activity when close button clicked', () => {
    const activity = createActivity('12345', 'PullRequestReviewCommentEvent', '117', 'opened');
    const prActivity = new PRActivity(activity);
    component.activityFeed = [prActivity];
    spyOn(component, 'save').and.returnValue(null);
    fixture.detectChanges();

    expect(component.activityFeed.length).toEqual(1);
    expect(component.activityFeed[0].pr.id).toEqual('117');

    fixture.nativeElement.querySelector('.close').click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.activity-card')).toBeNull();
    expect(component.save).toHaveBeenCalled();
  });
});
