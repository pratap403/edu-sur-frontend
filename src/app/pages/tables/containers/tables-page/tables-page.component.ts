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
  selector: 'app-tables-page',
  templateUrl: './tables-page.component.html',
  styleUrls: ['./tables-page.component.scss']
})
export class TablesPageComponent implements OnInit {
  constructor(
    private service: TablesService,
    private toastrService: ToastrService,
    public dialog: MatDialog,
    private errorService: ErrorHandlerService

  ) { }
  public displayedColumns: string[] = ['serialNum', 'surveyTitle', 'surveyType', 'createdAt', 'view_button'];
  public dataSource: MatTableDataSource<any>;
  public selection = new SelectionModel<any>(true, []);

  public isShowFilterInput = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public ngOnInit(): void {

    this.service.getAdminSurveyList().subscribe({
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

  openDialog(surveyId): void {
    const dialogRef = this.dialog.open(ShareSurveyComponent, {
      width: '500px',
      data: { surveyId: surveyId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}

@Component({
  selector: 'app-share-survey-page',
  templateUrl: 'assign-survey.component.html',
})
export class ShareSurveyComponent implements OnInit {
  public form: FormGroup;
  userList: any = [];

  constructor(
    public dialogRef: MatDialogRef<ShareSurveyComponent>,
    private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: TablesService,
    private errorService: ErrorHandlerService
     ) { 

      this.service.getUserList().subscribe({
        next: (v) => {
  
          if (v.status === 'success') {
            this.userList = v.data
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

  public ngOnInit(): void {
    this.form = new FormGroup({
      usersId: new FormControl('', [Validators.required]),
      surveyId: new FormControl(this.data.surveyId, [Validators.required]),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    try {

      this.service.sendSurveyInviteToUser(this.form.value).subscribe({
        next: (v) => {
  
          if (v.status === 'success') {
            
            this.toastrService.success(
              v.message, 'Admin Survey'
            );
            this.dialogRef.close();

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
  

    } catch (error) {
      console.log(error);
    }
  }

}

