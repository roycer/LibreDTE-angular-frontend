import { OnInit, Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

declare var $: any;
declare var jQuery: any;
declare var Chart: any;
declare var swal: any;

@Component({
    selector: 'app-form-product-update',
    templateUrl: './form-product-update.component.html'
})
export class FormProductUpdateComponent implements OnInit, OnChanges {
    
    public form_update: FormGroup;

    @Input() product_in:any;
    @Output() product_out = new EventEmitter(); 

    constructor(private _fb: FormBuilder){}

    ngOnInit(){
        this.initForm();
    }

    ngOnChanges(){

        if(this.product_in){

            this.form_update.controls['id'].setValue(this.product_in.id);
            this.form_update.controls['name'].setValue(this.product_in.name);
            this.form_update.controls['description'].setValue(this.product_in.description);
            this.form_update.controls['measure_unit'].setValue(this.product_in.measure_unit);
            this.form_update.controls['quantity'].setValue(this.product_in.quantity);
            this.form_update.controls['price_unit'].setValue(this.product_in.price_unit);
            this.form_update.controls['type_line'].setValue(this.product_in.type_line);
            this.form_update.controls['total_line'].setValue(this.product_in.total_line);
        }
    }

    async initForm(){

        this.form_update = this._fb.group({
            id: ['', <any>Validators.required],
            name: ['', <any>Validators.required],
            description: ['', <any>Validators.required],
            measure_unit: ['', <any>Validators.required],
            quantity: ['', <any>Validators.required],
            price_unit: ['', <any>Validators.required],
            type_line: ['', <any>Validators.required],
            total_line: ['', <any>Validators.required]
        });

    }

    ngAfterViewInit(){

        let these = this;

    }

    onSubmit(form_value:any, form_valid: any){
        
        if(form_valid){
            this.product_out.emit(form_value);
        }

    }

}