export type TipoAeronave = 'COMERCIAL' | 'MILITAR'

export interface Aeronave {
    codigo: string
    modelo: string
    tipo: TipoAeronave
    capacidade: number
    alcance: number
    status: StatusProducao
    percentualConcluido: number
    pecas: Peca[]
    etapas: Etapa[]
    testes: TesteRegistro[]
}

export type StatusProducao = 'Em Produção' | 'Em Testes' | 'Pronta' | 'Entregue' | 'Desativada'
export type ResultadoTeste = 'APROVADO' | 'REPROVADO' | 'PENDENTE'
export type StatusEtapa = 'PENDENTE' | 'EM ANDAMENTO' | 'CONCLUÍDA'

export interface Peca { 
    codigo: string 
    nome: string 
    fornecedor: string 
    status: string
}

export interface Etapa { 
    id: number 
    nome: string 
    prazo: string 
    status: StatusEtapa 
}

export interface TesteRegistro { 
    tipo: string 
    resultado: ResultadoTeste 
    data: string
}