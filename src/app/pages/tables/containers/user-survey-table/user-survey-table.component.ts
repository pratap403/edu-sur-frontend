import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { TablesService } from '../../services/tables.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';

@Component({
  selector: 'app-user-survey-table',
  templateUrl: './user-survey-table.component.html',
  styleUrls: ['./user-survey-table.component.scss']
})

export class UserSurveyTableComponent implements OnInit {
  constructor(
    private service: TablesService,
    private toastrService: ToastrService,
    public dialog: MatDialog,
    private router: Router,
    private errorService: ErrorHandlerService
  ) { }
  public displayedColumns: string[] = ['serialNum', 'surveyCreator', 'surveyName', 'surveyStatus', 'createdAt', 'view_button'];
  public dataSource: MatTableDataSource<any>;
  public selection = new SelectionModel<any>(true, []);

  public isShowFilterInput = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public ngOnInit(): void {

    this.service.userSurveyList().subscribe({
      next: (v) => {

        if (v.status === 'success') {

          this.dataSource = new MatTableDataSource<any>(v.data.list);

          this.dataSource.paginator = this.paginator;

        }

        if (v.status === 'error') {

          this.toastrService.error(
            v.message, 'Admin Survey'
          );

        }

      },

      error: (e) => {

        console.log(e);
        this.errorService.handleError(e);
      }

    });

  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public showFilterInput(): void {
    this.isShowFilterInput = !this.isShowFilterInput;
  }

  editSurveyLink(token) {
    this.router.navigateByUrl(`/user/edit-survey/${token}`)
  }

}


