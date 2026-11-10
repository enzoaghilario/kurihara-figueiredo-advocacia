export const FONE = "5516988014617";
export const SAUDACAO = "Olá, gostaria de falar com o Grupo Kurihara & Figueiredo.";
export const wa = (msg: string) =>
  "https://api.whatsapp.com/send?phone=" + FONE + "&text=" + encodeURIComponent(msg);
export function lista(itens: string[]) {
  if (itens.length < 2) return itens.join("");
  return itens.slice(0, -1).join(", ") + " e " + itens[itens.length - 1];
}

export type Area = { id: number; titulo: string; leitor?: string; msg: string; curto: string; texto: string };
export type Frente = { titulo: string; resumo: string; areas: Area[] };

export const FRENTES: Frente[] = [
  { titulo: "Jurídico", resumo: "Prevenção, defesa e reestruturação da empresa.", areas: [
    { id: 1, titulo: "Assessoria e consultoria jurídica empresarial", msg: "assessoria e consultoria jurídica empresarial", curto: "Jurídico empresarial", texto: "Acompanhamento jurídico contínuo da empresa: contratos, questões societárias, relações de trabalho e as decisões do dia a dia, com orientação antes que o problema apareça." },
    { id: 2, titulo: "Auditoria jurídica", msg: "auditoria jurídica", curto: "Auditoria jurídica", texto: "Revisão de contratos, processos e obrigações legais para identificar riscos e passivos e indicar como corrigi-los." },
    { id: 3, titulo: "Recuperação extrajudicial e judicial", msg: "recuperação extrajudicial e judicial", curto: "Recuperação extrajudicial e judicial", texto: "Reestruturação de dívidas e negociação com credores para empresas em dificuldade, dentro ou fora do Judiciário, com o objetivo de preservar a atividade." },
    { id: 4, titulo: "Recuperação de créditos", msg: "recuperação de créditos", curto: "Recuperação de créditos", texto: "Cobrança de valores em aberto, da negociação amigável à execução judicial." },
  ]},
  { titulo: "Contábil e financeiro", resumo: "Números em ordem para decidir com segurança.", areas: [
    { id: 5, titulo: "Assessoria e consultoria contábil", msg: "assessoria e consultoria contábil", curto: "Contábil", texto: "Escrituração, obrigações fiscais e orientação contábil para manter a empresa regular e as contas claras." },
    { id: 6, titulo: "Auditoria contábil", msg: "auditoria contábil", curto: "Auditoria contábil", texto: "Exame independente dos registros e das demonstrações para confirmar se os números refletem a realidade da empresa." },
    { id: 7, titulo: "Auditoria jurídica e contábil", msg: "auditoria jurídica e contábil", curto: "Auditoria jurídica e contábil", texto: "Análise conjunta dos documentos jurídicos e contábeis, indicada para compra e venda de empresas, entrada de sócios e reorganizações." },
    { id: 8, titulo: "Assessoria e consultoria financeira", msg: "assessoria e consultoria financeira", curto: "Financeiro", texto: "Fluxo de caixa, custos, endividamento e planejamento, para que as decisões se apoiem em números." },
  ]},
  { titulo: "Patrimônio e marcas", resumo: "O que a empresa e a família construíram, protegido.", areas: [
    { id: 9, titulo: "Assessoria patrimonial", msg: "assessoria patrimonial", curto: "Patrimonial", texto: "Organização e proteção do patrimônio empresarial e familiar, incluindo o planejamento da sucessão." },
    { id: 10, titulo: "Registro de marcas e patentes", msg: "registro de marcas e patentes", curto: "Marcas e patentes", texto: "Busca prévia, pedido de registro e acompanhamento de marcas e patentes no INPI." },
  ]},
  { titulo: "Conformidade e digital", resumo: "Rotinas obrigatórias, em dia.", areas: [
    { id: 11, titulo: "Assessoria e consultoria em SST", leitor: "(segurança e saúde do trabalho)", msg: "assessoria e consultoria em SST", curto: "SST", texto: "Segurança e saúde do trabalho: adequação às normas regulamentadoras, programas e laudos obrigatórios e envio dos eventos de SST ao eSocial." },
    { id: 12, titulo: "Certificado digital", msg: "certificado digital", curto: "Certificado digital", texto: "Emissão de certificado digital para pessoas físicas e jurídicas, com atendimento pela KF Certificados." },
  ]},
];
export const AREAS = FRENTES.flatMap((f) => f.areas);
