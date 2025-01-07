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
  /*
  cadastro() {
    const formCadastro = this.formularioService.getCadastro();

    const novoCadastro = formCadastro?.getRawValue() as PessoaUsuaria;
    console.log('Dados enviados para o backend:', novoCadastro);

    this.userService.cadastraUser(novoCadastro).subscribe((response) => {
      this.router.navigate([`/login`]);
    });
  }
*/

  cadastro() {
    const formCadastro = this.formularioService.getCadastro();

    // Verifica se o formulário está válido
    if (formCadastro && formCadastro.valid) {
      // Se o formulário for válido, obtém os valores e envia para o backend
      const novoCadastro = formCadastro.getRawValue() as PessoaUsuaria;
      console.log('Dados enviados para o backend:', novoCadastro);

      // Chama o serviço para cadastrar o usuário
      this.userService.cadastraUser(novoCadastro).subscribe(
        (response) => {
          // Redireciona para a página de login após o sucesso
          this.router.navigate([`/login`]);
        },
        (error) => {
          // Aqui você pode adicionar um tratamento de erro, se necessário
          console.error('Erro ao cadastrar o usuário:', error);
          alert('Erro ao cadastrar o usuário, tente novamente.');
        }
      );
    } else {
      // Se o formulário não for válido, exibe o alerta
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }
}
