import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserSurveyListComponent } from './admin-user-survey-list.component';

describe('AdminUserSurveyListComponent', () => {
  let component: AdminUserSurveyListComponent;
  let fixture: ComponentFixture<AdminUserSurveyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserSurveyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserSurveyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
