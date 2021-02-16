import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { InlineSVGModule } from 'ng-inline-svg';
import { EmissionComponent } from './emission.component';
import { EmissionRoutes } from './emission.routing';
import { DteComponent } from './dte/dte.component';
import { DteService } from '../services/dte.service';
import { ProductService } from '../services/product.service';

import { DteDetailComponent } from './dte/dte-detail.component';
import { DteReferenceComponent } from './dte/dte-reference.component';
import { EnterpriseService } from '../services/enterprise.service';
import { CustomerService } from '../services/customer.service';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(EmissionRoutes),
        FormsModule,
        InlineSVGModule,
        FileUploadModule,
        NgxDatatableModule,
        ReactiveFormsModule
    ],
    declarations: [
        EmissionComponent,
        DteComponent,
        DteDetailComponent,
        DteReferenceComponent
    ],
    providers: [
        DatePipe,
        DteService,
        ProductService,
        EnterpriseService,
        CustomerService
    ]
})

export class EmissionModule { }