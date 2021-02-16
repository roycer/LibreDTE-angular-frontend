import { OnInit, Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

declare var $: any;
declare var jQuery: any;
declare var Chart: any;
declare var swal: any;

@Component({
    selector: 'app-form-enterprise-update',
    templateUrl: './form-enterprise-update.component.html'
})
export class FormEnterpriseUpdateComponent implements OnInit, OnChanges {
    
    public form_update: FormGroup;

    @Input() enterprise_in:any;
    @Output() enterprise_out = new EventEmitter(); 

    constructor(private _fb: FormBuilder){}

    ngOnInit(){
        this.initForm();
    }

    ngOnChanges(){

        if(this.enterprise_in){

            this.form_update.controls['id'].setValue(this.enterprise_in.id);
            this.form_update.controls['rut'].setValue(this.enterprise_in.rut);
            this.form_update.controls['bussiness_name'].setValue(this.enterprise_in.bussiness_name);
            this.form_update.controls['bussiness'].setValue(this.enterprise_in.bussiness);
            this.form_update.controls['bussiness_code'].setValue(this.enterprise_in.bussiness_code);
            this.form_update.controls['address'].setValue(this.enterprise_in.address);
            this.form_update.controls['commune'].setValue(this.enterprise_in.commune);
            this.form_update.controls['city'].setValue(this.enterprise_in.city);
        }
    }

    async initForm(){

        this.form_update = this._fb.group({
            id: ['',<any>Validators.required],
            rut: ['', <any>Validators.required],
            bussiness_name: ['', <any>Validators.required],
            bussiness: ['', <any>Validators.required],
            bussiness_code: ['', <any>Validators.required],
            address: ['', <any>Validators.required],
            commune: ['', <any>Validators.required],
            city: ['', <any>Validators.required]
        });

    }

    ngAfterViewInit(){

        let these = this;

    }

    onSubmit(form_value:any, form_valid: any){
        
        if(form_valid){
            this.enterprise_out.emit(form_value);
        }

    }

}