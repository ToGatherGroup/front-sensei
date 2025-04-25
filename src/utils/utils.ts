export function converterData(dataOriginal: string) {
    // Divide a string da data em um array [ano, mês, dia]
    const partes = dataOriginal.split('-');
    // Reordena as partes para o formato dd/mm/yyyy
    const dataConvertida = `${partes[2]}/${partes[1]}/${partes[0]}`;
    return dataConvertida;
}
