import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { TablesPageComponent } from './containers';
import { AdminUserSurveyListComponent } from './containers/admin-user-survey-list/admin-user-survey-list.component';
import { UserSurveyTableComponent } from './containers/user-survey-table/user-survey-table.component';
import { AuthGuard } from '../auth/guards';

const routes: Routes = [
  {
    path: 'admin-created-list',
    pathMatch: 'full',
    canActivate:[AuthGuard],
    component: TablesPageComponent,
    data: {
      permission: 'admin'
    }
  },
  {
    path: 'admin-user-log',
    pathMatch: 'full',
    canActivate:[AuthGuard],
    component: AdminUserSurveyListComponent,
    data: {
      permission: 'admin'
    }
  },
  {
    path: 'user-list',
    pathMatch: 'full',
    canActivate:[AuthGuard],
    component: UserSurveyTableComponent,
    data: {
      permission: 'user'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class TablesRoutingModule {
}
