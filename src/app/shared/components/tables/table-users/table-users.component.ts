import { Component, inject } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AccountFormComponent } from '../../forms/account-form/account-form.component';
import { UsersService } from '../../../services/account-services/user.service';
import { Router } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../forms/account-form/search-bar/search-bar/search-bar.component';
import { of } from 'rxjs';

declare var bootstrap: any;

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
    AccountFormComponent,
    CommonModule,
    SearchBarComponent,
    AsyncPipe
  ],
  templateUrl: './table-users.component.html',
  styleUrl: './table-users.component.css'
})
export class TableUsersComponent {
  private toast: any;

  ngAfterViewInit(): void {
    const toastElement = document.getElementById('liveToast');
    this.toast = new bootstrap.Toast(toastElement);
  }

  showToast(): void {
    this.toast.show();
  }

  isOpen = false;

  private _usersService = inject(UsersService)
  private _router = inject(Router)

  users$ = this._usersService.getUsers();

  async changeQuery(query: string) {
    try {
      const users = await this._usersService.searchUserByQuery(query);
      this.users$ = of(users);
    } catch (error) {}
  }

  handleUserRegistered(): void {
    this.isOpen = false;
    this.showToast();
  }
  
  onSubmit() {
  }
}
