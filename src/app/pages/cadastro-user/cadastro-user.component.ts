import { Component } from '@angular/core';
import { UserService } from '../services/serviceUser/user.service';
import { Router } from '@angular/router';
import { FormularioService } from '../services/serviceUser/formulario.service';
import { PessoaUsuaria } from '../services/types/credentials&user';

@Component({
  selector: 'app-cadastro-user',
  templateUrl: './cadastro-user.component.html',
  styleUrls: ['./cadastro-user.component.scss'],
})
export class CadastroUserComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private formularioService: FormularioService
  ) {}

  cadastro() {
    const formCadastro = this.formularioService.getCadastro();

    const novoCadastro = formCadastro?.getRawValue() as PessoaUsuaria;
    console.log('Dados enviados para o backend:', novoCadastro);

    this.userService.cadastraUser(novoCadastro).subscribe((response) => {
      this.router.navigate([`/login`]);
    });
  }
}
