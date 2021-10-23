import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSurveyTableComponent } from './user-survey-table.component';

describe('UserSurveyTableComponent', () => {
  let component: UserSurveyTableComponent;
  let fixture: ComponentFixture<UserSurveyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSurveyTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSurveyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
