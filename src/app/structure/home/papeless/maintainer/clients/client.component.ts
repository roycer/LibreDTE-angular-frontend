import { AfterContentInit, Component, ViewEncapsulation, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { GroupByPipe } from 'ngx-pipes';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { expand } from 'rxjs/operators';
import { NgForm } from '@angular/forms'
import { switchAll } from 'rxjs/operators';
import * as moment from 'moment';
import { CustomerService } from '../../services/customer.service';


declare var $: any;

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit {
    
    public today: number = Date.now();

    public api_clients = [];

    public client_update: any;
   
    constructor(
        private clientService: CustomerService,

        ) {}

    ngOnInit(){
        this.getClients();
    }
    
    async getClients(){
        this.clientService.todo().subscribe((response: any) => {
            this.api_clients = response.result;
        });
    }

    onRegister(client: any){

        this.clientService.add(client).subscribe((response : any) => {
            alert("Registro Realizado");
            this.getClients();
        });
        
    }

    onDelete(client:any){
        this.clientService.remove(client.id).subscribe((response: any) => {
            this.getClients();
        });
    }

    onUpdate(client:any){
        this.clientService.put(client).subscribe((response:any)=>{
            this.getClients();
        });
    }

    selectUpdate(client:any){
        this.client_update = client;
        $("#modalEdit").modal('show');
    }

}

