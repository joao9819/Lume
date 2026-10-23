/** Converte *trecho* da copy no itálico de ligação (Fraunces Italic). */
export const rich = (texto: string) =>
  texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');

/** Versão em texto puro, para atributos e SEO. */
export const plain = (linhas: string[]) => linhas.join(' ').replace(/\*/g, '');
