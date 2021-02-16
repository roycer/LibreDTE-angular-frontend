import {Routes} from '@angular/router';
import {PapelessComponent} from './papeless.component';

export const PapelessRoutes: Routes = [
    {
         path: '',
         component: PapelessComponent,
         children: [
            {
                path: 'emission',
                loadChildren: './emission/emission.module#EmissionModule'
            },
            {
                path: 'maintainer',
                loadChildren: './maintainer/maintainer.module#MaintainerModule'
            }
        ]
    }
];