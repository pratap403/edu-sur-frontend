import { Component, Input } from '@angular/core';

import { SupportRequestData } from '../../models/support-request-data';

@Component({
  selector: 'app-support-requests',
  templateUrl: './support-requests.component.html',
  styleUrls: ['./support-requests.component.scss']
})
export class SupportRequestsComponent {
  @Input() supportRequestData: any;
  public displayedColumns: string[] = [
    'serialNum',
    'userName',
    'adminUserName',
    'surveyName',
    'surveyStatus',
    'inviteStatus',
    'invitationDate'
  ];
  userType: any;

  constructor() {
    this.userType = localStorage.getItem('userType');
    if(this.userType === 'user') {
      let getIndex = this.displayedColumns.indexOf('inviteStatus');
      this.displayedColumns.splice(getIndex, 1);
    }
  }
}
