// src/utils/masks.ts

// Exportamos apenas a função isolada. Ela recebe um texto sujo e devolve ele mascarado.
export function maskWhatsapp(texto: string) {
  let numeroLimpo = texto.replace(/\D/g, '');

  if (numeroLimpo.length > 11) {
    numeroLimpo = numeroLimpo.substring(0, 11);
  }

  let numeroFormatado = numeroLimpo;
  if (numeroLimpo.length > 2) {
    numeroFormatado = `(${numeroLimpo.substring(0, 2)}) `;
    if (numeroLimpo.length > 7) {
      numeroFormatado += `${numeroLimpo.substring(2, 7)}-${numeroLimpo.substring(7, 11)}`;
    } else {
      numeroFormatado += numeroLimpo.substring(2, 11);
    }
  }

  return numeroFormatado;
}