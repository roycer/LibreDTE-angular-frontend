import { OnInit, Component, Input, Output, AfterViewInit, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

declare var $: any;

@Component({
    selector: 'dte-reference',
    templateUrl: './dte-reference.component.html'
})
export class DteReferenceComponent implements OnInit, AfterViewInit, OnChanges {

    @Input() form_group_reference: FormGroup;
    @Input() tipos_dtes: [];

    public ref_codigos = [{id:'1',text: 'ANULA'},{id:'2',text: 'CORRIGE TEXTO'},{id:'3',text: 'CORRIGE MONTO'}];;

    public id_dp_fecha_emision = '';
    public id_fecha_emision = '';

    constructor(){
        let date = new Number(new Date());
        let id = date.toString()+(Math.floor(Math.random() * 10));
        this.id_fecha_emision = id + 'fe';
        this.id_dp_fecha_emision = id + 'fedp';
    };

    ngOnInit(){

        let these = this;

        $('.datepicker').datetimepicker({
            widgetPositioning: {
              horizontal: 'left'
            },
            icons: {
              time: "fa fa-clock-o",
              date: "fa fa-calendar",
              up: "fa fa-arrow-up",
              down: "fa fa-arrow-down",
              previous: 'fa fa-arrow-left',
              next: 'fa fa-arrow-right'
            },
            format: 'YYYY-MM-DD'
        });

    }

    ngOnChanges(){
        
    }

    ngAfterViewInit(){

        let these = this;
        let jq_id_dp_fecha_emision  = '#'+these.id_dp_fecha_emision;
        let jq_id_fecha_emision = '#'+these.id_fecha_emision;

        $(jq_id_dp_fecha_emision).on('dp.change', function(e) {
            let attr_ref_fecha_emision = $(jq_id_fecha_emision).val();
            these.form_group_reference.controls['ref_fecha_emision'].setValue(attr_ref_fecha_emision);
        });
    }




}