import {Routes} from '@angular/router';
import {MaintainerComponent} from './maintainer.component';
import { EnterpriseComponent } from './enterprise/enterprise.component';
import { ProductComponent } from './product/product.component';
import { ClientComponent } from './clients/client.component';

export const MaintainerRoutes: Routes = [
    {
        path: 'enterprise',
        component: EnterpriseComponent
    },
    {

        path: 'product',
        component: ProductComponent
    },
    {
        path: 'client',
        component : ClientComponent

    }
];