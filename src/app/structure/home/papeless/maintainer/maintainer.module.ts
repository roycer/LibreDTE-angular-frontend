import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MaintainerRoutes } from './maintainer.routing';
import { MaintainerComponent } from './maintainer.component';
import { EnterpriseService } from '../services/enterprise.service';
import { EnterpriseComponent } from './enterprise/enterprise.component';
import { TableEnterpriseComponent } from './enterprise/table-enterprise/table-enterprise.component';
import { FormEnterpriseRegisterComponent } from './enterprise/form-enterprise-register/form-enterprise-register.component';
import { FormEnterpriseUpdateComponent } from './enterprise/form-enterprise-update/form-enterprise-update.component';

import { ProductComponent } from './product/product.component';
import { TableProductComponent } from './product/table-product/table-product.component';
import { FormProductRegisterComponent } from './product/form-product-register/form-product-register.component';
import { FormProductUpdateComponent } from './product/form-product-update/form-product-update.component';
import { ProductService } from '../services/product.service';

import { FormClientRegisterComponent } from './clients/form-client-register/form-client-register.component';
import { FormClientUpdateComponent } from './clients/form-client-update/form-client-update.component';
import { ClientComponent } from './clients/client.component';
import { CustomerService } from '../services/customer.service';
import { TableClientComponent } from './clients/table-client/table-client.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(MaintainerRoutes),
        FormsModule,
        FileUploadModule,
        NgxDatatableModule,
        ReactiveFormsModule
    ],
    declarations: [

        MaintainerComponent,

        EnterpriseComponent,
        ClientComponent,
        TableEnterpriseComponent,
        FormEnterpriseRegisterComponent,
        FormEnterpriseUpdateComponent,

        ProductComponent,
        TableProductComponent,
        FormProductRegisterComponent,
        FormProductUpdateComponent,

        FormClientRegisterComponent,
        FormClientUpdateComponent,
        TableClientComponent,

    ],
    providers: [
        EnterpriseService,
        ProductService,
        CustomerService

    ]
})

export class MaintainerModule { }