import {Routes} from '@angular/router';
import {HomeComponent} from './home.component';

export const HomeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        
        children: [
            {
                path: 'papeless',
                loadChildren: './papeless/papeless.module#PapelessModule'
            }
            
        ]
    }
];
