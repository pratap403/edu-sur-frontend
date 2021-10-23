import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserSurveyComponent } from './edit-user-survey.component';

describe('EditUserSurveyComponent', () => {
  let component: EditUserSurveyComponent;
  let fixture: ComponentFixture<EditUserSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
