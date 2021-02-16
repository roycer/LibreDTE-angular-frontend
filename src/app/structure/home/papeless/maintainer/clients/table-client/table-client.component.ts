import { OnInit, Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { EnterpriseService } from '../../../services/enterprise.service';

declare var jQuery: any;
declare var Chart: any;
declare var $: any;
declare var swal: any;

@Component({
    selector: 'app-table-client',
    templateUrl: './table-client.component.html'
})
export class TableClientComponent implements OnInit, OnChanges{

    @Input() clients: [];

    @Output() update = new EventEmitter();
    @Output() delete = new EventEmitter();

    public temp_clients = [];
    public enterprises_arreglo = [];
    public pares_enterprises = [];

    constructor(private serviceEnterprise:EnterpriseService){}

    async getEnterprises(){
        this.serviceEnterprise.all().subscribe((response:any)=>{
            this.serviceEnterprise = response.result;
            this.setearEnterprises();
        });
    }

    setearEnterprises(){
        this.pares_enterprises = this.enterprises_arreglo.map((obj:any) => {
            
            return {id:obj.id, text:obj.bussiness_name
            };
        });        
    }

    ngOnInit(){
        this.getEnterprises();
    }

    imprimeEnterprise(val:any){
        return this.pares_enterprises[val-1].text;
    }

    ngOnChanges(){
        this.temp_clients = [...this.clients];
    }

    onClickUpdate(e_client:any){
        this.update.emit(e_client);
    }

    onClickDelete(e_client:any){

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
            these.delete.emit(e_client);
        })

    }

    onKeyUp(e_keyup:any){

        const val = e_keyup.target.value.toLowerCase();

        const temp = this.clients.filter(function(d:any) {
            if (d.bussiness_name && d.bussiness_name.toLowerCase().indexOf(val) !== -1 || !val)
                return true;
            else if (d.rut && d.rut.toString().toLowerCase().indexOf(val) !== -1 || !val)
                return true;
        });

        this.temp_clients = temp;
    }
}