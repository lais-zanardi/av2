export type ResultadoTeste = 'PENDENTE' | 'APROVADO' | 'REPROVADO'
export type TipoTeste = 'ELÉTRICO' | 'HIDRÁULICO' | 'ESTRUTURAL' | 'DE VOO' | 'SOFTWARE'



export interface Teste {
    id: number
    aeronaveCodigo: string 
    tipo: TipoTeste
    dataProgramada: string
    dataRealizacao?: string
    resultado: ResultadoTeste
    responsavelNome: string
}
