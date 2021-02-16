import { OnInit, Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EnterpriseService } from '../../../services/enterprise.service';

declare var $: any;
declare var jQuery: any;
declare var Chart: any;
declare var swal: any;

@Component({
    selector: 'app-form-client-register',
    templateUrl: './form-client-register.component.html',
    styleUrls: ['./form-client-register.component.css']
})
export class FormClientRegisterComponent implements OnInit, OnChanges {
    
    public form_client_register: FormGroup;
    public enterprises_arreglo = [];

    @Output() client = new EventEmitter();

    constructor(private _fb: FormBuilder,
                private enterpriseService: EnterpriseService,){}

    ngOnInit(){
        this.getEnterprises();
        this.initForm();
        console.log(this.form_client_register.controls['document'].value);
    }

    ngOnChanges(){
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
        
        $("#select_enterprise_client").select2({
            data: ds_cab_razones_sociales,
        });

        $("#select_enterprise_client").on('change', function(e){

            let cab_razon_social = $("#select_enterprise_client").val();
            these.form_client_register.controls['id_enterprises'].setValue(cab_razon_social);            
        });
    }

    async initForm(){

        this.form_client_register = this._fb.group({
            document: ['', <any>Validators.required],
            bussiness_name: ['', <any>Validators.required],
            bussiness: ['', <any>Validators.required],
            address: ['', <any>Validators.required],
            commune: ['', <any>Validators.required],
            city: ['', <any>Validators.required],
            ppassport: [false, <any>Validators.required],
            id_enterprises: ['', <any>Validators.required],
        });

    }

    ngAfterViewInit(){

        let these = this;
    }

    onSubmit(form_value:any,form_valid:any){
        if(form_valid){
            this.client.emit(form_value);
            console.log(form_value);
            this.form_client_register.controls['document'].setValue("");
            this.form_client_register.controls['bussiness_name'].setValue("");
            this.form_client_register.controls['bussiness'].setValue("");
            this.form_client_register.controls['address'].setValue("");
            this.form_client_register.controls['commune'].setValue("");
            this.form_client_register.controls['city'].setValue("");
            this.form_client_register.controls['id_enterprises'].setValue("");
        }
    }
}