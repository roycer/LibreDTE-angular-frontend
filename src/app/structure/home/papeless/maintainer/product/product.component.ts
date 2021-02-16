import { AfterContentInit, Component, ViewEncapsulation, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { GroupByPipe } from 'ngx-pipes';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { expand } from 'rxjs/operators';
import { NgForm } from '@angular/forms'
import { switchAll } from 'rxjs/operators';
import * as moment from 'moment';
import { ProductService } from '../../services/product.service';


declare var $: any;

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
    
    public today: number = Date.now();

    public api_products = [];

    public product_update: any;
   
    constructor(
        private productService: ProductService,

        ) {}

    ngOnInit(){        
        this.getProducts();        
    }
    
    async getProducts(){
        this.productService.all().subscribe((response: any) => {
            this.api_products = response.result;
        });
    }

    onRegister(product: any){

        this.productService.add(product).subscribe((response : any) => {
            alert("Registro Realizado");
            this.getProducts();
        });
        
    }

    onDelete(product:any){
        this.productService.remove(product.id).subscribe((response: any) => {
            this.getProducts();
        });
    }

    onUpdate(product:any){
        this.productService.put(product).subscribe((response:any)=>{
            this.getProducts();
        });
    }

    selectUpdate(product:any){
        this.product_update = product;
        $("#modalEdit").modal('show');
    }

}

