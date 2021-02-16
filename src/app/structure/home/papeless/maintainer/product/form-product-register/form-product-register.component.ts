import { OnInit, Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

declare var $: any;
declare var jQuery: any;
declare var Chart: any;
declare var swal: any;

@Component({
    selector: 'app-form-product-register',
    templateUrl: './form-product-register.component.html'
})
export class FormProductRegisterComponent implements OnInit, OnChanges {
    
    public form_register: FormGroup;
    
    public det_tipos_lineas = [{id:'0',text: 'AFECTO'},{id:'1',text: 'EXENTO'},{id:'2',text: 'NO FACTURABLE'}];;

    @Output() product = new EventEmitter();

    constructor(private _fb: FormBuilder){}

    ngOnInit(){
        this.initForm();
    }

    ngOnChanges(){
    }

    async initForm(){

        this.form_register = this._fb.group({
            name: ['', <any>Validators.required],
            description: ['', <any>Validators.required],
            measure_unit: ['', <any>Validators.required],
            quantity: ['', <any>Validators.required],
            price_unit: ['', <any>Validators.required],
            type_line: ['', <any>Validators.required],
            total_line: ['', <any>Validators.required],
            id_enterprises: ['1', <any>Validators.required],
        });

    }

    ngAfterViewInit(){

        let these = this;

    }

    onSubmit(form_value:any,form_valid:any){
        
        if(form_valid){
            this.product.emit(form_value);
        }
    }

}