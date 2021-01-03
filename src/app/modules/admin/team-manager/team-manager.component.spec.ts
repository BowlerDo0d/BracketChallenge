import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TeamManagerComponent } from './team-manager.component';

describe('TeamManagerComponent', () => {
  let component: TeamManagerComponent;
  let fixture: ComponentFixture<TeamManagerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
