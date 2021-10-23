import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { routes } from '../../../../consts';
import { User } from '../../../../pages/auth/models';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input() user: User;
  @Output() signOut: EventEmitter<void> = new EventEmitter<void>();
  public routes: typeof routes = routes;

  public signOutEmit(): void {
    // this.signOut.emit();
    localStorage.removeItem('email');
    localStorage.removeItem('userName');
    localStorage.removeItem('userType');
    localStorage.removeItem('token');
    this.router.navigate([this.routes.LOGIN]);
  }

  data : any;

  constructor(
    private router: Router
  ) {
    this.data = {
      name: localStorage.getItem('userName'),
      email: localStorage.getItem('email'),
    }
  }

}
