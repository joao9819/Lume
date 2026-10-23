import clinica from '../data/clinica.json';

export const waLink = (mensagem: string) =>
  `https://wa.me/${clinica.contato.whatsapp}?text=${encodeURIComponent(mensagem)}`;

export const waTratamento = (nome: string) =>
  waLink(clinica.mensagens.tratamento.replace('{nome}', nome));

export const waAvaliacao = () => waLink(clinica.mensagens.avaliacao);
