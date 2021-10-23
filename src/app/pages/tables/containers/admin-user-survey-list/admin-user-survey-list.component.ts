import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { TablesService } from '../../services/tables.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';

@Component({
  selector: 'app-admin-user-survey-list',
  templateUrl: './admin-user-survey-list.component.html',
  styleUrls: ['./admin-user-survey-list.component.scss']
})

export class AdminUserSurveyListComponent implements OnInit {
  constructor(
    private service: TablesService,
    private toastrService: ToastrService,
    public dialog: MatDialog,
    private errorService: ErrorHandlerService
  ) { }
  public displayedColumns: string[] = ['serialNum', 'userName', 'surveyName', 'emailStatus', 'userStatus', 'createdAt'];
  public dataSource: MatTableDataSource<any>;
  public selection = new SelectionModel<any>(true, []);

  public isShowFilterInput = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public ngOnInit(): void {

    this.service.getUserSurveyLogList().subscribe({
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

}


