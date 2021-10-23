import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private router: Router) { }

   handleError(error: HttpErrorResponse) {
    try {
      if (error.status === 500) {
        this.handle500Error(error);
      }
      else if (error.status === 404) {
        this.handle404Error(error)
      }
      else if (error.status === 401) {
        this.tokenValidation(error)
      }
      else {
        this.handleOtherError(error);
      }
    } catch (err) {
      console.log(err.message);
    }

  }
   handle500Error(error: HttpErrorResponse) {
    try {
      this.router.navigate(['/500']);
    } catch (err) {
      console.log(err.message);
    }
  }

   handle404Error(error: HttpErrorResponse) {
    try {
      this.router.navigate(['/404']);
    } catch (err) {
      console.log(err.message);
    }

  }

   handleOtherError(error: HttpErrorResponse) {
    try {
      this.router.navigate(['/404']);
    } catch (err) {
      console.log(err.message);
    }
  }

    tokenValidation(error: any) {
    try {
      if ((error.status).toString() === "401") {
        Swal.fire({
          title: 'Session Timeout',
          icon: 'info',
          html: 'It will redirect to login page in  10 seconds.',
          timer: 10000,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Login'
        }).then((result) => {
          if (
            result.value === true ||
            result.dismiss === Swal.DismissReason.timer ||
            result.dismiss === Swal.DismissReason.cancel ||
            result.dismiss === Swal.DismissReason.backdrop ||
            result.dismiss === Swal.DismissReason.esc ||
            result.dismiss === Swal.DismissReason.close
          ) {
            localStorage.removeItem('token');
            localStorage.removeItem('userName');
            localStorage.removeItem('userType');
            localStorage.removeItem('email');
            this.router.navigateByUrl('/login');
          }
        });
      }
    } catch (error) {
      console.log(error);

    }
  }
}
