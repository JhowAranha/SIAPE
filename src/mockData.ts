import { User, Item } from './types';

export const MOCK_USERS: User[] = [
  { email: 'gugu', name: 'gugu', role: 'Administrador', initials: 'GG'},
  { email: 'admin@escola.edu.br', name: 'Administrador', role: 'Administrador', initials: 'AD' },
  { email: 'demo@siape.edu.br', name: 'Usuário Demo', role: 'Visitante', initials: 'DM' },
  { email: 'prof@escola.edu.br', name: 'Prof. Carlos Silva', role: 'Professor', initials: 'CS' },
];

export const INITIAL_ITEMS: Item[] = [
  { id: 1, name: 'Fone de ouvido JBL', category: 'eletronicos', type: 'achado', local: 'Quadra Esportiva', date: '2026-07-01', status: 'aguardando', by: 'Ana Paula', desc: 'Fone preto, modelo JBL Tune 510. Encontrado após treino de basquete.' },
  { id: 2, name: 'Jaqueta Corinthians G', category: 'vestuario', type: 'achado', local: 'Cantina', date: '2026-07-02', status: 'devolvido', by: 'João Marcos', desc: 'Jaqueta azul e branca oficial.' },
  { id: 3, name: 'Carteira Estudantil', category: 'documentos', type: 'perdido', local: 'Biblioteca', date: '2026-07-05', status: 'aguardando', by: 'Carlos Lima', desc: 'Contém documentos pessoais e carteirinha do R.A.' }
];