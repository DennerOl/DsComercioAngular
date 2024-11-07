import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/pages/services/serviceUser/user.service';
import { PessoaUsuaria } from 'src/app/pages/services/types/credentials&user';
import { FormValidations } from '../form-validations';

@Component({
  selector: 'app-form-cadastro-user',
  templateUrl: './form-cadastro-user.component.html',
  styleUrls: ['./form-cadastro-user.component.scss'],
})
export class FormCadastroUserComponent {
  cadastroForm!: FormGroup;

  getCadastro(): FormGroup | null {
    return this.cadastroForm;
  }

  @Input() titulo: string = 'Crie sua conta';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, Validators.required],
      birthDate: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(3)]],
      confirmarEmail: [
        null,
        [
          Validators.required,
          Validators.email,
          FormValidations.equalTo('email'),
        ],
      ],
      confirmarSenha: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          FormValidations.equalTo('password'),
        ],
      ],
    });
  }

  cadastro() {
    const formCadastro = this.getCadastro();

    const novoCadastro = formCadastro?.getRawValue() as PessoaUsuaria;
    console.log('Dados enviados para o backend:', novoCadastro);

    this.userService.cadastraUser(novoCadastro).subscribe((response) => {
      this.router.navigate([`/login`]);
    });
  }
}
