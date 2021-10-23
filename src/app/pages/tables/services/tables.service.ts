import {Customer, Employee} from '../models';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  public loadEmployeeTableData(): any {
    return [
      {name: 'Joe James', company: 'Example Inc.', city: 'Yonkers', state: 'NY'},
      {name: 'John Walsh', company: 'Example Inc.', city: 'Hartford', state: 'CT'},
      {name: 'Bob Herm', company: 'Example Inc.', city: 'Tampa', state: 'FL'},
      {name: 'James Houston', company: 'Example Inc.', city: 'Dallas', state: 'TX'},
      {name: 'Prabhakar Linwood', company: 'Example Inc.', city: 'Hartford', state: 'CT'},
      {name: 'Kaui Ignace', company: 'Example Inc.', city: 'Yonkers', state: 'NY'},
      {name: 'Esperanza Susanne', company: 'Example Inc.', city: 'Hartford', state: 'CT'},
      {name: 'Christian Birgitte', company: 'Example Inc.', city: 'Tampa', state: 'FL'},
      {name: 'Meral Elias', company: 'Example Inc.', city: 'Hartford', state: 'CT'},
      {name: 'Deep Pau', company: 'Example Inc.', city: 'Yonkers', state: 'NY'},
      {name: 'Sebastiana Hani', company: 'Example Inc.', city: 'Dallas', state: 'TX'},
      {name: 'Marciano Oihana', company: 'Example Inc.', city: 'Yonkers', state: 'NY'},
      {name: 'Brigid Ankur', company: 'Example Inc.', city: 'Dallas', state: 'TX'},
      {name: 'Anna Siranush', company: 'Example Inc.', city: 'Yonkers', state: 'NY'},
      {name: 'Avram Sylva', company: 'Example Inc.', city: 'Hartford', state: 'CT'},
      {name: 'Serafima Babatunde', company: 'Example Inc.', city: 'Tampa', state: 'FL'},
      {name: 'Gaston Festus', company: 'Example Inc.', city: 'Tampa', state: 'FL'}
    ]
  }

  public loadMaterialTableData(): Observable<Customer[]> {
    return of([
      {
        name: 'Mark Otto',
        email: 'ottoto@wxample.com',
        product: 'ON the Road',
        price: '$25 224.2',
        date: '11 May 2017',
        city: 'Otsego',
        status: 'send'
      },
      {
        name: 'Jacob Thornton',
        email: 'thornton@wxample.com',
        product: 'HP Core i7',
        price: '$1 254.2',
        date: '4 Jun 2017',
        city: 'Fivepointville',
        status: 'send'
      },
      {
        name: 'Larry the Bird',
        email: 'bird@wxample.com',
        product: 'Air Pro',
        price: '$1 570.0',
        date: '27 Aug 2017',
        city: 'Leadville North',
        status: 'pending'
      },
      {
        name: 'Joseph May',
        email: 'josephmay@wxample.com',
        product: 'Version Control',
        price: '$5 224.5',
        date: '19 Feb 2018',
        city: 'Seaforth',
        status: 'declined'
      },
      {
        name: 'Peter Horadnia',
        email: 'horadnia@wxample.com',
        product: 'Let\'s Dance',
        price: '$43 594.7',
        date: '1 Mar 2018',
        city: 'Hanoverton',
        status: 'send'
      }
    ]);
  }

  BASE_URL = environment.apiBaseUrl;

  constructor(public http: HttpClient) { }

  getAdminSurveyList(): Observable<any> {
    try {
      const apiUrl = `${this.BASE_URL}/admin/get-survey-list`;
      return this.http.get(apiUrl, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${localStorage.getItem('token')}`),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  getUserList(): Observable<any> {
    try {
      const apiUrl = `${this.BASE_URL}/admin/get-user-list`;
      return this.http.get(apiUrl, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${localStorage.getItem('token')}`),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  getUserSurveyLogList(): Observable<any> {
    try {
      const apiUrl = `${this.BASE_URL}/admin/get-user-survey-list`;
      return this.http.get(apiUrl, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${localStorage.getItem('token')}`),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  sendSurveyInviteToUser(data: any): Observable<any> {
    try {
      const apiUrl = `${this.BASE_URL}/admin/send-users-invite`;
      return this.http.post(apiUrl,data, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${localStorage.getItem('token')}`),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  userSurveyList(): Observable<any> {
    try {
      const apiUrl = `${this.BASE_URL}/user/get-survey-list`;
      return this.http.get(apiUrl, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${localStorage.getItem('token')}`),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

}
