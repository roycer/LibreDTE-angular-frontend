import { Routes } from '@angular/router';
import { DteComponent } from './dte/dte.component';


export const EmissionRoutes: Routes = [
    {
        path: 'dte/:id',
        component: DteComponent
    },
];