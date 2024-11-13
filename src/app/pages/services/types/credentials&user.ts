export interface CredentialsDTO {
  username: string;
  password: string;
}
/*
export interface PessoaUsuaria {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  dataNascimento: Date;
}
*/
export interface PessoaUsuaria {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  password: Date;
}
