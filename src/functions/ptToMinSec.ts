/*
    Esta função converte 'PT10M15S' para '10:15'
    Exemplos:
    
    Entrada ->  Saída
    PT1M10S ->  01:10
    PT15S   ->  00:15
    PT10M   ->  10:00
    PT1M    ->  01:00
*/

export default function ptToMinSec(ptString: string | undefined | null) {
  if (!ptString) return ptString;

  let convertingPtString = ptString;
  let min;
  let sec;

  if (ptString.includes("M")) {
    const startIndex = convertingPtString.indexOf("T") + 1; // Adiciona um ao valor, pois o inicio do slice() é inclusivo
    const endIndex = convertingPtString.indexOf("M"); // Não subtrai um do valor, pois o final do slice() é exclusivo
    min = convertingPtString.slice(startIndex, endIndex);
    if (min.length <= 1) min = `0${min}`; // Garante dois dígitos
  } else {
    min = "00";
  }
  if (ptString.includes("S")) {
    const startIndex = ptString.includes("M")
      ? convertingPtString.indexOf("M") + 1
      : convertingPtString.indexOf("T") + 1; // Adiciona um ao valor, pois o inicio do slice() é inclusivo
    const endIndex = convertingPtString.indexOf("S"); // Não subtrai um do valor, pois o final do slice() é exclusivo
    sec = convertingPtString.slice(startIndex, endIndex);
    if (sec.length <= 1) sec = `0${sec}`; // Garante dois dígitos
  } else {
    sec = "00";
  }

  const minSec = `${min}:${sec}`;
  return minSec;
}
