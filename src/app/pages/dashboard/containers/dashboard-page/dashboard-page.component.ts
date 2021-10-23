import { Component, OnInit } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';

import { DashboardService } from '../../services';
import {
  DailyLineChartData,
  PerformanceChartData,
  ProjectStatData,
  RevenueChartData,
  ServerChartData,
  SupportRequestData,
  VisitsChartData
} from '../../models';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {
  public revenueChartData$: any;
  public supportRequestData$: any;
  public visitsChartData$: any;
  userType: any;

  constructor(
    private service: DashboardService,
    private errorService: ErrorHandlerService
  ) {

    this.userType = localStorage.getItem('userType');

    if(this.userType === 'admin') {
      this.service.adminDashboardDetails().subscribe({
        next: (v) => {
          this.visitsChartData$ = {
            userCounts: v.data.userCount,
            todaySurveyCount: v.data.todaySurveyCount,
            totalUserSurveyCount: v.data.userSurvey.totalCount,
          }
          this.revenueChartData$ = {
            pending: v.data.userSurvey.pendingCount,
            submitted: v.data.userSurvey.submittedCount
          }
  
          this.supportRequestData$ = v.data.userSurveyListDetails
    
        },
        error: (e) => {
          this.errorService.handleError(e);
        }
      })
    }

    if(this.userType === 'user') {
      this.service.userDashboardDetails().subscribe({
        next: (v) => {
  
          this.supportRequestData$ = v.data.userSurveyListDetails
    
        },
        error: (e) => {
          this.errorService.handleError(e);
        }
      })
    }

  }
}
