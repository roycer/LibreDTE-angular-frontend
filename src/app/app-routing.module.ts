import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
    {
        path: 'login',
        loadChildren: './structure/login/login.module#LoginModule'
    },
    {
        path: 'home',
        loadChildren: './structure/home/home.module#HomeModule',
        //canActivate: [AuthGuardService]
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
