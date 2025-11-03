export type StatusPeca = 'EM ESTOQUE' | 'EM USO' | 'EM MANUTENÇÃO' | 'DESCARTADA' | 'REPARO'
export type TipoPeca = 'MOTOR' | 'ASA' | 'AVIONICA' | 'FUSELAGEM' | 'TREM DE POUSO' | 'OUTROS'

export interface Peca {
    id: number
    codigoInterno: string
    nome: string
    tipo: TipoPeca
    fornecedor: string
    status: StatusPeca
    aeronaveAssociada?: string
    dataEntrada: string 
    dataUltimaAtualizacao: string
    localizacaoArmazem: string
}

export interface PecaFormData {
    codigoInterno: string
    nome: string
    tipo: TipoPeca | ''
    fornecedor: string
    status: StatusPeca | ''
    aeronaveAssociada?: string
    dataEntrada: string
    localizacaoArmazem: string
}