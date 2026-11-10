import { Fragment, useEffect, useState } from "react";
import { AREAS, FRENTES, SAUDACAO, lista, wa } from "./dados";

const Whats = () => (
  <svg aria-hidden="true"><use href="#i-whats" /></svg>
);

function Simbolos() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <symbol id="i-whats" viewBox="0 0 24 24"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></symbol>
    </svg>
  );
}

function Marca() {
  return (
    <a className="marca" href="#inicio" aria-label="Grupo Kurihara & Figueiredo, voltar ao início">
      <span className="marca__barra" aria-hidden="true"></span>
      <span className="marca__texto" aria-hidden="true"><small>Grupo</small>Kurihara <i>&amp;</i><br />Figueiredo</span>
    </a>
  );
}

function Topo({ rolou }: { rolou: boolean }) {
  const [aberto, setAberto] = useState(false);
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setAberto(false); };
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, []);
  return (
    <header className={"topo" + (rolou ? " rolou" : "")} id="topo">
      <div className="caixa topo__dentro">
        <Marca />
        <nav className={"nav" + (aberto ? " aberto" : "")} id="menu" aria-label="Seções do site"
          onClick={(e) => { if ((e.target as HTMLElement).closest("a")) setAberto(false); }}>
          <ul>
            <li><a href="#grupo">O grupo</a></li>
            <li><a href="#areas">Áreas de atuação</a></li>
            <li><a href="#metodo">Como trabalhamos</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
        </nav>
        <a className="btn btn--pequeno" href={wa(SAUDACAO)} target="_blank" rel="noopener">
          <Whats />Falar no WhatsApp
        </a>
        <button className="menu-btn" type="button" aria-expanded={aberto} aria-controls="menu"
          onClick={() => setAberto(!aberto)}>{aberto ? "Fechar" : "Menu"}</button>
      </div>
    </header>
  );
}

function Abertura() {
  return (
    <section className="caixa abertura" id="inicio">
      <div className="abertura__titulo">
        <span className="abertura__barra" aria-hidden="true"></span>
        <h1>
          <span className="linha"><span>Jurídico</span></span>
          <span className="linha"><span><span className="amp">&amp;</span> contábil</span></span>
          <span className="linha"><span><span className="amp">&amp;</span> financeiro</span></span>
          <span className="linha"><span><span className="amp">&amp;</span> patrimonial.</span></span>
        </h1>
      </div>
      <div className="abertura__base">
        <p>O Grupo Kurihara &amp; Figueiredo é um conglomerado de empresas voltado à área jurídico-empresarial. Doze áreas de atuação que trabalham juntas para proteger e organizar o seu negócio.</p>
        <div className="abertura__acoes">
          <a className="btn" href={wa(SAUDACAO)} target="_blank" rel="noopener">
            <Whats />Falar no WhatsApp
          </a>
          <a className="link" href="#areas">Ver as áreas de atuação</a>
        </div>
      </div>
    </section>
  );
}

function Grupo() {
  return (
    <section className="secao escuro grupo" id="grupo">
      <div className="caixa grupo__grade">
        <h2>Um conglomerado de empresas voltado à área jurídico-empresarial.</h2>
        <div className="grupo__texto">
          <p>O Grupo Kurihara &amp; Figueiredo reúne empresas que atuam de forma complementar. O jurídico, o contábil, o financeiro e o patrimonial deixam de ser tratados por prestadores que não se falam e passam a trabalhar sobre o mesmo diagnóstico.</p>
          <p>Para quem dirige a empresa, isso significa informação que circula entre as áreas e decisões tomadas com a visão completa do negócio.</p>
          <p>Atendemos a partir de Ribeirão Preto e Morro Agudo, no interior de São Paulo.</p>
        </div>
      </div>
    </section>
  );
}

function Areas() {
  const [aberta, setAberta] = useState<number | null>(null);
  return (
    <section className="secao areas" id="areas">
      <div className="caixa">
        <div className="areas__cab">
          <h2 className="titulo">Áreas de atuação</h2>
          <p>Doze áreas, organizadas em quatro frentes. Abra uma área para ver o que ela cobre e falar com a equipe responsável.</p>
        </div>
        {FRENTES.map((f) => (
          <div className="frente" key={f.titulo}>
            <div className="frente__cab">
              <h3>{f.titulo}</h3>
              <p>{f.resumo}</p>
            </div>
            <ul>
              {f.areas.map((a) => {
                const on = aberta === a.id;
                return (
                  <li className={"area" + (on ? " aberta" : "")} data-msg={a.msg} data-curto={a.curto} key={a.id}>
                    <h4><button className="area__botao" type="button" id={"b" + a.id} aria-expanded={on} aria-controls={"p" + a.id}
                      onClick={() => setAberta(on ? null : a.id)}>
                      <span>{a.titulo}{a.leitor && <> <span className="so-leitor">{a.leitor}</span></>}</span><span className="mais" aria-hidden="true"></span>
                    </button></h4>
                    <div className="area__painel" id={"p" + a.id} role="region" aria-labelledby={"b" + a.id}><div>
                      <p>{a.texto}</p>
                      <a className="link link-wa" href={wa("Olá, gostaria de falar sobre " + a.msg + ".")} target="_blank" rel="noopener"><Whats />Falar sobre esta área no WhatsApp</a>
                    </div></div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

const PASSOS = [
  ["Diagnóstico", "Ouvimos a empresa e levantamos documentos, números e riscos antes de propor qualquer medida."],
  ["Estratégia", "Definimos o caminho com as áreas envolvidas, com prioridades, prazos e responsáveis."],
  ["Execução", "Cada empresa do grupo cuida da sua parte, de forma coordenada com as demais."],
  ["Acompanhamento", "Seguimos ao lado do cliente e revemos o plano conforme o negócio muda."],
];

function Metodo() {
  return (
    <section className="secao metodo" id="metodo">
      <div className="caixa">
        <div className="metodo__cab">
          <h2 className="titulo">Como trabalhamos</h2>
          <p>O atendimento segue o mesmo caminho em todas as áreas, do primeiro contato ao acompanhamento.</p>
        </div>
        <ol className="passos">
          {PASSOS.map(([t, p], i) => (
            <li className="passo" key={t}>
              <span className="passo__num" aria-hidden="true">{i + 1}</span>
              <h3>{t}</h3>
              <p>{p}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Contato() {
  const [marcadas, setMarcadas] = useState<number[]>([]);
  const nomes = AREAS.filter((a) => marcadas.includes(a.id)).map((a) => a.msg);
  const href = nomes.length ? wa("Olá, gostaria de falar sobre " + lista(nomes) + ".") : wa(SAUDACAO);
  return (
    <section className="secao escuro contato" id="contato">
      <div className="caixa">
        <h2>Fale com o grupo.</h2>
        <div className="contato__grade">
          <div className="montar">
            <p id="montar-ajuda">Marque as áreas do seu interesse e envie a mensagem pronta pelo WhatsApp. Se preferir, envie sem marcar nenhuma.</p>
            <div className="chips" id="chips" role="group" aria-labelledby="montar-ajuda">
              {AREAS.map((a) => {
                const on = marcadas.includes(a.id);
                return (
                  <button type="button" className="chip" aria-pressed={on} key={a.id}
                    onClick={() => setMarcadas(on ? marcadas.filter((x) => x !== a.id) : [...marcadas, a.id])}>{a.curto}</button>
                );
              })}
            </div>
            <p className="previa" id="previa" aria-live="polite">
              {nomes.length === 0 ? SAUDACAO : (
                <>
                  {"Olá, gostaria de falar sobre "}
                  {nomes.map((n, i) => (
                    <Fragment key={n}>{i > 0 && <>{" "}<span className="amp">&amp;</span>{" "}</>}{n}</Fragment>
                  ))}
                  {"."}
                </>
              )}
            </p>
            <a className="btn btn--claro" id="enviar" href={href} target="_blank" rel="noopener">
              <Whats />Enviar pelo WhatsApp
            </a>
          </div>
          <div className="dados">
            <div>
              <h3>WhatsApp</h3>
              <a href={wa(SAUDACAO)} target="_blank" rel="noopener">(16) 98801-4617</a>
            </div>
            <div>
              <h3>Instagram</h3>
              <a href="https://www.instagram.com/grupokuriharaefigueiredo/" target="_blank" rel="noopener">@grupokuriharaefigueiredo</a>
            </div>
            <div>
              <h3>Unidades</h3>
              <p>Ribeirão Preto, SP<br />Morro Agudo, SP</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Rodape() {
  return (
    <footer className="rodape escuro">
      <div className="caixa rodape__dentro">
        <Marca />
        <ul>
          <li><a href="#grupo">O grupo</a></li>
          <li><a href="#areas">Áreas de atuação</a></li>
          <li><a href="#metodo">Como trabalhamos</a></li>
          <li><a href="https://www.instagram.com/grupokuriharaefigueiredo/" target="_blank" rel="noopener">Instagram</a></li>
        </ul>
        <small>© 2026 Grupo Kurihara &amp; Figueiredo. Todos os direitos reservados.</small>
      </div>
    </footer>
  );
}

export function Site() {
  const [rolou, setRolou] = useState(false);
  const [visivel, setVisivel] = useState(false);
  useEffect(() => {
    document.documentElement.classList.add("js");
    const aoRolar = () => {
      setRolou(window.scrollY > 8);
      setVisivel(window.scrollY > window.innerHeight * 0.6);
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);
  return (
    <>
      <Simbolos />
      <a className="pular" href="#conteudo">Pular para o conteúdo</a>
      <Topo rolou={rolou} />
      <main id="conteudo">
        <Abertura />
        <Grupo />
        <Areas />
        <Metodo />
        <Contato />
      </main>
      <Rodape />
      <a className={"flutuante" + (visivel ? " visivel" : "")} href={wa(SAUDACAO)} target="_blank" rel="noopener" aria-label="Falar com o grupo no WhatsApp">
        <Whats />
      </a>
    </>
  );
}
