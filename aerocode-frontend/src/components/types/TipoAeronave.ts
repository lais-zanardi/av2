export type TipoAeronave = 'COMERCIAL' | 'MILITAR';

export interface Aeronave {
    codigo: string;
    modelo: string;
    tipo: TipoAeronave;
    capacidade: number;
    status: 'Em Produção' | 'Pronta' | 'Em Testes' | 'Entregue';
}