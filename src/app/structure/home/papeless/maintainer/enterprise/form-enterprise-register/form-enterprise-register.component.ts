import { OnInit, Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

declare var $: any;
declare var jQuery: any;
declare var Chart: any;
declare var swal: any;

@Component({
    selector: 'app-form-enterprise-register',
    templateUrl: './form-enterprise-register.component.html'
})
export class FormEnterpriseRegisterComponent implements OnInit, OnChanges {
    
    public form_register: FormGroup;

    @Output() enterprise = new EventEmitter();

    constructor(private _fb: FormBuilder){}

    ngOnInit(){
        this.initForm();
    }

    ngOnChanges(){
    }

    async initForm(){

        this.form_register = this._fb.group({
            rut: ['', <any>Validators.required],
            bussiness_name: ['', <any>Validators.required],
            bussiness: ['', <any>Validators.required],
            bussiness_code: ['', <any>Validators.required],
            address: ['', <any>Validators.required],
            commune: ['', <any>Validators.required],
            city: ['', <any>Validators.required],
        });

    }

    ngAfterViewInit(){

        let these = this;

    }

    onSubmit(form_value:any,form_valid:any){
        if(form_valid){
            this.enterprise.emit(form_value);
            this.form_register.controls['rut'].setValue("");
            this.form_register.controls['bussiness_name'].setValue("");
            this.form_register.controls['bussiness'].setValue("");
            this.form_register.controls['bussiness_code'].setValue("");
            this.form_register.controls['address'].setValue("");
            this.form_register.controls['commune'].setValue("");
            this.form_register.controls['city'].setValue("");
        }
    }

}