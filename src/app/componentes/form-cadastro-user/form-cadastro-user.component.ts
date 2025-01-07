import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormularioService } from 'src/app/pages/services/serviceUser/formulario.service';
import { UserService } from 'src/app/pages/services/serviceUser/user.service';
import { FormValidations } from '../form-validations';

@Component({
  selector: 'app-form-cadastro-user',
  templateUrl: './form-cadastro-user.component.html',
  styleUrls: ['./form-cadastro-user.component.scss'],
})
export class FormCadastroUserComponent {
  cadastroForm!: FormGroup;

  @Input() titulo: string = 'Crie sua conta';
  @Output() acaoClique: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private formularioService: FormularioService
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

    this.formularioService.setCadastro(this.cadastroForm);
  }

  executarAcao() {
    this.acaoClique.emit();
  }
}
