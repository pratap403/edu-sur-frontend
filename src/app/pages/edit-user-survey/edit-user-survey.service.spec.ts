import { TestBed } from '@angular/core/testing';

import { EditUserSurveyService } from './edit-user-survey.service';

describe('EditUserSurveyService', () => {
  let service: EditUserSurveyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditUserSurveyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
