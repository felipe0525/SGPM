import { Component, OnInit, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormControl, ReactiveFormsModule, Validators, ValidationErrors, FormGroup } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserForm } from '../../../../models/account/user';
import { UsersService } from '../../../services/account-services/user.service';

//import bcrypt from 'bcrypt';

export interface CreateUserForm {
  name: FormControl<string>;
  surname: FormControl<string>;
  identification: FormControl<number | null>;
  email: FormControl<string>;
  type: FormControl<number | null>;
  municipality: FormControl<string>;
  password: FormControl<string>;
}

export const StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.css'
})
export class AccountFormComponent {
  accountForm: FormGroup;
  userTypes = ['Estudiantil', 'Municipal'];
  selectedUserType = '';
  
  userType: string = '';
  municipioDisabled: boolean = true;

  submitting = false;

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    this.accountForm = this.fb.group({
      type: [''] // Initialize with an empty value or a default one
    });
  }
  private url: any;

  private _formBuilder = inject(FormBuilder).nonNullable;
  private _router = inject(Router);
  private _usersService = inject(UsersService);
  private _userId = '';

  get userId(): string {
    return this._userId;
  }

  @Input() set userId(value: string) {
    this._userId = value;
    this.setFormValues(this._userId);
  }

  form = this._formBuilder.group<CreateUserForm>({
    name: this._formBuilder.control('', Validators.required),
    surname: this._formBuilder.control('', Validators.required),
    identification: this._formBuilder.control<number | null>(null, [
      Validators.required,
      this.numberValidator
    ]),
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    type: this._formBuilder.control<number | null>(null, [
      Validators.required,
      this.numberValidator
    ]),
    municipality: this._formBuilder.control('', Validators.required),
    
    // sin validador [temporal]
    password: this._formBuilder.control('', Validators.required),

    /*  validador de contraseña segura utilizando regex
    * criteria:
    *
    * - must be at least 8 characters long.
    * - must contain at least one uppercase letter.
    * - must contain at least one lowercase letter.
    * - must contain at least one number.
    * - must contain at least one special character (e.g., !, @, #, $).
    *
    * 
    password: this._formBuilder.control<string>('', {
      validators: [Validators.required, Validators.pattern(StrongPasswordRegx)],
    }),
    */
  });

  numberValidator(control: FormControl<any>): ValidationErrors | null {
    if (isNaN(control.value) || control.value === null || !isFinite(control.value)) {
      return {
        invalidNumber: true
      };
    }
    return null;
  }

  async createUser() {
    if (this.form.invalid || this.submitting) {
      console.log('Form is invalid or already submitting.');
      return;
    }

    this.submitting = true;

    try {
      const user = this.form.value as UserForm;
      !this.userId
        ? await this._usersService.createUser(user)
        : await this._usersService.updateUser(this.userId, user);
      this._router.navigate(['/home']);
    } catch (error) {
      // call some toast service to handle the error
    }
  }

  async setFormValues(id: string) {
    try {
      const user = await this._usersService.getUser(id);
      if (!user) return;
      this.form.setValue({
        name: user.name,
        surname: user.surname,
        identification: user.identification,
        email: user.email,
        type: user.type,
        municipality: user.municipality,
        password: user.password,
      });
    } catch (error) {}
  }

  ngOnInit(): void {
    this.selectedUserType = this.accountForm.get('type')?.value || '';
  }

  onUserTypeChange(newValue: string) {
    this.accountForm.get('type')?.setValue(newValue);
  }

  onSubmit() {
    this.redirect();
  }

  redirect() {
    //this.router.navigate(['/inicio']);
  }

  onRegister() {

  }

  //metodo para habilitar o deshabilitar el estatus del municipio
  updateMunicipioStatus(): void {
    this.municipioDisabled = this.userType !== 'Municipal';
  }
}
