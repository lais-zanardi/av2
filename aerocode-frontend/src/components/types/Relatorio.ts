export type TipoRelatorio = 'PRODUCAO_GERAL' | 'POR_AERONAVE' | 'PECA_LOGISTICA' | 'TESTES_QUALIDADE' | 'MANUTENCAO'
export type StatusRelatorio = 'GERADO' | 'PENDENTE' | 'ERRO'

export interface Relatorio {
    id: number
    nome: string 
    tipo: TipoRelatorio
    dataGeracao: string 
    geradoPor: string 
    status: StatusRelatorio
    linkDownload?: string
    parametros?: Record<string, any>
}

export interface RelatorioFormData { 
    nome: string
    tipo: TipoRelatorio | ''
    parametros?: Record<string, any>
}