export type NivelPermissao = 'ADMINISTRADOR' | 'ENGENHEIRO' | 'OPERADOR';

export interface Funcionario {
    id: number;
    nome: string;
    nivel: NivelPermissao;
    telefone: string;
    endereco: string;
    usuario: string; 
}

export interface User {
    id: number;
    name: string;
    nivelPermissao: NivelPermissao;
}