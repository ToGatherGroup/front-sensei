export function converterData(dataOriginal: string) {
    // Divide a string da data em um array [ano, mês, dia]
    const partes = dataOriginal.split('-');
    // Reordena as partes para o formato dd/mm/yyyy
    const dataConvertida = `${partes[2]}/${partes[1]}/${partes[0]}`;
    return dataConvertida;
}

// Exemplo de uso:
// const dataOriginal = "2023-05-07";
// const dataConvertida = converterData(dataOriginal);
// console.log(dataConvertida);  
// Saída: 07/05/2023
