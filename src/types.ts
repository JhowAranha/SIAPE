export interface User {
  email: string;
  name: string;
  role: 'Administrador' | 'Visitante' | 'Professor';
  initials: string;
}

export interface Item {
  id: number;
  name: string;
  category: 'eletronicos' | 'vestuario' | 'documentos' | 'outros';
  type: 'achado' | 'perdido';
  local: string;
  date: string;
  status: 'aguardando' | 'devolvido';
  by: string;
  desc: string;
}