import { Component, OnInit, OnChanges, AfterViewInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DteService } from '../../services/dte.service';
import { DatePipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { EnterpriseService } from '../../services/enterprise.service';
import { CustomerService } from '../../services/customer.service';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import * as jsPDF from 'jspdf';
import * as html2canvas from "html2canvas";
import { ActivatedRoute } from '@angular/router';

declare var $: any;
declare var jQuery: any;
declare var Chart: any;
declare var swal: any;

@Component({
    selector: 'app-dte',
    templateUrl: './dte.component.html'
})
export class DteComponent implements OnInit, OnChanges, AfterViewInit {


    public dte = "";
    public doc = null;
    
    public form_dte_register: FormGroup;

    public cab_razones_sociales = [];
    public api_products = [];
    public api_customers = [];
    public isEditCab = true;
    public isEditRec = true;
    public cab_tipos_dtes = [{id:'33',text: 'FACTURA'},{id:'34',text: 'FACTURA EXENTA'},{id:'52',text: 'GUIA DE DESPACHO'},{id:'56',text: 'NOTA DE DEBITO'},{id:'61',text: 'NOTA DE CREDITO'}];
    public cab_formas_pagos = [{id:'1',text: 'CONTADO'},{id:'2',text: 'CREDITO'}];
    public total_descuentos = 0;
    public total_exento = 0;
    public total_no_facturable = 0;
    public total_neto = 0;
    public id_emisor = 0;
    public response = "";

    id: number;
    private sub: any;

    constructor(
        private _fb: FormBuilder, 
        private datePipe: DatePipe,
        private dteService: DteService,
        private productService: ProductService,
        private enterpriseService: EnterpriseService,
        private customerService: CustomerService,
        private route: ActivatedRoute
        ){}
    
    ngOnInit(){

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            switch(this.id){
                case 33: this.dte = "FACTURA"; break;
                case 34: this.dte = "FACTURA EXENTA"; break;
                case 52: this.dte = "GUIA DE DESPACHO"; break;
                case 56: this.dte = "NOTA DE DEBITO"; break;
                case 61: this.dte = "NOTA DE CREDITO"; break;
            }
            this.initForm(this.id);
        });

        this.doc = new jsPDF();

        this.getEnterprises();
        this.initDatePicker();
        this.onChanges();
    }

    onChanges(){

        this.form_dte_register.get('details').valueChanges.subscribe((val: []) => {
            let temp_total_exento = 0;
            let temp_total_no_facturable = 0;
            let temp_total_neto = 0;
            
            for (let i = 0; i< val.length;i++){

                if(val[i]['det_tipo_linea'] === "1"){
                    temp_total_exento+=(val[i]['det_precio_unitario']*val[i]['det_cantidad']);
                }
                else if(val[i]['det_tipo_linea'] === "2"){
                    temp_total_no_facturable+=(val[i]['det_precio_unitario']*val[i]['det_cantidad']);
                }
                else {
                    temp_total_neto +=(val[i]['det_precio_unitario']*val[i]['det_cantidad']);
                }
            }

            this.total_exento = temp_total_exento;
            this.total_no_facturable = temp_total_no_facturable;
            this.total_neto = temp_total_neto;
            
        });

    }

    ngOnChanges(){
    }

    ngAfterViewInit(){

        this.initUpdateSelectEnterprise();
        
    }

    initUpdateSelectEnterprise(){

        let these = this;
        let ds_cab_razones_sociales = this.cab_razones_sociales.map((obj:any) => {return {id:obj.bussiness_name, text:obj.bussiness_name};});
        
        $("#select_cab_razon_social").select2({
            data: ds_cab_razones_sociales,
        });

        $("#select_cab_razon_social").on('change', function(e){

            let cab_razon_social = $("#select_cab_razon_social").val();
            these.form_dte_register.controls['cab_razon_social'].setValue(cab_razon_social);

            let band = true;

            these.cab_razones_sociales.forEach((element:any) => {

                if(element.bussiness_name == cab_razon_social && band){
                    band = false;

                    these.form_dte_register.controls['cab_rut_emisor'].setValue(element.rut);
                    these.form_dte_register.controls['cab_giro'].setValue(element.bussiness);
                    these.form_dte_register.controls['cab_acteco'].setValue(element.bussiness_code);
                    these.form_dte_register.controls['cab_direccion'].setValue(element.address);
                    these.form_dte_register.controls['cab_comuna'].setValue(element.commune);
                    these.form_dte_register.controls['cab_ciudad'].setValue(element.city);
                    console.log(cab_razon_social);
                    these.initServices(element.id);
                    
                }

            });

            these.isEditCab = band;

            if(band){
                these.id_emisor = 0;
                these.api_products = [];
            }
                
        });

       this.initUpdateSelectReceptor();

    }

    initUpdateSelectReceptor(){

        let these = this;
        let ds_customers = this.api_customers.map((obj:any) => {return {id:obj.rut, text: (obj.rut + ' - ' + obj.bussiness_name)};});
        
        $("#select_rec_documento").select2({
            data: ds_customers,
            tags: true,
            insertTag: function (data, tag) {
                data.push({id:tag.id,text:tag.text});
            },
        });
        
        $("#select_rec_documento").on('change', function(e){

            let rec_documento = $("#select_rec_documento").val();
            these.form_dte_register.controls['rec_documento'].setValue(rec_documento);

            let band = true;
            these.isEditRec = true;

            these.api_customers.forEach((customer:any) => {
                
                if(customer.rut == rec_documento && band){
                    
                    these.form_dte_register.controls['rec_razon_social'].setValue(customer.bussiness_name);
                    these.form_dte_register.controls['rec_giro'].setValue(customer.bussiness);
                    these.form_dte_register.controls['rec_dirección'].setValue(customer.address);
                    these.form_dte_register.controls['rec_comuna'].setValue(customer.commune);
                    these.form_dte_register.controls['rec_ciudad'].setValue(customer.city);
                    these.isEditRec = false;
                    band = false;
                }

            });
            
        });
    }
    
    initForm(id_dte:any){

        this.form_dte_register = this._fb.group({
            cab_rut_emisor: [null, <any>Validators.required],
            cab_razon_social: [null, <any>Validators.required],
            cab_giro: [null, <any>Validators.required],
            cab_acteco: [null, <any>Validators.required],
            cab_direccion: [null, <any>Validators.required],
            cab_comuna: [null, <any>Validators.required],
            cab_ciudad: [null, <any>Validators.required],
            cab_tipo_dte: [id_dte, <any>Validators.required],
            cab_fecha_emision: [null, <any>Validators.required],
            cab_forma_pago: [null, <any>Validators.required],
            rec_documento: [null, <any>Validators.required],
            rec_razon_social: [null, <any>Validators.required],
            rec_giro: [null, <any>Validators.required],
            rec_dirección: [null, <any>Validators.required],
            rec_comuna: [null, <any>Validators.required],
            rec_ciudad: [null, <any>Validators.required],
            details: this._fb.array([]),
            references: this._fb.array([])
        });

    }

    initDatePicker(){

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

        $('#attr_dp_cab_fecha_emision').on('dp.change', function(e) {
            let attr_cab_fecha_emision = $("#attr_cab_fecha_emision").val();
            these.form_dte_register.controls['cab_fecha_emision'].setValue(attr_cab_fecha_emision);
        });

    }

    initServices(id_emisor:number){
        $('#select_rec_documento').empty().trigger('change');
        this.api_customers = [];
        this.api_products = [];
        this.id_emisor = id_emisor;
        if(id_emisor > 0){
            this.getProducts(id_emisor);
            this.getCustomers(id_emisor);
        }
    }

    async getCustomers(id_emisor:number){
        this.customerService.get(id_emisor+"").subscribe((response:any)=>{
            this.api_customers = response.result;
            this.initUpdateSelectReceptor();
        });

    }

    async getProducts(id_emisor:number){

        this.productService.get(id_emisor+"").subscribe((response:any)=>{
            this.api_products = response.result;
        });
    }

    async getEnterprises(){
        this.enterpriseService.all().subscribe((response:any)=>{
            this.cab_razones_sociales = response.result;
            this.initUpdateSelectEnterprise();
        });
    }

    addDetail(){
        
        let details = this.form_dte_register.get('details') as FormArray;

        details.push(
            this._fb.group({
                det_tipo_linea: [null, null],
                det_nombre_item: [null, <any>Validators.required],
                det_glosa: [null, null],
                det_cantidad: [null, <any>Validators.required],
                det_precio_unitario: [null, <any>Validators.required]
            })
        );
        
    }

    addReference(){
            
        let references = this.form_dte_register.get('references') as FormArray;

        references.push(
            this._fb.group({
                ref_tipo_dte: '',
                ref_folio: '',
                ref_fecha_emision: '',
                ref_codigo: '',
                ref_razon: ''
        })
        );
            
    }

    removeDetail(i:number){

        let details = this.form_dte_register.get('details') as FormArray;
        details.removeAt(i);

    }

    removeReference(i:number){

        let references = this.form_dte_register.get('references') as FormArray;
        references.removeAt(i);

    }

    async onRegister(form_value:any){
        this.dteService.add(form_value)
        .subscribe(
            (response:any)=> {
                alert('Envío realizado');
                this.response = response;
            },
            error => {
                console.log(error);
            }
        );
    }

    print(){
        let printContents, popupWin;
        
        html2canvas(document.querySelector('#content')).then(canvas => {

            // this.doc.save("test");
            // this.doc.autoPrint();

            var url = canvas.toDataURL();
            popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
            popupWin.document.open();
            popupWin.document.write('<body onload="window.print();window.close()"><br><img src="'+url+'"/></body>');
            popupWin.document.close();

        });
    }

}