import { Component } from '@angular/core';
import { PessoaUsuaria } from '../services/types/credentials&user';
import { FormGroup } from '@angular/forms';
import { TokenService } from '../services/serviceUser/token.service';
import { UserService } from '../services/serviceUser/user.service';
import { Router } from '@angular/router';
import { FormularioService } from '../services/serviceUser/formulario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent {
  titulo = 'Seja bem-vindo(a) ';
  cadastro!: PessoaUsuaria;

  token: string = '';
  name: string = '';
  form!: FormGroup;

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private router: Router,
    private formularioService: FormularioService
  ) {}

  ngOnInit() {
    this.token = this.tokenService.retornarToken();
    this.userService.buscarCadastro().subscribe((cadastro) => {
      this.cadastro = cadastro;
      this.name = cadastro.name;
      this.carregarFormulario();
    });
  }

  carregarFormulario() {
    this.form = this.formularioService.getCadastro()!;
    this.form.patchValue({
      name: this.cadastro.name,
      birthDate: this.cadastro.birthDate,
      phone: this.cadastro.phone,
      email: this.cadastro.email,
      password: '',
      confirmarEmail: this.cadastro.email,
      confirmarSenha: '',
    });
    this.form.get('email')?.disable();
    this.form.get('confirmarEmail')?.disable();
  }

  atualizar() {
    if (
      !this.form?.value.name ||
      !this.form?.value.birthDate ||
      !this.form?.value.phone ||
      !this.form?.value.password
    ) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }
    const dadosAtualizados: PessoaUsuaria = {
      name: this.form?.value.name,
      birthDate: this.form?.value.birthDate,
      phone: this.form?.value.phone,
      email: this.cadastro.email,
      // email: this.form?.value.email,
      password: this.form?.value.password,
    };

    this.userService.editarCadastro(dadosAtualizados).subscribe({
      next: () => {
        alert('Cadastro editado com sucesso');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
