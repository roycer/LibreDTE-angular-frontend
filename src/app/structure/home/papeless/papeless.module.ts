import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PapelessRoutes } from './papeless.routing';
import { PapelessComponent } from './papeless.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PapelessRoutes),
        FormsModule,
        FileUploadModule,
        NgxDatatableModule,
        ReactiveFormsModule
    ],
    declarations: [
        PapelessComponent
    ],
    providers: [

    ]
})

export class PapelessModule { }