import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';

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
          link: '/welcome'
        }
      ],
    },
    {
      title: 'Form',
      icon: 'form',
      subMenu: [
        {
          title: 'Form Validation with Template',
          link: '/validation/reactive-with-template'
        },
        {
          title: 'Form Validation without Template',
          link: '/validation/reactive-without-template'
        },
      ],
    },
    {
      title: 'Tables',
      icon: 'tables',
      subMenu: [
        {
          title: 'Nested Tables',
          link: '/tables/nested'
        }
      ],
    }
  ];

  constructor(private router: Router) {
  }

  getSelected(link: string): boolean {
    return this.router.url === link;
  }


}
