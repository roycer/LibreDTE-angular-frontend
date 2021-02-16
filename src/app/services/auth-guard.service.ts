import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (localStorage.getItem('_user')) {
      return true;
    }
    
    this.router.navigate(['/login'],{ queryParams: {returnUrl: state.url }});

    return false;
  }
  
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return null;
  }

}
