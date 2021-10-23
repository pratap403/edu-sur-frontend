import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { EditUserSurveyService } from './edit-user-survey.service';

@Component({
  selector: 'app-edit-user-survey',
  templateUrl: './edit-user-survey.component.html',
  styleUrls: ['./edit-user-survey.component.scss']
})
export class EditUserSurveyComponent implements OnInit {

  formDetails: any = {};
  surveyForm: FormGroup = this.fb.group({});

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: EditUserSurveyService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private errorService: ErrorHandlerService
  ) {


  }

  async ngOnInit() {

    try {

      const formDetails$ = this.service.editSurveyFormDetails({ 'token': this.activatedRoute.snapshot.paramMap.get('token') });
      let formDetails = await lastValueFrom(formDetails$);
      this.formDetails = formDetails.data;

      for (let form of this.formDetails.surveyQuestion) { // Create Dynamic Reactive
        let validatorsToPush = [];
        if (form.isAnswerRequired) {
          validatorsToPush.push(Validators.required);
        }

        this.surveyForm.addControl(form.key, this.fb.control('', validatorsToPush))

      }

    } catch (error) {
      console.log("Status", error.status);
    }

  }

  onSubmit() {
    try {
      let data = {
        formData: this.surveyForm.value,
        token: this.activatedRoute.snapshot.paramMap.get('token')
      }
      this.service.editSurveyFormAnswers(data).subscribe({
        next: (v) => {

          if (v.status === 'success') {

            this.toastrService.success(
              v.message, 'Survey Submission'
            );
            this.router.navigateByUrl('/survey/user-list');

          }

          if (v.status === 'error') {

            this.toastrService.error(
              v.message, 'Survey Submission'
            );

          }

        },
        error: (e) => {

          this.toastrService.error(
            e.message, 'Survey Submission'
          );
          this.errorService.handleError(e);

        }
      });

    } catch (error) {
      console.log(error);
    }
  }

}
