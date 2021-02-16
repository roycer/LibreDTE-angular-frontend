import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { HomeComponent } from './home.component';
import {HomeRoutes} from './home.routing';
import { TopBarComponent} from '../../components/top-bar/top-bar.component';
import { MenuLeftComponent } from '../../components/menu-left/menu-left.component';
import { MenuRightComponent } from '../../components/menu-right/menu-right.component';
import { InlineSVGModule } from 'ng-inline-svg';

@NgModule({
  imports: [
    CommonModule,
    InlineSVGModule,
    RouterModule.forChild(HomeRoutes)
  ],
  declarations: [
      HomeComponent,
      TopBarComponent,
      MenuLeftComponent,
      MenuRightComponent
  ]
})
export class HomeModule { }
