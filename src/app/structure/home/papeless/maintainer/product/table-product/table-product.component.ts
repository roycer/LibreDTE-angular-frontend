import { OnInit, Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';

declare var jQuery: any;
declare var Chart: any;
declare var $: any;
declare var swal: any;

@Component({
    selector: 'app-table-product',
    templateUrl: './table-product.component.html'
})
export class TableProductComponent implements OnInit, OnChanges{

    @Input() products: [];

    @Output() update = new EventEmitter();
    @Output() delete = new EventEmitter();

    public temp_products = [];

    constructor(){}

    ngOnInit(){}

    ngOnChanges(){
        this.temp_products = [...this.products];
    }

    onClickUpdate(e_product:any){
        this.update.emit(e_product);
    }

    onClickDelete(e_product:any){

        let these = this;

        swal({
            title: "Estas seguro que desea eliminar?",
            text: "Una vez eliminado no podra recuperar!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#dd6b55',
            cancelButtonColor: '#999',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Eliminar',
            dangerMode: true,
        }, function(){
            these.delete.emit(e_product);
        })

    }

    onKeyUp(e_keyup:any){

        const val = e_keyup.target.value.toLowerCase();

        const temp = this.products.filter(function(d:any) {
            if (d.name && d.name.toLowerCase().indexOf(val) !== -1 || !val)
                return true;
            else if (d.description && d.description.toString().toLowerCase().indexOf(val) !== -1 || !val)
                return true;
        });

        this.temp_products = temp;
    }
}