import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import {NgbModule, NgbProgressbarModule} from '@ng-bootstrap/ng-bootstrap';
import {NgProgressHttpModule} from 'ngx-progressbar/http';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './utils/auth.interceptor';
import { Servidores } from './services/servidores';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    NgbProgressbarModule,
    NgProgressHttpModule
  ],
  providers: [
    AuthGuardService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    Servidores
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
