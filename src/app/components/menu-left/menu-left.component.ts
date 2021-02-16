import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment'
import { AuthService } from 'src/app/services/auth.service';

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'cat-menu-left',
    templateUrl: './menu-left-vertical.component.html',
})
export class MenuLeftComponent implements OnInit {

    public modules = null;
    public username = "";
    public cab_tipos_dtes = [{id:'33',text: 'FACTURA'},{id:'34',text: 'FACTURA EXENTA'},{id:'52',text: 'GUIA DE DESPACHO'},{id:'56',text: 'NOTA DE DEBITO'},{id:'61',text: 'NOTA DE CREDITO'}];
    
    constructor(private authService: AuthService){}

    ngOnInit() {
        
        this.initMenuStyles();
        
    }


    logout(){
        this.authService.logout();
    }

    initMenuStyles(){

        $(function(){

            // scripts for "menu-left" module

            /////////////////////////////////////////////////////////////////////////////////////////
            // add backdrop

            $('.cat__menu-left').after('<div class="cat__menu-left__backdrop cat__menu-left__action--backdrop-toggle"><!-- --></div>');

            /////////////////////////////////////////////////////////////////////////////////////////
            // submenu

            $('.cat__menu-left__submenu > a').on('click', function(){

                if ($('body').hasClass('cat__config--vertical') || $('body').width() < 768) {

                    var parent = $(this).parent(),
                        opened = $('.cat__menu-left__submenu--toggled');

                    if (!parent.hasClass('cat__menu-left__submenu--toggled') && !parent.parent().closest('.cat__menu-left__submenu').length)
                        opened.removeClass('cat__menu-left__submenu--toggled').find('> .cat__menu-left__list').slideUp(200);

                    parent.toggleClass('cat__menu-left__submenu--toggled');
                    parent.find('> .cat__menu-left__list').slideToggle(200);

                }

            });

            // remove submenu toggle class when viewport back to full view
            $(window).on('resize', function(){
                if ($('body').hasClass('cat__config--horizontal') || $('body').width() > 768) {
                    $('.cat__menu-left__submenu--toggled').removeClass('cat__menu-left__submenu--toggled').find('> .cat__menu-left__list').attr('style', '');
                }
            });

            /////////////////////////////////////////////////////////////////////////////////////////
            // toggle menu

            $('.cat__menu-left__action--menu-toggle').on('click', function(){
                if ($('body').width() < 768) {
                    $('body').toggleClass('cat__menu-left--visible--mobile');
                } else {
                    //$('body').toggleClass('cat__menu-left--visible');
                }
            })

            $('.cat__menu-left__action--backdrop-toggle').on('click', function(){
                $('body').removeClass('cat__menu-left--visible--mobile');
            })


            /////////////////////////////////////////////////////////////////////////////////////////
            // colorful menu

            var colorfulClasses = 'cat__menu-left--colorful--primary cat__menu-left--colorful--secondary cat__menu-left--colorful--primary cat__menu-left--colorful--default cat__menu-left--colorful--info cat__menu-left--colorful--success cat__menu-left--colorful--warning cat__menu-left--colorful--danger cat__menu-left--colorful--yellow',
                colorfulClassesArray = colorfulClasses.split(' ');

            function setColorfulClasses() {
                $('.cat__menu-left__list--root > .cat__menu-left__item').each(function(){
                    var randomClass = colorfulClassesArray[Math.floor(Math.random() * colorfulClassesArray.length)];
                    $(this).addClass(randomClass);
                })
            }

            function removeColorfulClasses() {
                $('.cat__menu-left__list--root > .cat__menu-left__item').removeClass(colorfulClasses);
            }

            if ($('body').hasClass('cat__menu-left--colorful')) {
                setColorfulClasses();
            }

            $('body').on('setColorfulClasses', function() {
                setColorfulClasses();
            });

            $('body').on('removeColorfulClasses', function() {
                removeColorfulClasses();
            });


        });

    }
}
