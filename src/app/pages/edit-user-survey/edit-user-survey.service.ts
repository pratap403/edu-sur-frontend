import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EditUserSurveyService {
  BASE_URL = environment.apiBaseUrl;

  constructor(public http: HttpClient) { }

  // USER EDIT SURVEY FORM DETAILS
  editSurveyFormDetails(data: any): Observable<any> {
    try {
      const apiUrl = `${this.BASE_URL}/user/get-survey-form-details`;
      return this.http.post(apiUrl, data, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${localStorage.getItem('token')}`),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // USER EDIT SURVEY FORM ANSWERS DETAILS
  editSurveyFormAnswers(data: any): Observable<any> {
    try {
      const apiUrl = `${this.BASE_URL}/user/submit-survey-details`;
      return this.http.post(apiUrl, data, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${localStorage.getItem('token')}`),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

}
