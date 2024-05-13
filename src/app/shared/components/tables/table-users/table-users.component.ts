import { Component, EventEmitter, Output, inject } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormGroup, FormControl, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountFormComponent } from '../../forms/account-form/account-form.component';
import { UsersService } from '../../../services/account-services/user.service';
import { Router } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../forms/account-form/search-bar/search-bar/search-bar.component';
import { of } from 'rxjs';
import { IconEdit } from '../../../../../assets/icons/edit';
import { IconDelete } from '../../../../../assets/icons/delete';
import { IconSettings } from '../../../../../assets/icons/settings';
import { User } from '../../../../models/account/user';

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
    AsyncPipe,
    IconDelete,
    IconEdit,
    IconSettings,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './table-users.component.html',
  styleUrl: './table-users.component.css'
})
export class TableUsersComponent {
  private toast: any;
  editUserForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UsersService) {
    this.editUserForm = this.fb.group({
      new_identification: [''],
      new_email: [''],
      new_name: [''],
      new_surname: [''],
      new_municipality: [''],
      new_password: ['']
    });
  }

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

  isMenuOpen = false;

  openMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  currentUser: User | null = null;

  editModal(user: User): void {
    this.currentUser = user;
    this.editUserForm.reset();
    const myModal = new bootstrap.Modal(document.getElementById('editModal'));
    myModal.show();
  }

  deleteModal(user: User): void {
    this.currentUser = user;
    const myModal = new bootstrap.Modal(document.getElementById('deleteModal'), {
      keyboard: false
    });
    myModal.show();
  }

  updateCurrentUser(): void {
    const ni = this.editUserForm.get('new_identification')?.value;
    const ne = this.editUserForm.get('new_email')?.value;
    const nn = this.editUserForm.get('new_name')?.value;
    const ns = this.editUserForm.get('new_surname')?.value;
    const nm = this.editUserForm.get('new_municipality')?.value;
    const np = this.editUserForm.get('new_password')?.value;

    if (this.currentUser) {
      if (ni !== null) {
        this.currentUser.identification = ni;
      } else if (ne !== null) {
        this.currentUser.email = ne;
      } else if (nn !== null) {
        this.currentUser.name = nn;
      } else if (ns !== null) {
        this.currentUser.surname = ns;
      } else if (nm !== null) {
        this.currentUser.municipality = nm;
      } else if (np !== null) {
        this.currentUser.password = np;
      }
    }
  }

  async onSubmitEdit() {
    this.updateCurrentUser();
    if (this.currentUser) {
      await this._usersService.updateUser(this.currentUser.id, this.currentUser);
      //console.log('Updated User:', this.currentUser);
    }
  }

  async onSubmitDelete() {
    try {
      if (this.currentUser) {
        await this._usersService.deleteUser(this.currentUser.id);
      }
    } catch (error) {}
  }
}
