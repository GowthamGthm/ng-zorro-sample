import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isCollapsed = false;

  menus: any[] = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      subMenu: [
        {
          title: 'Welcome',
          link: '/welcome',
        },
        {
          title: 'Monitor',
          link: '',
        },
        {
          title: 'Workplace',
          link: '',
        },
      ],
    },
    {
      title: 'Form',
      icon: 'form',
      subMenu: [
        {
          title: 'Basic Form',
          link: '',
        },
        {
          title: 'Ultra Form',
          link: '',
        },
        {
          title: 'Premium Form',
          link: '',
        },
      ],
    },
  ];

  constructor(private router: Router) {}

  getSelected(link: string): boolean {
    return this.router.url === link;
  }


}
