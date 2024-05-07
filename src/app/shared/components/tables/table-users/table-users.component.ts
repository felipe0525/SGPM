import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AccountFormComponent } from '../../forms/account-form/account-form.component';

@Component({
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '*',
        opacity: 1,
      })),
      state('closed', style({
        height: '0px',
        opacity: 0,
      })),
      transition('open <=> closed', [
        animate('0.3s')
      ]),
    ]),
  ],
  selector: 'app-table-users',
  standalone: true,
  imports: [
    AccountFormComponent
  ],
  templateUrl: './table-users.component.html',
  styleUrl: './table-users.component.css'
})
export class TableUsersComponent {
  isOpen = false;
}
