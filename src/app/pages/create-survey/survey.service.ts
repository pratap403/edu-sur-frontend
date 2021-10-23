import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  BASE_URL = environment.apiBaseUrl;

  constructor(public http: HttpClient) { }

  // CREATE SURVEY
  createSurvey(data: any): Observable<any> {
    try {
      const apiUrl = `${this.BASE_URL}/admin/create-survey`;
      return this.http.post(apiUrl, data, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${localStorage.getItem('token')}`),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

}
