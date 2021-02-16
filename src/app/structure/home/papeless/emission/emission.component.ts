import { AfterContentInit, Component, ViewEncapsulation, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { GroupByPipe } from 'ngx-pipes';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { expand } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

declare var $: any;
declare var jQuery: any;
declare var Chart: any;

@Component({
    selector: 'app-emission',
    templateUrl: './emission.component.html',
    styles: ['.resize-modal{  max-height: calc(100vh - 210px); overflow-y: auto;} .right{text-align:right;} em {margin:4px}']
})
export class EmissionComponent implements OnInit {
    
    constructor() {}

    ngOnInit(){
    }

}
