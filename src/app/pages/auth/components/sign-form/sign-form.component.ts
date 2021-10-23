import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmedValidator } from '../../../../../confirmed-validator';
import { AuthService } from '../../services';
import { routes } from '../../../../consts';


@Component({
  selector: 'app-sign-form',
  templateUrl: './sign-form.component.html',
  styleUrls: ['./sign-form.component.scss']
})
export class SignFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toastrService: ToastrService
    ) {}
  @Output() sendSignForm = new EventEmitter<void>();
  // public form: FormGroup;
  gender: any[] = [
    {value: 'Male', viewValue: 'Male'},
    {value: 'Female', viewValue: 'Female'},
    {value: 'Other', viewValue: 'Other'}
  ];

  public form: FormGroup = new FormGroup({});
  public routers: typeof routes = routes;

  public ngOnInit(): void {

    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirmation: ['', [Validators.required]]
    }, { 
      validator: ConfirmedValidator('password', 'passwordConfirmation')
    })

  }

  public sign(): void {
    if (this.form.valid) {

      let data = this.form.value;
      data.dob = `${data.dob.getFullYear()}-${data.dob.getMonth() + 1}-${data.dob.getDate()}`;

      this.service.signUp(data).subscribe({
        next: (v) => {

          if (v.status === 'success') {

            this.toastrService.success(
              v.message, 'Sign UP'
            );
            this.form.reset();
          }

          if (v.status === 'error') {

            this.toastrService.error(
              v.message, 'Sign UP'
            );

          }


        },
        error: (e) => {
          this.toastrService.error(
            e.message, 'Sign UP'
          )
        },
      })

    }
  }
}

