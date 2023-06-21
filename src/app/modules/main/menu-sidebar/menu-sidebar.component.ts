import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppService} from '@services/app.service';
import {Observable} from 'rxjs';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public user;
    public menu = MENU;

    constructor(
        public appService: AppService,
        private store: Store<AppState>
    ) {}

    ngOnInit() {
        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
        });
    this.user = sessionStorage.getItem('nombre');
    }
}

export const MENU = [
    {
        name: 'Dashboard',
        iconClasses: 'fas fa-tachometer-alt',
        path: ['/home']
    },
    {
        name: 'Users',
        iconClasses: 'fas fa-file',
        path: ['/home/user']
    },
    {
        name: 'Config',
        iconClasses: 'fas fa-folder',        
        children: [
            {
                name: 'Products',
                iconClasses: 'far fa-address-book',
                path: ['/home/products']
            },
            {
                name: 'Blank',
                iconClasses: 'fas fa-file',
                path: ['/home/sub-menu-2']
            }
        ]
    }
];
