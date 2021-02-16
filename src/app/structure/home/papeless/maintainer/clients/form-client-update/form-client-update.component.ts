import { OnInit, Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EnterpriseService } from '../../../services/enterprise.service';

declare var $: any;
declare var jQuery: any;
declare var Chart: any;
declare var swal: any;

@Component({
    selector: 'app-form-client-update',
    templateUrl: './form-client-update.component.html',
    styleUrls: ['./form-client-update.component.css']
})
export class FormClientUpdateComponent implements OnInit, OnChanges {
    
    public form_client_update: FormGroup;
    public enterprises_arreglo = [];

    @Input() client_in:any;
    @Output() client_out = new EventEmitter(); 

    constructor(private _fb: FormBuilder,
                private enterpriseService: EnterpriseService){}

    ngOnInit(){
        this.getEnterprises();
        this.initForm();
    }

    async getEnterprises(){
        this.enterpriseService.all().subscribe((response:any)=>{
            this.enterprises_arreglo = response.result;
            this.initUpdateSelectEnterprise();
        });
    }

    initUpdateSelectEnterprise(){

        let these = this;
        let ds_cab_razones_sociales = this.enterprises_arreglo.map((obj:any) => {return {id:obj.id, text:obj.bussiness_name};});
        

        $("#select_enterprise_client_update").select2({
            data: ds_cab_razones_sociales,
        });

        $("#select_enterprise_client_update").on('change', function(e){

            let cab_razon_social = $("#select_enterprise_client_update").val();
            these.form_client_update.controls['id_enterprises'].setValue(cab_razon_social);            
        });

    }


    ngOnChanges(){

        if(this.client_in){

            this.form_client_update.controls['id'].setValue(this.client_in.id);
            this.form_client_update.controls['document'].setValue(this.client_in.document);
            this.form_client_update.controls['bussiness_name'].setValue(this.client_in.bussiness_name);
            this.form_client_update.controls['bussiness'].setValue(this.client_in.bussiness);
            this.form_client_update.controls['address'].setValue(this.client_in.address);
            this.form_client_update.controls['commune'].setValue(this.client_in.commune);
            this.form_client_update.controls['city'].setValue(this.client_in.city);
            this.form_client_update.controls['ppassport'].setValue(this.client_in.ppassport);
            this.form_client_update.controls['id_enterprises'].setValue(this.client_in.id_enterprises);
        }
    }

    async initForm(){

        this.form_client_update = this._fb.group({
            id: ['',<any>Validators.required],
            document: ['', <any>Validators.required],
            bussiness_name: ['', <any>Validators.required],
            bussiness: ['', <any>Validators.required],
            address: ['', <any>Validators.required],
            commune: ['', <any>Validators.required],
            city: ['', <any>Validators.required],
            ppassport: [false, <any>Validators.required],
            id_enterprises: ['', <any>Validators.required]
        });

    }

    ngAfterViewInit(){

        let these = this;

    }

    onSubmit(form_value:any, form_valid: any){
        
        if(form_valid){
            this.client_out.emit(form_value);
        }

    }

}