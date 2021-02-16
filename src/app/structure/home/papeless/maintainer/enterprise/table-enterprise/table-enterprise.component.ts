import { OnInit, Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';

declare var jQuery: any;
declare var Chart: any;
declare var $: any;
declare var swal: any;

@Component({
    selector: 'app-table-enterprise',
    templateUrl: './table-enterprise.component.html'
})
export class TableEnterpriseComponent implements OnInit, OnChanges{

    @Input() enterprises: [];

    @Output() update = new EventEmitter();
    @Output() delete = new EventEmitter();

    public temp_enterprises = [];

    constructor(){}

    ngOnInit(){}

    ngOnChanges(){
        this.temp_enterprises = [...this.enterprises];
    }

    onClickUpdate(e_enterprise:any){
        this.update.emit(e_enterprise);
    }

    onClickDelete(e_enterprise:any){

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
            these.delete.emit(e_enterprise);
        })

    }

    onKeyUp(e_keyup:any){

        const val = e_keyup.target.value.toLowerCase();

        const temp = this.enterprises.filter(function(d:any) {
            if (d.bussiness_name && d.bussiness_name.toLowerCase().indexOf(val) !== -1 || !val)
                return true;
            else if (d.rut && d.rut.toString().toLowerCase().indexOf(val) !== -1 || !val)
                return true;
        });

        this.temp_enterprises = temp;
    }
}