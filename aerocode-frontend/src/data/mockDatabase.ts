import type { Funcionario } from '../components/types/Funcionario'
import type { Relatorio } from '../components/types/Relatorio';
import type { Teste } from '../components/types/Teste';
import type { Aeronave, Peca } from '../components/types/TipoAeronave'


// Dados de Funcionários
export const mockFuncionariosDB: Funcionario[] = [
    { id: 101, nome: 'Professor Xavier', nivel: 'ADMINISTRADOR', telefone: '(12) 98888-0001', endereco: 'Rua X, 100', usuario: 'prof.x' },
    { id: 201, nome: 'Jean Grey', nivel: 'ENGENHEIRO', telefone: '(12) 98888-1111', endereco: 'Rua A', usuario: 'jean.g' },
    { id: 202, nome: 'Ciclope', nivel: 'OPERADOR', telefone: '(12) 98888-2222', endereco: 'Rua B', usuario: 'ciclope' },
    { id: 203, nome: 'Tempestade', nivel: 'OPERADOR', telefone: '(12) 98888-3333', endereco: 'Rua C', usuario: 'tempestade' },
    { id: 204, nome: 'Wolverine', nivel: 'OPERADOR', telefone: '(12) 98888-4444', endereco: 'Rua Garra, 10', usuario: 'logan' },
    { id: 205, nome: 'Fera', nivel: 'ENGENHEIRO', telefone: '(12) 98888-5555', endereco: 'Rua Laboratório, 50', usuario: 'fera.h' },
    { id: 206, nome: 'Noturno', nivel: 'OPERADOR', telefone: '(12) 98888-6666', endereco: 'Rua Azul, 22', usuario: 'noturno' },
    { id: 207, nome: 'Colossus', nivel: 'OPERADOR', telefone: '(12) 98888-7777', endereco: 'Rua Aço, 80', usuario: 'colossus' },
    { id: 208, nome: 'Jubileu', nivel: 'OPERADOR', telefone: '(12) 98888-8888', endereco: 'Rua Fogos, 15', usuario: 'jubileu' },
    { id: 209, nome: 'Gambit', nivel: 'OPERADOR', telefone: '(12) 98888-9999', endereco: 'Rua Cartas, 21', usuario: 'gambit' },
    { id: 210, nome: 'Bishop', nivel: 'ENGENHEIRO', telefone: '(12) 97777-0000', endereco: 'Rua Futuro, 91', usuario: 'bishop' },
    { id: 211, nome: 'Mística', nivel: 'OPERADOR', telefone: '(12) 97777-1111', endereco: 'Rua Camuflada, 7', usuario: 'mistica' },
];

// Dados de Aeronaves
export const mockAeronavesDB: Aeronave[] = [
    {
        codigo: 'E175', modelo: 'EMB-175', tipo: 'COMERCIAL', capacidade: 88, status: 'Em Produção',
        alcance: 0,
        percentualConcluido: 0,
        pecas: [],
        etapas: [],
        testes: []
    },
    {
        codigo: 'A350', modelo: 'Airbus A350', tipo: 'COMERCIAL', capacidade: 300, status: 'Pronta',
        alcance: 0,
        percentualConcluido: 0,
        pecas: [],
        etapas: [],
        testes: []
    },
    {
        codigo: 'F35', modelo: 'Lockheed F-35', tipo: 'MILITAR', capacidade: 1, status: 'Em Testes',
        alcance: 0,
        percentualConcluido: 0,
        pecas: [],
        etapas: [],
        testes: []
    },
    {
        codigo: 'G280', modelo: 'Gulfstream G280', tipo: 'COMERCIAL', capacidade: 10, status: 'Entregue',
        alcance: 0,
        percentualConcluido: 0,
        pecas: [],
        etapas: [],
        testes: []
    },
    {
        codigo: 'B737', modelo: 'Boeing 737 MAX', tipo: 'COMERCIAL', capacidade: 172, status: 'Em Produção',
        alcance: 0,
        percentualConcluido: 0,
        pecas: [],
        etapas: [],
        testes: []
    },
    {
        codigo: 'KC390', modelo: 'Embraer KC-390', tipo: 'MILITAR', capacidade: 80, status: 'Em Testes',
        alcance: 0,
        percentualConcluido: 0,
        pecas: [],
        etapas: [],
        testes: []
    },
    {
        codigo: 'A220', modelo: 'Airbus A220', tipo: 'COMERCIAL', capacidade: 120, status: 'Pronta',
        alcance: 0,
        percentualConcluido: 0,
        pecas: [],
        etapas: [],
        testes: []
    },
    {
        codigo: 'F16', modelo: 'General Dynamics F-16', tipo: 'MILITAR', capacidade: 1, status: 'Pronta',
        alcance: 0,
        percentualConcluido: 0,
        pecas: [],
        etapas: [],
        testes: []
    },
    {
        codigo: 'ERJ145', modelo: 'Embraer ERJ-145', tipo: 'COMERCIAL', capacidade: 50, status: 'Entregue',
        alcance: 0,
        percentualConcluido: 0,
        pecas: [],
        etapas: [],
        testes: []
    },
    {
        codigo: 'C130', modelo: 'Lockheed C-130 Hercules', tipo: 'MILITAR', capacidade: 92, status: 'Em Produção',
        alcance: 0,
        percentualConcluido: 0,
        pecas: [],
        etapas: [],
        testes: []
    }
];

// Dados de Peças
export const mockPecasDB: Peca[] = [
    { codigo: '101', nome: 'Motor Esquerdo', fornecedor: 'Rolls Royce', status: 'EM ESTOQUE' },
    { codigo: '102', nome: 'Asa Esquerda', fornecedor: 'Airbus Aero', status: 'EM USO'},
    { codigo: '103', nome: 'Display Primário',  fornecedor: 'Garmin', status: 'EM MANUTENÇÃO'},
    { codigo: '104', nome: 'Seção Central',  fornecedor: 'Embraer Estruturas', status: 'EM USO'},
    { codigo: '105', nome: 'Pneu Trem Pouso', fornecedor: 'Michelin Aero', status: 'EM ESTOQUE'},
    { codigo: '106',  nome: 'Asa Direita', fornecedor: 'Boeing Parts', status: 'EM USO'},
    { codigo: '107', nome: 'Sistema de Navegação', fornecedor: 'Honeywell', status: 'EM ESTOQUE'},
    { codigo: '108', nome: 'Assento Executivo',  fornecedor: 'Recaro Aircraft Seating', status: 'EM USO'},
    { codigo: '109',  nome: 'Painel Frontal',  fornecedor: 'Airbus Aero', status: 'EM MANUTENÇÃO'},
    { codigo: '110', nome: 'Motor Direito', fornecedor: 'GE Aviation', status: 'EM ESTOQUE'},
];

// Dados de Testes
export const mockTestesDB: Teste[] = [
    { id: 1, aeronaveCodigo: 'E-175', tipo: 'ELÉTRICO', dataProgramada: '2025-05-20', dataRealizacao: '2025-05-25', resultado: 'APROVADO', responsavelNome: 'Carlos Souza' },
    { id: 2, aeronaveCodigo: 'E-175', tipo: 'HIDRÁULICO', dataProgramada: '2025-05-30', dataRealizacao: '2025-06-01', resultado: 'REPROVADO', responsavelNome: 'Carlos Souza' },
    { id: 3, aeronaveCodigo: 'A-350', tipo: 'ESTRUTURAL', dataProgramada: '2025-07-10', dataRealizacao: undefined, resultado: 'PENDENTE', responsavelNome: 'Ana Lima' },
    { id: 4, aeronaveCodigo: 'F-35', tipo: 'DE VOO', dataProgramada: '2025-09-01', dataRealizacao: undefined, resultado: 'PENDENTE', responsavelNome: 'João Ribeiro' },
    { id: 5, aeronaveCodigo: 'A-350', tipo: 'SOFTWARE', dataProgramada: '2025-07-15', dataRealizacao: '2025-07-16', resultado: 'APROVADO', responsavelNome: 'Ana Lima' },
    { id: 6, aeronaveCodigo: 'KC-390', tipo: 'ESTRUTURAL', dataProgramada: '2025-08-12', dataRealizacao: undefined, resultado: 'PENDENTE', responsavelNome: 'Maria Torres' },
    { id: 7, aeronaveCodigo: 'B737', tipo: 'ELÉTRICO', dataProgramada: '2025-04-25', dataRealizacao: '2025-04-26', resultado: 'APROVADO', responsavelNome: 'Carlos Souza' },
    { id: 8, aeronaveCodigo: 'A220', tipo: 'DE VOO', dataProgramada: '2025-06-14', dataRealizacao: '2025-06-18', resultado: 'APROVADO', responsavelNome: 'João Ribeiro' },
    { id: 9, aeronaveCodigo: 'C-130', tipo: 'HIDRÁULICO', dataProgramada: '2025-05-22', dataRealizacao: undefined, resultado: 'PENDENTE', responsavelNome: 'Paulo Mendes' },
    { id: 10, aeronaveCodigo: 'G280', tipo: 'SOFTWARE', dataProgramada: '2025-07-28', dataRealizacao: undefined, resultado: 'PENDENTE', responsavelNome: 'Ana Lima' }
];

export const mockRelatoriosDB: Relatorio[] = [
    { id: 1, nome: 'Relatório Final Aeronave E-175', tipo: 'POR_AERONAVE', dataGeracao: '2025-06-10', geradoPor: 'Admin User', status: 'GERADO', linkDownload: '/reports/e175_final.pdf' },
    { id: 2, nome: 'Logística de Peças Mensal (Maio)', tipo: 'PECA_LOGISTICA', dataGeracao: '2025-06-01', geradoPor: 'Engenheiro Chefe', status: 'GERADO', linkDownload: '/reports/pecas_maio.pdf' },
    { id: 3, nome: 'Relatório de Testes de Voo A-350', tipo: 'TESTES_QUALIDADE', dataGeracao: '2025-06-15', geradoPor: 'QA Manager', status: 'PENDENTE' },
    { id: 4, nome: 'Produção Geral Q2 2025', tipo: 'PRODUCAO_GERAL', dataGeracao: '2025-07-01', geradoPor: 'Admin User', status: 'ERRO' },
    { id: 5, nome: 'Checklist de Estruturas KC-390', tipo: 'POR_AERONAVE', dataGeracao: '2025-07-04', geradoPor: 'Ana Lima', status: 'GERADO', linkDownload: '/reports/kc390_estruturas.pdf' },
    { id: 6, nome: 'Qualidade - Sistemas Elétricos B737', tipo: 'TESTES_QUALIDADE', dataGeracao: '2025-07-12', geradoPor: 'QA Manager', status: 'GERADO', linkDownload: '/reports/b737_eletrica.pdf' },
    { id: 7, nome: 'Relatório de Manutenção C-130', tipo: 'POR_AERONAVE', dataGeracao: '2025-08-01', geradoPor: 'Engenheiro Chefe', status: 'PENDENTE' },
    { id: 8, nome: 'Produção Geral Q3 2025', tipo: 'PRODUCAO_GERAL', dataGeracao: '2025-08-10', geradoPor: 'Admin User', status: 'GERADO', linkDownload: '/reports/producao_q3.pdf' },
    { id: 9, nome: 'Auditoria Interna - Estoque Peças', tipo: 'PECA_LOGISTICA', dataGeracao: '2025-09-03', geradoPor: 'Logística Supervisor', status: 'GERADO', linkDownload: '/reports/estoque_auditoria.pdf' },
    { id: 10, nome: 'Testes de Software G280', tipo: 'TESTES_QUALIDADE', dataGeracao: '2025-09-15', geradoPor: 'QA Manager', status: 'ERRO' }
];
