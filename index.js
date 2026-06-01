// ============================================================
//  SIAPE — Sistema de Achados e Perdidos Escolar
//  JavaScript Principal
// ============================================================

// ------- DADOS MOCKADOS --------
const MOCK_USERS = [
  { email: 'admin@escola.edu.br', pass: '123456', name: 'Administrador', role: 'Administrador', initials: 'AD' },
  { email: 'demo@siape.edu.br', pass: 'demo', name: 'Usuário Demo', role: 'Visitante', initials: 'DM' },
  { email: 'prof@escola.edu.br', pass: '123456', name: 'Prof. Carlos Silva', role: 'Professor', initials: 'CS' },
];

let currentUser = null;
let selectedItemId = null;

// Mock data de itens
let items = [
  { id: 1, name: 'Fone de ouvido JBL', category: 'eletronicos', type: 'achado', local: 'Quadra Esportiva', date: '2025-07-01', status: 'aguardando', by: 'Ana Paula', desc: 'Fone preto, modelo JBL Tune 510. Encontrado após treino de basquete.' },
  { id: 2, name: 'Jaqueta Corinthians G', category: 'vestuario', type: 'achado', local: 'Cantina', date: '2025-07-02', status: 'devolvido', by: 'João Marcos', desc: 'Jaqueta azul e branca do Corinthians, tamanho G.' },
  { id: 3, name: 'Carteira com documentos', category: 'documentos', type: 'achado', local: 'Banheiro Bloco A', date: '2025-07-02', status: 'aguardando', by: 'Secretaria', desc: 'Carteira marrom com RG, CPF e cartão. Sem dinheiro.' },
  { id: 4, name: 'Óculos de grau', category: 'acessorios', type: 'achado', local: 'Biblioteca', date: '2025-07-03', status: 'aguardando', by: 'Bibliotecária', desc: 'Armação preta, grau alto.' },
  { id: 5, name: 'Calculadora Casio', category: 'eletronicos', type: 'achado', local: 'Sala 204', date: '2025-07-03', status: 'devolvido', by: 'Prof. Carlos', desc: 'Calculadora científica, modelo fx-82ES.' },
  { id: 6, name: 'Tênis Nike branco 42', category: 'vestuario', type: 'achado', local: 'Quadra Esportiva', date: '2025-07-04', status: 'aguardando', by: 'Monitor', desc: 'Tênis branco Nike Air Max, número 42.' },
  { id: 7, name: 'Celular Samsung A53', category: 'eletronicos', type: 'perdido', local: 'Corredor Bloco B', date: '2025-07-04', status: 'cadastrado', by: 'Lucas R.', desc: 'Celular preto, tela de 6.5 polegadas. Sem chip.' },
  { id: 8, name: 'Mochila preta Adidas', category: 'acessorios', type: 'perdido', local: 'Sala 101', date: '2025-07-05', status: 'cadastrado', by: 'Mariana L.', desc: 'Mochila preta Adidas com livros e estojo.' },
  { id: 9, name: 'Passaporte', category: 'documentos', type: 'achado', local: 'Portaria', date: '2025-07-05', status: 'devolvido', by: 'Porteiro', desc: 'Passaporte brasileiro. Entregue ao titular.' },
  { id: 10, name: 'Relógio Casio G-Shock', category: 'eletronicos', type: 'achado', local: 'Cantina', date: '2025-07-06', status: 'aguardando', by: 'Atendente', desc: 'Relógio preto G-Shock resistente à água.' },
  { id: 11, name: 'Boné azul marinho', category: 'vestuario', type: 'achado', local: 'Corredor Bloco C', date: '2025-07-06', status: 'devolvido', by: 'Porteiro', desc: 'Boné azul marinho sem identificação.' },
  { id: 12, name: 'Notebook Lenovo IdeaPad', category: 'eletronicos', type: 'perdido', local: 'Laboratório de Informática', date: '2025-07-07', status: 'cadastrado', by: 'Fernando C.', desc: 'Notebook prata, 14 polegadas, com adesivos.' },
  { id: 13, name: 'Chave com chaveiro vermelho', category: 'outros', type: 'achado', local: 'Estacionamento', date: '2025-07-07', status: 'aguardando', by: 'Vigilância', desc: 'Conjunto de chaves com chaveiro vermelho.' },
  { id: 14, name: 'Cartão estudantil UFPE', category: 'documentos', type: 'achado', local: 'Refeitório', date: '2025-07-08', status: 'devolvido', by: 'Atendente', desc: 'Cartão estudantil da UFPE de Rafaela Souza.' },
  { id: 15, name: 'Pen drive 64GB', category: 'eletronicos', type: 'achado', local: 'Sala dos Professores', date: '2025-07-08', status: 'aguardando', by: 'Secretaria', desc: 'Pen drive Kingston azul, 64GB.' },
  { id: 16, name: 'Caderno de Matemática', category: 'outros', type: 'perdido', local: 'Sala 312', date: '2025-07-09', status: 'cadastrado', by: 'Alana P.', desc: 'Caderno verde com nome Alana na capa.' },
  { id: 17, name: 'Garrafa Stanley preta', category: 'outros', type: 'achado', local: 'Quadra Esportiva', date: '2025-07-09', status: 'aguardando', by: 'Monitor', desc: 'Garrafa térmica Stanley 1L, preta.' },
  { id: 18, name: 'Guarda-chuva azul', category: 'outros', type: 'achado', local: 'Entrada Principal', date: '2025-07-10', status: 'devolvido', by: 'Porteiro', desc: 'Guarda-chuva dobrável azul.' },
  { id: 19, name: 'Pulseira prata', category: 'acessorios', type: 'perdido', local: 'Quadra', date: '2025-07-10', status: 'cadastrado', by: 'Isabela M.', desc: 'Pulseira de prata com coração.' },
  { id: 20, name: 'Estojo rosa', category: 'outros', type: 'achado', local: 'Corredor Bloco A', date: '2025-07-10', status: 'aguardando', by: 'Vigilância', desc: 'Estojo rosa com canetas e lápis.' },
  { id: 21, name: 'Capa de celular transparente', category: 'acessorios', type: 'achado', local: 'Cantina', date: '2025-07-11', status: 'devolvido', by: 'Atendente', desc: 'Capa transparente para iPhone 14.' },
  { id: 22, name: 'Chinelo Havaianas amarelo', category: 'vestuario', type: 'achado', local: 'Vestiário', date: '2025-07-11', status: 'aguardando', by: 'Monitor', desc: 'Chinelo Havaianas amarelo número 40.' },
  { id: 23, name: 'Cartão bancário Nubank', category: 'documentos', type: 'achado', local: 'Corredor Bloco B', date: '2025-07-12', status: 'devolvido', by: 'Secretaria', desc: 'Cartão Nubank encontrado no corredor.' },
  { id: 24, name: 'Livro "O Hobbit"', category: 'outros', type: 'achado', local: 'Biblioteca', date: '2025-07-12', status: 'aguardando', by: 'Bibliotecária', desc: 'Edição capa dura do livro O Hobbit.' },
];

const activities = [
  { text: '<strong>Fone JBL</strong> foi cadastrado no sistema', time: 'Há 5 minutos', color: 'var(--accent)', type: 'add' },
  { text: '<strong>Carteira com documentos</strong> aguardando retirada', time: 'Há 12 minutos', color: 'var(--accent3)', type: 'wait' },
  { text: '<strong>Jaqueta Corinthians</strong> foi devolvida ao proprietário', time: 'Há 1 hora', color: 'var(--accent)', type: 'deliver' },
  { text: '<strong>Ana Paula</strong> registrou novo achado: Fone JBL', time: 'Há 1 hora', color: 'var(--primary-light)', type: 'user' },
  { text: '<strong>Calculadora Casio</strong> foi devolvida após 2 dias', time: 'Há 3 horas', color: 'var(--accent)', type: 'deliver' },
  { text: '<strong>Lucas R.</strong> registrou perda: Celular Samsung A53', time: 'Há 4 horas', color: 'var(--accent2)', type: 'lost' },
  { text: '<strong>Passaporte</strong> foi devolvido ao titular', time: 'Há 5 horas', color: 'var(--accent)', type: 'deliver' },
  { text: '<strong>Relatório semanal</strong> gerado automaticamente', time: 'Ontem, 18:00', color: 'var(--primary-light)', type: 'report' },
];

// ------- STATE --------
let currentFilter = 'all';
let currentPage = 'dashboard';

// ------- PARTICLES --------
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let raf;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: -(Math.random() * 0.5 + 0.1),
      opacity: Math.random() * 0.4 + 0.1,
      color: Math.random() > 0.5 ? '108,99,255' : '0,212,170'
    };
  }

  for (let i = 0; i < 80; i++) particles.push(createParticle());

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.opacity})`;
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.y < -5) particles[i] = createParticle(), particles[i].y = canvas.height;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
    });
    // draw faint connection lines
    particles.forEach((a, i) => {
      particles.slice(i+1).forEach(b => {
        const d = Math.hypot(a.x-b.x, a.y-b.y);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(108,99,255,${0.06*(1-d/100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });
    raf = requestAnimationFrame(draw);
  }
  draw();
})();

// ------- LOADER --------
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    showLogin();
  }, 3200);
});

function showLogin() {
  const ls = document.getElementById('login-screen');
  ls.classList.remove('hidden');
  // Pre-fill date in modal
  const d = new Date();
  const dateStr = d.toISOString().split('T')[0];
  const dateInput = document.getElementById('modal-item-date');
  if (dateInput) dateInput.value = dateStr;
}

// ------- LOGIN --------
function switchTab(tab) {
  document.querySelectorAll('.login-tab').forEach((t, i) => {
    t.classList.toggle('active', (i === 0 && tab === 'login') || (i === 1 && tab === 'register'));
  });
  document.getElementById('panel-login').classList.toggle('active', tab === 'login');
  document.getElementById('panel-register').classList.toggle('active', tab === 'register');
}

function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  const isPass = input.type === 'password';
  input.type = isPass ? 'text' : 'password';
  btn.innerHTML = isPass
    ? `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/></svg>`
    : `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>`;
}

function validateEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

function setInputState(inputEl, errEl, ok, msg) {
  inputEl.classList.toggle('error', !ok);
  inputEl.classList.toggle('success', ok);
  errEl.classList.toggle('show', !ok);
  if (!ok && msg) errEl.querySelector('span').textContent = msg;
}

function handleLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-pass').value;
  const emailInput = document.getElementById('login-email');
  const passInput = document.getElementById('login-pass');
  const emailErr = document.getElementById('login-email-err');
  const passErr = document.getElementById('login-pass-err');
  let ok = true;

  if (!validateEmail(email)) { setInputState(emailInput, emailErr, false, 'Insira um e-mail válido'); ok = false; }
  else setInputState(emailInput, emailErr, true);
  if (pass.length < 6) { setInputState(passInput, passErr, false, 'Senha deve ter ao menos 6 caracteres'); ok = false; }
  else setInputState(passInput, passErr, true);
  if (!ok) return;

  const user = MOCK_USERS.find(u => u.email === email && u.pass === pass);
  if (!user) {
    setInputState(emailInput, emailErr, false, 'Credenciais inválidas');
    setInputState(passInput, passErr, false, 'Credenciais inválidas');
    showToast('E-mail ou senha incorretos', 'error');
    return;
  }
  loginUser(user);
}

function handleDemo() {
  loginUser(MOCK_USERS[1]);
}

function handleRegister() {
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const pass = document.getElementById('reg-pass').value;
  if (!name || !email || !pass) { showToast('Preencha todos os campos obrigatórios', 'warning'); return; }
  if (!validateEmail(email)) { showToast('E-mail inválido', 'error'); return; }
  if (pass.length < 6) { showToast('Senha deve ter ao menos 6 caracteres', 'error'); return; }
  const role = document.getElementById('reg-role').value || 'Usuário';
  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const newUser = { email, pass, name, role, initials };
  MOCK_USERS.push(newUser);
  showToast('Conta criada com sucesso!', 'success');
  setTimeout(() => { switchTab('login'); document.getElementById('login-email').value = email; }, 800);
}

function loginUser(user) {
  currentUser = user;
  document.getElementById('login-screen').classList.add('hidden');
  // Update UI with user info
  document.getElementById('sidebar-avatar').textContent = user.initials;
  document.getElementById('sidebar-username').textContent = user.name;
  document.getElementById('sidebar-role').textContent = user.email;
  document.getElementById('topbar-avatar').textContent = user.initials;
  document.getElementById('topbar-username').textContent = user.name.split(' ')[0];
  document.getElementById('topbar-role').textContent = user.role;
  document.getElementById('settings-avatar').textContent = user.initials;
  document.getElementById('settings-name').textContent = user.name;
  document.getElementById('settings-email').textContent = user.email;
  document.getElementById('settings-role-label').textContent = user.role;

  const app = document.getElementById('app');
  app.classList.add('visible');
  requestAnimationFrame(() => {
    app.style.opacity = '1';
    renderAll();
    animateMetrics();
    showToast(`Bem-vindo, ${user.name.split(' ')[0]}! 👋`, 'success');
    setTimeout(() => animateBars(), 800);
  });
}

function handleLogout() {
  document.getElementById('app').classList.remove('visible');
  document.getElementById('app').style.opacity = '0';
  currentUser = null;
  setTimeout(() => {
    document.getElementById('app').classList.remove('visible');
    document.getElementById('login-screen').classList.remove('hidden');
    document.getElementById('login-email').value = '';
    document.getElementById('login-pass').value = '';
    ['login-email','login-pass'].forEach(id => {
      const el = document.getElementById(id);
      el.classList.remove('error','success');
    });
  }, 500);
}

// ------- NAVIGATION --------
function navigateTo(page) {
  currentPage = page;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const pageEl = document.getElementById(`page-${page}`);
  if (pageEl) pageEl.classList.add('active');
  const navEl = document.querySelector(`.nav-item[onclick="navigateTo('${page}')"]`);
  if (navEl) navEl.classList.add('active');

  // Sync bottom nav
  document.querySelectorAll('.bottom-nav-item').forEach(b => b.classList.remove('active'));
  const bnavMap = { dashboard:'bnav-dashboard', items:'bnav-items', stats:'bnav-stats', settings:'bnav-settings' };
  if (bnavMap[page]) document.getElementById(bnavMap[page])?.classList.add('active');

  const titles = {
    dashboard: 'Dashboard <span>· Visão Geral</span>',
    items: 'Itens <span>· Todos os Registros</span>',
    found: 'Achados <span>· Itens Encontrados</span>',
    lost: 'Perdidos <span>· Itens Procurados</span>',
    delivered: 'Devoluções <span>· Histórico</span>',
    stats: 'Estatísticas <span>· Análise</span>',
    activity: 'Atividade <span>· Feed Recente</span>',
    settings: 'Configurações <span>· Sistema</span>',
  };
  document.getElementById('topbar-title').innerHTML = titles[page] || 'SIAPE';
  closeSidebar();
  if (page === 'stats' || page === 'activity') setTimeout(() => animateBars(), 200);
  if (page === 'items') renderItemsTable();
  if (page === 'found') renderFoundTable();
  if (page === 'lost') renderLostTable();
  if (page === 'delivered') renderDeliveredTable();
  if (page === 'activity') renderActivity();
  // scroll to top on mobile
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('show');
}

// ------- RENDER HELPERS --------
function categoryBadge(cat) {
  const labels = { eletronicos:'Eletrônicos', vestuario:'Vestuário', documentos:'Documentos', acessorios:'Acessórios', outros:'Outros' };
  return `<span class="item-category ${cat}">${labels[cat] || cat}</span>`;
}

function statusBadge(status) {
  const labels = { aguardando:'Aguardando', devolvido:'Devolvido', cadastrado:'Cadastrado' };
  return `<span class="item-status ${status}"><span class="item-status-dot"></span>${labels[status] || status}</span>`;
}

function formatDate(d) {
  if (!d) return '-';
  const [y, m, day] = d.split('-');
  return `${day}/${m}/${y}`;
}

function itemRow(item, showLocal = true) {
  return `<tr data-id="${item.id}" data-search="${item.name.toLowerCase()} ${item.category} ${item.local.toLowerCase()} ${item.status}">
    <td class="item-name">${item.name}</td>
    <td>${categoryBadge(item.category)}</td>
    ${showLocal ? `<td>${item.local}</td>` : ''}
    <td>${formatDate(item.date)}</td>
    <td>${statusBadge(item.status)}</td>
    <td>
      <div class="item-actions">
        <button class="item-action-btn view" onclick="viewItem(${item.id})">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
          Ver
        </button>
        ${item.status !== 'devolvido' ? `<button class="item-action-btn deliver" onclick="deliverItem(${item.id})">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          Devolver
        </button>` : ''}
        <button class="item-action-btn delete" onclick="deleteItem(${item.id})">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
        </button>
      </div>
    </td>
  </tr>`;
}

function renderAll() {
  renderDashTable();
  renderItemsTable();
  renderFoundTable();
  renderLostTable();
  renderDeliveredTable();
  renderActivity();
  updateBadges();
}

// Build a mobile card for an item
function itemCard(item) {
  const catLabels = { eletronicos:'Eletrônicos', vestuario:'Vestuário', documentos:'Documentos', acessorios:'Acessórios', outros:'Outros' };
  const deliverBtn = item.status !== 'devolvido'
    ? `<button class="item-action-btn deliver" onclick="deliverItem(${item.id})">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>Devolver
       </button>` : '';
  return `<div class="item-card ${item.type}" onclick="viewItem(${item.id})">
    <div class="item-card-top">
      <div class="item-card-name">${item.name}</div>
      <div>${statusBadge(item.status)}</div>
    </div>
    <div class="item-card-meta">
      ${categoryBadge(item.category)}
      <div class="item-card-detail">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
        ${item.local}
      </div>
      <div class="item-card-detail">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>
        ${formatDate(item.date)}
      </div>
    </div>
    <div class="item-card-actions" onclick="event.stopPropagation()">
      <button class="item-action-btn view" onclick="viewItem(${item.id})">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>Detalhes
      </button>
      ${deliverBtn}
      <button class="item-action-btn delete" onclick="event.stopPropagation();deleteItem(${item.id})">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
      </button>
    </div>
  </div>`;
}

function emptyCard() {
  return `<div style="padding:40px 20px;text-align:center;color:var(--text-dim);">
    <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40" style="margin:0 auto 10px;display:block;opacity:0.25;"><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
    <p style="font-size:0.85rem;">Nenhum item encontrado</p>
  </div>`;
}

function renderDashTable() {
  const recent = [...items].sort((a,b) => b.id - a.id).slice(0, 8);
  document.getElementById('dash-table-body').innerHTML = recent.map(i => itemRow(i)).join('');
  const cards = document.getElementById('dash-cards');
  if (cards) cards.innerHTML = recent.length ? recent.map(itemCard).join('') : emptyCard();
}

function renderItemsTable(filter = 'all', search = '') {
  let filtered = items;
  if (filter !== 'all') filtered = filtered.filter(i => i.status === filter);
  if (search) filtered = filtered.filter(i =>
    i.name.toLowerCase().includes(search) || i.local.toLowerCase().includes(search) ||
    i.category.includes(search) || i.status.includes(search)
  );
  document.getElementById('items-table-body').innerHTML = filtered.length ? filtered.map(i => itemRow(i)).join('') : emptyState();
  const cards = document.getElementById('items-cards');
  if (cards) cards.innerHTML = filtered.length ? filtered.map(itemCard).join('') : emptyCard();
  document.getElementById('items-count-text').textContent = filtered.length;
}

function renderFoundTable(catFilter = 'all', search = '') {
  let filtered = items.filter(i => i.type === 'achado');
  if (catFilter !== 'all') filtered = filtered.filter(i => i.category === catFilter);
  if (search) filtered = filtered.filter(i => i.name.toLowerCase().includes(search) || i.local.toLowerCase().includes(search));
  document.getElementById('found-table-body').innerHTML = filtered.length ? filtered.map(i => itemRow(i)).join('') : emptyState();
  const cards = document.getElementById('found-cards');
  if (cards) cards.innerHTML = filtered.length ? filtered.map(itemCard).join('') : emptyCard();
  document.getElementById('found-count').textContent = filtered.length;
}

function renderLostTable() {
  const lost = items.filter(i => i.type === 'perdido');
  document.getElementById('lost-table-body').innerHTML = lost.length ? lost.map(i => itemRow(i)).join('') : emptyState();
  const cards = document.getElementById('lost-cards');
  if (cards) cards.innerHTML = lost.length ? lost.map(itemCard).join('') : emptyCard();
  document.getElementById('lost-count').textContent = lost.length;
}

function renderDeliveredTable() {
  const delivered = items.filter(i => i.status === 'devolvido');
  const tableRows = delivered.map(i => `<tr>
    <td class="item-name">${i.name}</td>
    <td>${categoryBadge(i.category)}</td>
    <td>${i.by}</td>
    <td>${formatDate(i.date)}</td>
    <td>${statusBadge(i.status)}</td>
    <td>
      <div class="item-actions">
        <button class="item-action-btn view" onclick="viewItem(${i.id})">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>Ver
        </button>
      </div>
    </td>
  </tr>`);
  document.getElementById('delivered-table-body').innerHTML = delivered.length ? tableRows.join('') : emptyState();
  const cards = document.getElementById('delivered-cards');
  if (cards) cards.innerHTML = delivered.length ? delivered.map(itemCard).join('') : emptyCard();
  document.getElementById('delivered-count').textContent = delivered.length;
}

function renderActivity() {
  const feed = document.getElementById('activity-feed');
  feed.innerHTML = activities.map((a, i) => `
    <div class="activity-item">
      <div class="activity-timeline">
        <div class="activity-dot" style="background:${a.color};box-shadow:0 0 8px ${a.color}"></div>
        ${i < activities.length - 1 ? '<div class="activity-line"></div>' : ''}
      </div>
      <div class="activity-content">
        <div class="activity-text">${a.text}</div>
        <div class="activity-time">${a.time}</div>
      </div>
    </div>
  `).join('');
}

function emptyState() {
  return `<tr><td colspan="6">
    <div class="items-empty">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>
      <p>Nenhum item encontrado</p>
    </div>
  </td></tr>`;
}

function updateBadges() {
  document.getElementById('badge-items').textContent = items.length;
  document.getElementById('badge-found').textContent = items.filter(i => i.type === 'achado').length;
  document.getElementById('badge-lost').textContent = items.filter(i => i.type === 'perdido').length;
  const bnavBadge = document.getElementById('bnav-badge');
  if (bnavBadge) bnavBadge.textContent = items.length;
}

// ------- METRICS ANIMATION --------
function animateMetrics() {
  const total = items.length;
  const waiting = items.filter(i => i.status === 'aguardando').length;
  const today = items.filter(i => i.status === 'devolvido').length;
  const rate = Math.round((items.filter(i => i.status === 'devolvido').length / total) * 100);

  animateNumber('metric-total', total);
  animateNumber('metric-waiting', waiting);
  animateNumber('metric-today', today);
  animateValue('metric-rate', rate + '%');

  setTimeout(() => {
    document.getElementById('bar-total').style.width = `${(total/30)*100}%`;
    document.getElementById('bar-waiting').style.width = `${(waiting/total)*100}%`;
    document.getElementById('bar-today').style.width = `${(today/total)*100}%`;
    document.getElementById('bar-rate').style.width = `${rate}%`;
  }, 200);
}

function animateNumber(id, target) {
  const el = document.getElementById(id);
  let current = 0;
  const step = target / 40;
  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.round(current);
    if (current >= target) clearInterval(interval);
  }, 30);
}

function animateValue(id, val) {
  setTimeout(() => { document.getElementById(id).textContent = val; }, 600);
}

function animateBars() {
  document.querySelectorAll('.bar-fill[data-width]').forEach(bar => {
    bar.style.width = bar.dataset.width;
  });
}

// ------- FILTERS --------
let allFilter = 'all';
let foundFilter = 'all';

function filterAll(filter, btn) {
  allFilter = filter;
  document.querySelectorAll('#page-items .filter-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  renderItemsTable(filter, document.getElementById('items-search').value.toLowerCase());
}

function filterItems(search) {
  renderItemsTable(allFilter, search.toLowerCase());
}

function filterFound(filter, btn) {
  foundFilter = filter;
  document.querySelectorAll('#page-found .filter-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  renderFoundTable(filter);
}

function filterFoundItems(search) {
  renderFoundTable(foundFilter, search.toLowerCase());
}

// Show/hide mobile dashboard search bar based on viewport
function handleMobileSearchBar() {
  const bar = document.querySelector('#page-dashboard .mobile-search-bar');
  if (!bar) return;
  bar.style.display = window.innerWidth <= 480 ? 'block' : 'none';
}
window.addEventListener('resize', handleMobileSearchBar);
handleMobileSearchBar();

function globalSearch(val) {
  const v = val.toLowerCase();
  const filtered = v
    ? items.filter(i => i.name.toLowerCase().includes(v) || i.local.toLowerCase().includes(v) || i.category.includes(v))
    : [...items].sort((a,b) => b.id - a.id).slice(0, 8);
  document.getElementById('dash-table-body').innerHTML = filtered.length ? filtered.map(i => itemRow(i)).join('') : emptyState();
  const cards = document.getElementById('dash-cards');
  if (cards) cards.innerHTML = filtered.length ? filtered.map(itemCard).join('') : emptyCard();
}

// ------- MODALS --------
function openAddModal(type = 'achado') {
  document.getElementById('modal-item-type').value = type;
  document.getElementById('modal-title').textContent = type === 'achado' ? 'Registrar Achado' : type === 'perdido' ? 'Registrar Perda' : 'Cadastrar Novo Item';
  document.getElementById('modal-item-name').value = '';
  document.getElementById('modal-item-local').value = '';
  document.getElementById('modal-item-desc').value = '';
  document.getElementById('modal-item-by').value = currentUser ? currentUser.name : '';
  document.getElementById('add-modal').classList.add('show');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('show');
}

function saveItem() {
  const name = document.getElementById('modal-item-name').value.trim();
  const type = document.getElementById('modal-item-type').value;
  const cat = document.getElementById('modal-item-cat').value;
  const local = document.getElementById('modal-item-local').value.trim();
  const date = document.getElementById('modal-item-date').value;
  const by = document.getElementById('modal-item-by').value.trim() || (currentUser ? currentUser.name : 'Sistema');
  const desc = document.getElementById('modal-item-desc').value.trim();

  if (!name || !local) { showToast('Preencha os campos obrigatórios', 'warning'); return; }

  const newItem = {
    id: items.length + 1,
    name, type, category: cat, local, date: date || new Date().toISOString().split('T')[0],
    status: type === 'perdido' ? 'cadastrado' : 'aguardando',
    by: by || 'Sistema', desc
  };
  items.unshift(newItem);
  activities.unshift({ text: `<strong>${name}</strong> foi ${type === 'achado' ? 'cadastrado como achado' : 'registrado como perdido'}`, time: 'Agora mesmo', color: type === 'achado' ? 'var(--accent)' : 'var(--accent2)', type });
  closeModal('add-modal');
  renderAll();
  animateMetrics();
  showToast(`Item "${name}" cadastrado com sucesso!`, 'success');
}

function viewItem(id) {
  const item = items.find(i => i.id === id);
  if (!item) return;
  selectedItemId = id;
  const catLabels = { eletronicos:'Eletrônicos', vestuario:'Vestuário', documentos:'Documentos', acessorios:'Acessórios', outros:'Outros' };
  const statusLabels = { aguardando:'Aguardando Retirada', devolvido:'Devolvido', cadastrado:'Cadastrado' };
  const typeLabels = { achado:'Achado', perdido:'Perdido' };
  document.getElementById('detail-modal-body').innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;padding:14px;background:rgba(108,99,255,0.08);border-radius:12px;border:1px solid rgba(108,99,255,0.15);">
      <div style="width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z"/></svg>
      </div>
      <div>
        <div style="font-weight:700;font-size:1rem;color:var(--text);">${item.name}</div>
        <div style="font-size:0.78rem;color:var(--text-muted);">Código #${String(item.id).padStart(4, '0')} · ${typeLabels[item.type]}</div>
      </div>
      <div style="margin-left:auto;">${statusBadge(item.status)}</div>
    </div>
    <div class="detail-grid">
      <div class="detail-field">
        <div class="detail-field-label">Categoria</div>
        <div class="detail-field-value">${categoryBadge(item.category)}</div>
      </div>
      <div class="detail-field">
        <div class="detail-field-label">Tipo</div>
        <div class="detail-field-value">${typeLabels[item.type]}</div>
      </div>
      <div class="detail-field">
        <div class="detail-field-label">Local</div>
        <div class="detail-field-value">${item.local}</div>
      </div>
      <div class="detail-field">
        <div class="detail-field-label">Data de Registro</div>
        <div class="detail-field-value">${formatDate(item.date)}</div>
      </div>
      <div class="detail-field">
        <div class="detail-field-label">Registrado por</div>
        <div class="detail-field-value">${item.by}</div>
      </div>
      <div class="detail-field">
        <div class="detail-field-label">Status</div>
        <div class="detail-field-value">${statusLabels[item.status]}</div>
      </div>
    </div>
    ${item.desc ? `<div class="detail-separator"></div>
    <div class="detail-field">
      <div class="detail-field-label">Descrição</div>
      <div class="detail-field-value" style="line-height:1.6;">${item.desc}</div>
    </div>` : ''}
  `;
  const deliverBtn = document.getElementById('detail-deliver-btn');
  deliverBtn.style.display = item.status === 'devolvido' ? 'none' : 'flex';
  document.getElementById('detail-modal').classList.add('show');
}

function deliverFromDetail() {
  if (selectedItemId) {
    deliverItem(selectedItemId);
    closeModal('detail-modal');
  }
}

function deliverItem(id) {
  const item = items.find(i => i.id === id);
  if (!item) return;
  if (item.status === 'devolvido') { showToast('Item já foi devolvido', 'info'); return; }
  item.status = 'devolvido';
  activities.unshift({ text: `<strong>${item.name}</strong> foi marcado como devolvido`, time: 'Agora mesmo', color: 'var(--accent)', type: 'deliver' });
  renderAll();
  animateMetrics();
  showToast(`"${item.name}" marcado como devolvido!`, 'success');
}

function deleteItem(id) {
  const item = items.find(i => i.id === id);
  if (!item) return;
  if (!confirm(`Deseja realmente excluir "${item.name}"?`)) return;
  items = items.filter(i => i.id !== id);
  renderAll();
  animateMetrics();
  showToast(`Item "${item.name}" removido`, 'info');
}

// ------- TOAST --------
function showToast(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  const icons = {
    success: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',
    error: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',
    warning: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>',
  };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<div class="toast-icon">${icons[type]}</div><span>${msg}</span><div class="toast-progress"></div>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, 3300);
}

// ------- MOBILE TOPBAR SEARCH --------
let mobileSearchOpen = false;
function toggleMobileTopbarSearch() {
  const searchEl = document.getElementById('topbar-search');
  const bar = searchEl?.closest('.topbar-search');
  if (!bar) return;
  mobileSearchOpen = !mobileSearchOpen;
  if (mobileSearchOpen) {
    bar.style.display = 'block';
    bar.style.position = 'absolute';
    bar.style.left = '12px'; bar.style.right = '12px';
    bar.style.top = '8px'; bar.style.maxWidth = 'none';
    bar.style.zIndex = '10';
    searchEl.focus();
  } else {
    bar.style.display = '';
    bar.style.position = '';
    bar.style.left = ''; bar.style.right = '';
    bar.style.top = ''; bar.style.maxWidth = '';
    bar.style.zIndex = '';
  }
}

function handleSearchBtnVisibility() {
  const btn = document.getElementById('topbar-search-btn');
  if (btn) btn.style.display = window.innerWidth <= 768 ? 'flex' : 'none';
}
window.addEventListener('resize', handleSearchBtnVisibility);
handleSearchBtnVisibility();

// ------- RESPONSIVE ACTIVITY LAYOUT --------
function checkLayout() {
  const layout = document.querySelector('.activity-layout');
  if (layout) {
    layout.style.gridTemplateColumns = window.innerWidth < 768 ? '1fr' : '1fr 1fr';
  }
}
window.addEventListener('resize', checkLayout);
checkLayout();

// ------- INIT --------
// Set today's date in modal by default
document.addEventListener('DOMContentLoaded', () => {
  const dateInput = document.getElementById('modal-item-date');
  if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
});

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.remove('show');
  });
});

// Keyboard shortcuts
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.show').forEach(m => m.classList.remove('show'));
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    document.getElementById('topbar-search')?.focus();
  }
});

