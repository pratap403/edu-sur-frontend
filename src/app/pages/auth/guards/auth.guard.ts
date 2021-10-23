import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { routes } from '../../../consts';

@Injectable()
export class AuthGuard implements CanActivate {
  public routers: typeof routes = routes;

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    const permission = route.data.permission;

    if (token) {

      if (permission) {
        if (permission !== localStorage.getItem('userType')) {
          this.router.navigate([this.routers.DASHBOARD]);
        }
      }

      return true;
    } else {

      this.router.navigate([this.routers.LOGIN]);
      
    }

    

  }
}
