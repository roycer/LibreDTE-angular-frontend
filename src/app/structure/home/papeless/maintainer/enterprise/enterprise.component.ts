import { AfterContentInit, Component, ViewEncapsulation, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { GroupByPipe } from 'ngx-pipes';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { expand } from 'rxjs/operators';
import { NgForm } from '@angular/forms'
import { switchAll } from 'rxjs/operators';
import * as moment from 'moment';
import { EnterpriseService } from '../../services/enterprise.service';


declare var $: any;

@Component({
    selector: 'app-enterprise',
    templateUrl: './enterprise.component.html'
})
export class EnterpriseComponent implements OnInit {
    
    public today: number = Date.now();

    public api_enterprises = [];

    public enterprise_update: any;
   
    constructor(
        private enterpriseService: EnterpriseService,

        ) {}

    ngOnInit(){
        this.getEnterprises();
    }
    
    async getEnterprises(){
        this.enterpriseService.all().subscribe((response: any) => {
            this.api_enterprises = response.result;
        });
    }

    onRegister(enterprise: any){

        this.enterpriseService.add(enterprise).subscribe((response : any) => {
            alert("Registro Realizado");
            this.getEnterprises();
        });
        
    }

    onDelete(enterprise:any){
        this.enterpriseService.remove(enterprise.id).subscribe((response: any) => {
            this.getEnterprises();
        });
    }

    onUpdate(enterprise:any){
        this.enterpriseService.put(enterprise).subscribe((response:any)=>{
            this.getEnterprises();
        });
    }

    selectUpdate(enterprise:any){
        this.enterprise_update = enterprise;
        $("#modalEdit").modal('show');
    }

}

