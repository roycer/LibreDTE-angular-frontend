import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
    selector: 'cat-top-bar',
    templateUrl: './top-bar.component.html'
})
export class TopBarComponent implements OnInit {

    public username = "";

    constructor(private authService: AuthService) {}

    logout(){
        this.authService.logout();
    }

    ngOnInit(){
        if (localStorage.getItem('_modules')) {
            this.username = JSON.parse(localStorage.getItem('_modules')).username;
        }
    }

}
