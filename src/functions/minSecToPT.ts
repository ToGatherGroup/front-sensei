/*
    Esta função converte '10:15' para 'PT10M15S'
    ATENÇÃO: Essa função assume que o input sempre chegará com 2 dígitos nos minutos e 2 dígitos nos segundos, conforme exemplo acima!
*/

export default function minSecToPT(time: string | undefined | null) {
  if (!time) return time;
  const [min, sec] = time.split(":");
  return `PT${min}M${sec}S`;
}
