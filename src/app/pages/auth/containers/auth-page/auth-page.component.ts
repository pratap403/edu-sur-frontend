import { Component } from '@angular/core';
import { routes } from '../../../../consts';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  public todayDate: Date = new Date();
  public routers: typeof routes = routes;

  constructor(
    
  ) { }

  public sendLoginForm(): void {
  }

  public sendSignForm(): void {
  }
}
