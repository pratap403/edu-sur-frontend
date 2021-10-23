import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services';
import { routes } from '../../../../consts';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  constructor(
    private service: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) { }
  @Output() sendLoginForm = new EventEmitter<any>();
  public form: FormGroup;
  public routers: typeof routes = routes;


  public ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  public login(): any {

    if (this.form.valid) {

      this.service.login(this.form.value).subscribe({
        next: (v) => {

          if (v.status === 'success') {

            localStorage.setItem('token', v.data.token);
            localStorage.setItem('userType', v.data.userType);
            localStorage.setItem('email', v.data.email);
            localStorage.setItem('userName', `${v.data.firstName} ${v.data.lastName}`);
            this.toastrService.success(
              v.message, 'Login'
            );
            this.router.navigate([this.routers.DASHBOARD]);

          }

          if (v.status === 'error') {

            this.toastrService.error(
              v.message, 'Login'
            );

          }


        },
        error: (e) => {
          this.toastrService.error(
            e.message, 'Login'
          )
        },
      })

    }

  }
}
