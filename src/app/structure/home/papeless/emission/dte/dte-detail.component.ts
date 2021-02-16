import { OnInit, Component, Input, Output, AfterViewInit, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

declare var $: any;

@Component({
    selector: 'dte-detail',
    templateUrl: './dte-detail.component.html'
})
export class DteDetailComponent implements OnInit, AfterViewInit , OnChanges{

    @Input() form_group_detail: FormGroup;
    @Input() products: [];
    public id_select_product = "";

    public det_tipos_lineas = [{id:'0',text: 'AFECTO'},{id:'1',text: 'EXENTO'},{id:'2',text: 'NO FACTURABLE'}];;

    constructor(){
        let date = new Number(new Date());
        let id = date.toString()+(Math.floor(Math.random() * 10));
        this.id_select_product = id + 'pro';

    };

    ngOnInit(){
    
    }

    ngOnChanges(){
        this.ngAfterViewInit();
    }

    ngAfterViewInit(){

        let these = this;
        let jq_id_select_product = '#'+these.id_select_product;
        let ds_products = [];

        if(this.products && this.products.length > 0){
            ds_products = this.products.map((obj:any) => {return {id:obj.name, text:obj.name};});
        }

        $(jq_id_select_product).empty().trigger('change');

        $(jq_id_select_product).select2({
            data: ds_products,
            tags: true,
            insertTag: function (data, tag) {
                data.push({id:tag.id,text:tag.text});
            },
        });

        $(jq_id_select_product).on('change', function(e){

            let select_product = $(jq_id_select_product).val();
            these.form_group_detail.controls['det_nombre_item'].setValue(select_product);

            let band = true;

            if(these.products && these.products.length > 0)
            these.products.forEach((element:any)=>{

                if(element.name == select_product && band){
                    band = false;
                    these.form_group_detail.controls['det_precio_unitario'].setValue(element.price_unit);
                    these.form_group_detail.controls['det_tipo_linea'].setValue(element.type_line);
                }

            });
  
        });
        

    }

}