// @ts-nocheck
/* eslint-disable */
// Porte fiel do site aprovado do Grupo ZKF. A marcação é estática; o comportamento é o
// script original, executado após a montagem com listeners removidos na desmontagem.
import { useEffect } from "react";

function iniciar(signal) {
  var FONE = '5516988014617';
  var SAUDACAO = 'Olá, gostaria de falar com o Grupo ZKF.';
  function wa(msg) {
    return 'https://api.whatsapp.com/send?phone=' + FONE + '&text=' + encodeURIComponent(msg);
  }
  function lista(itens) {
    if (itens.length < 2) return itens.join('');
    return itens.slice(0, -1).join(', ') + ' e ' + itens[itens.length - 1];
  }
  function $$(sel, raiz) { return Array.prototype.slice.call((raiz || document).querySelectorAll(sel)); }

  /* links de WhatsApp: cada um já sai com a mensagem do seu assunto */
  $$('a[data-wa]').forEach(function (a) { a.href = wa(SAUDACAO); });
  $$('[data-assunto]').forEach(function (el) {
    var a = el.querySelector('a');
    if (a) a.href = wa('Olá, gostaria de falar sobre ' + el.dataset.assunto + '.');
  });
  $$('[data-assunto-direto]').forEach(function (a) {
    a.href = wa('Olá, gostaria de falar sobre ' + a.dataset.assuntoDireto + '.');
  });
  $$('[data-pessoa]').forEach(function (el) {
    el.querySelector('a').href = wa('Olá, gostaria de falar com ' + el.dataset.pessoa + '.');
  });

  /* topo, botão flutuante e seção atual */
  var topo = document.getElementById('topo');
  var flutuante = document.querySelector('.flutuante');
  var empresas = $$('.empresa');
  var secoes = ['store', 'engenharia', 'tecnologia', 'socios', 'contato'].map(function (id) { return document.getElementById(id); });
  var linksSecao = $$('.nav a, .trilha a');
  var atual = null;

  function aoRolar() {
    var y = window.scrollY, h = window.innerHeight;
    topo.classList.toggle('rolou', y > 8);
    flutuante.classList.toggle('visivel', y > h * 0.6);

    var linha = h * 0.35, achada = null;
    secoes.forEach(function (s) { if (s.getBoundingClientRect().top <= linha) achada = s; });
    var ultima = secoes[secoes.length - 1];
    if (achada && achada !== ultima && achada.getBoundingClientRect().bottom < linha) achada = null;
    var id = achada ? achada.id : null;
    if (id !== atual) {
      atual = id;
      linksSecao.forEach(function (a) {
        if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    }
    var primeira = empresas[0].getBoundingClientRect(), fim = empresas[empresas.length - 1].getBoundingClientRect();
    topo.classList.toggle('na-empresa', primeira.top < linha && fim.bottom > linha);
  }
  aoRolar();
  window.addEventListener('scroll', aoRolar, { passive: true, signal: signal });
  window.addEventListener('resize', aoRolar, { signal: signal });

  /* menu no celular */
  var menuBtn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');
  function fecharMenu() {
    menu.classList.remove('aberto');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.textContent = 'Menu';
  }
  menuBtn.addEventListener('click', function () {
    var abrir = !menu.classList.contains('aberto');
    menu.classList.toggle('aberto', abrir);
    menuBtn.setAttribute('aria-expanded', String(abrir));
    menuBtn.textContent = abrir ? 'Fechar' : 'Menu';
  }, { signal: signal });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) fecharMenu(); }, { signal: signal });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('aberto')) { fecharMenu(); menuBtn.focus(); }
  }, { signal: signal });
  document.addEventListener('click', function (e) {
    if (menu.classList.contains('aberto') && !e.target.closest('.topo')) fecharMenu();
  }, { signal: signal });

  /* contato: monta a mensagem com o nome e os assuntos marcados */
  var form = document.getElementById('montar');
  var nome = document.getElementById('nome');
  var caixaGrupos = document.getElementById('grupos-chips');
  var previa = document.getElementById('previa');
  var enviar = document.getElementById('enviar');
  var limpar = document.getElementById('limpar');
  var itens = $$('[data-assunto]');
  caixaGrupos.innerHTML = '';
  var marcados = [];

  function mensagem() {
    var n = nome.value.trim().replace(/\s+/g, ' ').slice(0, 60);
    var assuntos = itens.filter(function (el) { return marcados.indexOf(el) > -1; })
                        .map(function (el) { return el.dataset.assunto; });
    var abre = n ? 'Olá, meu nome é ' + n + '. ' : 'Olá, ';
    if (!assuntos.length) return n ? abre + 'Gostaria de falar com o Grupo ZKF.' : SAUDACAO;
    return abre + (n ? 'Gostaria' : 'gostaria') + ' de falar sobre ' + lista(assuntos) + '.';
  }
  function atualizar() {
    var msg = mensagem();
    previa.textContent = msg;
    enviar.href = wa(msg);
    limpar.hidden = marcados.length === 0;
  }

  empresas.forEach(function (secao) {
    var doGrupo = $$('[data-assunto]', secao);
    if (!doGrupo.length) return;
    var bloco = document.createElement('div');
    bloco.className = 'grupo-chips ' + (secao.className.match(/c-\w+/) || [''])[0];
    var titulo = document.createElement('h3');
    titulo.textContent = secao.dataset.empresa;
    var chips = document.createElement('div');
    chips.className = 'chips';
    chips.setAttribute('role', 'group');
    chips.setAttribute('aria-label', secao.dataset.empresa);
    doGrupo.forEach(function (el) {
      var chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chip';
      chip.textContent = el.dataset.curto;
      chip.setAttribute('aria-pressed', 'false');
      chip.addEventListener('click', function () {
        var i = marcados.indexOf(el);
        if (i > -1) marcados.splice(i, 1); else marcados.push(el);
        chip.setAttribute('aria-pressed', String(i === -1));
        atualizar();
      }, { signal: signal });
      el._chip = chip;
      chips.appendChild(chip);
    });
    bloco.appendChild(titulo);
    bloco.appendChild(chips);
    caixaGrupos.appendChild(bloco);
  });

  nome.addEventListener('input', atualizar, { signal: signal });
  limpar.addEventListener('click', function () {
    marcados.forEach(function (el) { el._chip.setAttribute('aria-pressed', 'false'); });
    marcados = [];
    atualizar();
  }, { signal: signal });
  form.addEventListener('submit', function (e) { e.preventDefault(); window.open(enviar.href, '_blank', 'noopener'); }, { signal: signal });
  atualizar();
}

export function Site() {
  useEffect(() => {
    const ctrl = new AbortController();
    iniciar(ctrl.signal);
    return () => ctrl.abort();
  }, []);
  return (
    <>



<svg className="defs" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="g-verde" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="150" y2="110" spreadMethod="reflect">
      <stop offset="0" stopColor="#056A45" /><stop offset=".3" stopColor="#0F9F6F" /><stop offset=".5" stopColor="#7AF2C4" /><stop offset=".7" stopColor="#0F9F6F" /><stop offset="1" stopColor="#056A45" />
    </linearGradient>
    <linearGradient id="g-azul" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="150" y2="110" spreadMethod="reflect">
      <stop offset="0" stopColor="#0A1560" /><stop offset=".3" stopColor="#1B2EA3" /><stop offset=".5" stopColor="#7C8DF5" /><stop offset=".7" stopColor="#1B2EA3" /><stop offset="1" stopColor="#0A1560" />
    </linearGradient>
    <linearGradient id="g-verde-neg" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="150" y2="110" spreadMethod="reflect">
      <stop offset="0" stopColor="#0B8A5C" /><stop offset=".3" stopColor="#16B985" /><stop offset=".5" stopColor="#9BFAD6" /><stop offset=".7" stopColor="#16B985" /><stop offset="1" stopColor="#0B8A5C" />
    </linearGradient>
    <linearGradient id="g-prata" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="150" y2="110" spreadMethod="reflect">
      <stop offset="0" stopColor="#9AA3BF" /><stop offset=".3" stopColor="#E4E8F3" /><stop offset=".5" stopColor="#FFFFFF" /><stop offset=".7" stopColor="#E4E8F3" /><stop offset="1" stopColor="#9AA3BF" />
    </linearGradient>
    <linearGradient id="g-reflexo" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#fff" stopOpacity=".35" /><stop offset=".45" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".12" />
    </linearGradient>
    <linearGradient id="g-brilho" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".75" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
    </linearGradient>
    <g id="fv">
      <polygon points="116.5,0 77,67 156,67" />
      <polygon transform="translate(288 18)" points="0,0 95,0 95,18 38,98 95,98 95,116 0,116 0,98 57,18 0,18" />
      <polygon transform="translate(513 18)" points="0,0 81,0 71,20 24,20 24,48 66,48 56,68 24,68 24,116 0,116" />
    </g>
    <g id="fa">
      <polygon points="0,201 72,78 103,78 103,201" />
      <polygon points="131,78 161,78 233,201 131,201" />
      <polygon transform="translate(401 18)" points="0,0 24,0 24,116 0,116" />
      <polygon transform="translate(401 18)" points="68,0 93,0 58,58 93,116 68,116 33,58" />
    </g>
    <g id="grupo" transform="translate(288 155)" fill="none" strokeWidth="4.4">
      <path d="M15.2 3.4A7 7 0 1 0 16 9.5H9.5" />
      <path d="M70 18V2.2h7.8a4.4 4.4 0 0 1 0 8.8H70M77.4 11l6.6 7" />
      <path d="M145.2 0v10.6a5.8 5.8 0 0 0 11.6 0V0" />
      <path d="M220.2 18V2.2h7.4a4.6 4.6 0 0 1 0 9.2h-7.4" />
      <circle cx="297" cy="9" r="6.8" />
    </g>
    <clipPath id="corte-simbolo">
      <polygon points="116.5,0 77,67 156,67" />
      <polygon points="0,201 72,78 103,78 103,201" />
      <polygon points="131,78 161,78 233,201 131,201" />
    </clipPath>
  </defs>
  <symbol id="logo" viewBox="0 0 594 201">
    <use href="#fv" fill="url(#g-verde)" /><use href="#fa" fill="url(#g-azul)" />
    <use href="#fv" fill="url(#g-reflexo)" /><use href="#fa" fill="url(#g-reflexo)" />
    <use href="#grupo" stroke="url(#g-azul)" />
  </symbol>
  <symbol id="logo-neg" viewBox="0 0 594 201">
    <use href="#fv" fill="url(#g-verde-neg)" /><use href="#fa" fill="url(#g-prata)" />
    <use href="#fv" fill="url(#g-reflexo)" /><use href="#fa" fill="url(#g-reflexo)" />
    <use href="#grupo" stroke="url(#g-prata)" />
  </symbol>
  <symbol id="i-whats" viewBox="0 0 24 24"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></symbol>
</svg>

<a className="pular" href="#conteudo">Pular para o conteúdo</a>

<header className="topo" id="topo">
  <div className="caixa topo__dentro">
    <a className="marca" href="#inicio" aria-label="Grupo ZKF, voltar ao início">
      <svg viewBox="0 0 594 201" aria-hidden="true"><use href="#logo" /></svg>
    </a>
    <nav className="nav" id="menu" aria-label="Seções do site">
      <ul>
        <li className="c-store"><a href="#store">Store</a></li>
        <li className="c-eng"><a href="#engenharia">Engenharia</a></li>
        <li className="c-tec"><a href="#tecnologia">Tecnologia</a></li>
        <li><a href="#socios">Sócios</a></li>
        <li><a href="#contato">Contato</a></li>
      </ul>
    </nav>
    <a className="btn btn--pequeno" data-wa="" href="https://api.whatsapp.com/send?phone=5516988014617" target="_blank" rel="noopener">
      <svg aria-hidden="true"><use href="#i-whats" /></svg>Falar no WhatsApp
    </a>
    <button className="menu-btn" type="button" aria-expanded="false" aria-controls="menu">Menu</button>
  </div>
  <nav className="trilha" aria-label="Empresas do grupo">
    <a className="c-store" href="#store">Store</a>
    <a className="c-eng" href="#engenharia">Engenharia</a>
    <a className="c-tec" href="#tecnologia">Tecnologia</a>
  </nav>
</header>

<main id="conteudo">

  <section className="caixa abertura" id="inicio" aria-labelledby="titulo-inicio">
    <div className="abertura__topo">
      <div className="abertura__texto">
        <h1 id="titulo-inicio">Loja, engenharia e tecnologia num só grupo.</h1>
        <p>O Grupo ZKF reúne três empresas: a ZKF Store, a ZKF Engenharia e a ZKF Tecnologia. Escolha uma delas abaixo para ver o que faz e falar direto com a equipe.</p>
        <div className="acoes">
          <a className="btn" data-wa="" href="https://api.whatsapp.com/send?phone=5516988014617" target="_blank" rel="noopener">
            <svg aria-hidden="true"><use href="#i-whats" /></svg>Falar no WhatsApp
          </a>
          <a className="link" href="#socios">Conhecer os sócios</a>
        </div>
      </div>
      <svg className="abertura__simbolo" viewBox="0 0 233 201" aria-hidden="true">
        <use href="#fv" fill="url(#g-verde)" /><use href="#fa" fill="url(#g-azul)" />
        <use href="#fv" fill="url(#g-reflexo)" /><use href="#fa" fill="url(#g-reflexo)" />
        <g clipPath="url(#corte-simbolo)"><rect className="brilho" x="0" y="-10" width="90" height="221" fill="url(#g-brilho)" /></g>
      </svg>
    </div>

    <div className="organo" aria-label="Estrutura do Grupo ZKF">
      <div className="organo__raiz">
        <strong>Grupo ZKF</strong>
        <span>Zordan, Kurihara e Figueiredo</span>
      </div>
      <ul className="organo__ramos">
        <li className="ramo c-store">
          <a href="#store">
            <h2>ZKF Store</h2>
            <p>A loja online do grupo.</p>
            <ul><li>E-commerce</li></ul>
            <span className="ramo__ir">Ver a ZKF Store</span>
          </a>
        </li>
        <li className="ramo c-eng">
          <a href="#engenharia">
            <h2>ZKF Engenharia</h2>
            <p>Do projeto à obra, em cinco linhas de construção.</p>
            <ul>
              <li>ZKF Projetos</li>
              <li>Loteamento, Industrial, Comercial, Casa Alto Padrão e Lofts</li>
            </ul>
            <span className="ramo__ir">Ver a ZKF Engenharia</span>
          </a>
        </li>
        <li className="ramo c-tec">
          <a href="#tecnologia">
            <h2>ZKF Tecnologia</h2>
            <p>Desenvolve a Playzo, plataforma para o esporte.</p>
            <ul>
              <li>Playzo<small>Academias, torneios, centros esportivos, cursos, rede social do atleta e IA</small></li>
            </ul>
            <span className="ramo__ir">Ver a ZKF Tecnologia</span>
          </a>
        </li>
      </ul>
    </div>
  </section>

  <section className="empresa c-store" id="store" data-empresa="ZKF Store" aria-labelledby="t-store">
    <div className="caixa">
      <div className="empresa__cab">
        <h2 className="empresa__nome" id="t-store">ZKF Store</h2>
        <p>A loja online do Grupo ZKF. As vendas são feitas pela internet, com a logística conduzida pelo próprio grupo.</p>
      </div>
      <ul className="unidades">
        <li className="unidade" data-assunto="a ZKF Store" data-curto="Loja online">
          <h3>E-commerce</h3>
          <p>Compras pela internet, com acompanhamento do pedido até a entrega.</p>
          <a className="wa-link" href="https://api.whatsapp.com/send?phone=5516988014617" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-whats" /></svg>Falar com a ZKF Store</a>
        </li>
      </ul>
    </div>
  </section>

  <section className="empresa c-eng" id="engenharia" data-empresa="ZKF Engenharia" aria-labelledby="t-eng">
    <div className="caixa">
      <div className="empresa__cab">
        <h2 className="empresa__nome" id="t-eng">ZKF Engenharia</h2>
        <p>Projetos e obras do loteamento à casa de alto padrão. A ZKF Projetos desenvolve os projetos, e cada linha de construção cuida de um tipo de empreendimento.</p>
      </div>
      <ul className="unidades">
        <li className="unidade unidade--base" data-assunto="a ZKF Projetos" data-curto="Projetos">
          <h3>ZKF Projetos<small>Atende todas as linhas</small></h3>
          <p>Desenvolvimento dos projetos de engenharia, do estudo inicial ao projeto que vai para a obra.</p>
          <a className="wa-link" href="https://api.whatsapp.com/send?phone=5516988014617" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-whats" /></svg>Falar sobre projetos</a>
        </li>
        <li className="unidade" data-assunto="a ZKF Loteamento" data-curto="Loteamento">
          <h3>ZKF Loteamento</h3>
          <p>Loteamentos com a infraestrutura pronta para construir.</p>
          <a className="wa-link" href="https://api.whatsapp.com/send?phone=5516988014617" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-whats" /></svg>Falar sobre loteamentos</a>
        </li>
        <li className="unidade" data-assunto="a ZKF Industrial" data-curto="Industrial">
          <h3>ZKF Industrial</h3>
          <p>Galpões e edificações para a indústria.</p>
          <a className="wa-link" href="https://api.whatsapp.com/send?phone=5516988014617" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-whats" /></svg>Falar sobre obras industriais</a>
        </li>
        <li className="unidade" data-assunto="a ZKF Comercial" data-curto="Comercial">
          <h3>ZKF Comercial</h3>
          <p>Lojas, salas e edificações comerciais.</p>
          <a className="wa-link" href="https://api.whatsapp.com/send?phone=5516988014617" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-whats" /></svg>Falar sobre obras comerciais</a>
        </li>
        <li className="unidade" data-assunto="a ZKF Casa Alto Padrão" data-curto="Casa alto padrão">
          <h3>ZKF Casa Alto Padrão</h3>
          <p>Residências de alto padrão, do projeto à entrega das chaves.</p>
          <a className="wa-link" href="https://api.whatsapp.com/send?phone=5516988014617" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-whats" /></svg>Falar sobre casas</a>
        </li>
        <li className="unidade" data-assunto="a ZKF Lofts" data-curto="Lofts">
          <h3>ZKF Lofts</h3>
          <p>Lofts para morar ou investir.</p>
          <a className="wa-link" href="https://api.whatsapp.com/send?phone=5516988014617" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-whats" /></svg>Falar sobre lofts</a>
        </li>
      </ul>
    </div>
  </section>

  <section className="empresa c-tec" id="tecnologia" data-empresa="ZKF Tecnologia" aria-labelledby="t-tec">
    <div className="caixa">
      <div className="empresa__cab">
        <h2 className="empresa__nome" id="t-tec">ZKF Tecnologia</h2>
        <p>A empresa de tecnologia do grupo. Seu produto é a Playzo, plataforma que reúne a gestão e a vida esportiva em um só lugar.</p>
      </div>
      <div className="playzo">
        <div className="playzo__cab">
          <div>
            <h3 className="playzo__nome">Playzo</h3>
            <p>Sete frentes numa mesma plataforma, para quem administra espaços esportivos e para quem pratica esporte.</p>
          </div>
        </div>
        <ul className="modulos">
          <li className="modulo" data-assunto="academias na Playzo" data-curto="Academias">
            <a href="https://api.whatsapp.com/send?phone=5516988014617" target="_blank" rel="noopener">
              <h4>Academias</h4><p>Gestão de academias pela plataforma.</p>
              <span><svg aria-hidden="true"><use href="#i-whats" /></svg>Saber mais</span>
            </a>
          </li>
          <li className="modulo" data-assunto="gestão de torneios na Playzo" data-curto="Torneios">
            <a href="https://api.whatsapp.com/send?phone=5516988014617" target="_blank" rel="noopener">
              <h4>Gestão de torneios</h4><p>Inscrições, tabelas e resultados de torneios.</p>
              <span><svg aria-hidden="true"><use href="#i-whats" /></svg>Saber mais</span>
            </a>
          </li>
          <li className="modulo" data-assunto="gestão de centros esportivos na Playzo" data-curto="Centros esportivos">
            <a href="https://api.whatsapp.com/send?phone=5516988014617" target="_blank" rel="noopener">
              <h4>Gestão de centros esportivos</h4><p>Quadras, horários e a rotina do centro esportivo.</p>
              <span><svg aria-hidden="true"><use href="#i-whats" /></svg>Saber mais</span>
            </a>
          </li>
          <li className="modulo" data-assunto="venda de cursos esportivos na Playzo" data-curto="Cursos esportivos">
            <a href="https://api.whatsapp.com/send?phone=5516988014617" target="_blank" rel="noopener">
              <h4>Venda de cursos esportivos</h4><p>Cursos e aulas de esporte vendidos pela plataforma.</p>
              <span><svg aria-hidden="true"><use href="#i-whats" /></svg>Saber mais</span>
            </a>
          </li>
          <li className="modulo" data-assunto="o e-commerce da Playzo" data-curto="E-commerce esportivo">
            <a href="https://api.whatsapp.com/send?phone=5516988014617" target="_blank" rel="noopener">
              <h4>E-commerce</h4><p>Loja online integrada à plataforma.</p>
              <span><svg aria-hidden="true"><use href="#i-whats" /></svg>Saber mais</span>
            </a>
          </li>
          <li className="modulo" data-assunto="a rede social do atleta na Playzo" data-curto="Rede social do atleta">
            <a href="https://api.whatsapp.com/send?phone=5516988014617" target="_blank" rel="noopener">
              <h4>Rede social do atleta</h4><p>Perfil, conquistas e contato entre atletas.</p>
              <span><svg aria-hidden="true"><use href="#i-whats" /></svg>Saber mais</span>
            </a>
          </li>
          <li className="modulo" data-assunto="inteligência artificial na Playzo" data-curto="Inteligência artificial">
            <a href="https://api.whatsapp.com/send?phone=5516988014617" target="_blank" rel="noopener">
              <h4>Inteligência artificial</h4><p>Recursos de IA aplicados à gestão e ao treino.</p>
              <span><svg aria-hidden="true"><use href="#i-whats" /></svg>Saber mais</span>
            </a>
          </li>
          <li className="modulo modulo--cta">
            <a data-assunto-direto="a Playzo" href="https://api.whatsapp.com/send?phone=5516988014617" target="_blank" rel="noopener">
              <h4>Quer usar a Playzo?</h4><p>Conte o que você precisa e a equipe mostra a plataforma.</p>
              <span><svg aria-hidden="true"><use href="#i-whats" /></svg>Falar sobre a Playzo</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <section className="socios" id="socios" aria-labelledby="t-socios">
    <div className="caixa">
      <div className="socios__cab">
        <h2 className="titulo" id="t-socios">Quem conduz o grupo</h2>
        <p>As letras ZKF são as iniciais dos três sócios. Cada um responde por uma parte do grupo: fale direto com quem cuida do seu assunto.</p>
      </div>
      <div className="socios__grade">
        <article className="socio" data-pessoa="Caio Zordan">
          <span className="socio__letra socio--verde" aria-hidden="true">Z</span>
          <h3>Caio Zordan</h3>
          <ul>
            <li>Engenharia</li>
            <li>Tecnologia</li>
            <li>Projetos</li>
            <li>Gestão logística do e-commerce</li>
          </ul>
          <a className="wa-link" href="https://api.whatsapp.com/send?phone=5516988014617" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-whats" /></svg>Falar com Caio</a>
        </article>
        <article className="socio" data-pessoa="Rodrigo Kurihara">
          <span className="socio__letra socio--azul" aria-hidden="true">K</span>
          <h3>Rodrigo Kurihara</h3>
          <ul>
            <li>Relacionamento bancário</li>
            <li>Novos negócios</li>
            <li>Negociações</li>
          </ul>
          <a className="wa-link" href="https://api.whatsapp.com/send?phone=5516988014617" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-whats" /></svg>Falar com Rodrigo Kurihara</a>
        </article>
        <article className="socio" data-pessoa="Rodrigo Figueiredo">
          <span className="socio__letra socio--verde" aria-hidden="true">F</span>
          <h3>Rodrigo Figueiredo</h3>
          <ul>
            <li>Administração</li>
            <li>Finanças</li>
            <li>Contratos</li>
          </ul>
          <a className="wa-link" href="https://api.whatsapp.com/send?phone=5516988014617" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-whats" /></svg>Falar com Rodrigo Figueiredo</a>
        </article>
      </div>
    </div>
  </section>

  <section className="contato" id="contato" aria-labelledby="t-contato">
    <div className="caixa">
      <h2 className="titulo" id="t-contato">Fale com o Grupo ZKF.</h2>
      <div className="contato__grade">
        <form className="montar" id="montar" noValidate>
          <div className="campo">
            <label htmlFor="nome">Seu nome <span>(opcional)</span></label>
            <input id="nome" name="nome" type="text" autoComplete="name" placeholder="Como podemos chamar você?" />
          </div>
          <fieldset>
            <legend>Sobre o que você quer falar?</legend>
            <p className="ajuda">Marque um ou mais assuntos. A mensagem do WhatsApp sai pronta.</p>
            <div id="grupos-chips"></div>
          </fieldset>
          <div className="previa-caixa">
            <small id="previa-rotulo">Mensagem que será enviada</small>
            <p className="previa" id="previa" aria-live="polite" aria-labelledby="previa-rotulo">Olá, gostaria de falar com o Grupo ZKF.</p>
          </div>
          <div className="enviar">
            <a className="btn btn--claro" id="enviar" href="https://api.whatsapp.com/send?phone=5516988014617" target="_blank" rel="noopener">
              <svg aria-hidden="true"><use href="#i-whats" /></svg>Enviar pelo WhatsApp
            </a>
            <button className="limpar" id="limpar" type="button" hidden>Limpar assuntos</button>
          </div>
        </form>
        <div className="dados">
          <div>
            <h3>WhatsApp</h3>
            <a data-wa="" href="https://api.whatsapp.com/send?phone=5516988014617" target="_blank" rel="noopener">(16) 98801-4617</a>
          </div>
          <div>
            <h3>Instagram</h3>
            <a href="https://www.instagram.com/grupokuriharaefigueiredo/" target="_blank" rel="noopener">@grupokuriharaefigueiredo</a>
          </div>
          <div>
            <h3>Onde estamos</h3>
            <p>Ribeirão Preto, SP<br />Morro Agudo, SP</p>
          </div>
        </div>
      </div>
    </div>
  </section>

</main>

<footer className="rodape">
  <div className="caixa rodape__dentro">
    <a className="marca" href="#inicio" aria-label="Grupo ZKF, voltar ao início">
      <svg viewBox="0 0 594 201" aria-hidden="true"><use href="#logo-neg" /></svg>
    </a>
    <ul>
      <li><a href="#store">ZKF Store</a></li>
      <li><a href="#engenharia">ZKF Engenharia</a></li>
      <li><a href="#tecnologia">ZKF Tecnologia</a></li>
      <li><a href="#socios">Sócios</a></li>
      <li><a href="https://www.instagram.com/grupokuriharaefigueiredo/" target="_blank" rel="noopener">Instagram</a></li>
    </ul>
    <small>© 2026 Grupo ZKF. Todos os direitos reservados.</small>
  </div>
</footer>

<a className="flutuante" data-wa="" href="https://api.whatsapp.com/send?phone=5516988014617" target="_blank" rel="noopener" aria-label="Falar com o Grupo ZKF no WhatsApp">
  <svg aria-hidden="true"><use href="#i-whats" /></svg>
</a>


    </>
  );
}
