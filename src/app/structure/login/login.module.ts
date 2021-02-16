import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './login.component';
import {LoginRoutes} from './login.routing';

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild(LoginRoutes),
      FormsModule
  ],
  declarations: [
      LoginComponent
  ]
})
export class LoginModule { }
