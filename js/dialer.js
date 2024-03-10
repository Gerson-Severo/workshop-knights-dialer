export default {
  reachableKeys, // Exporta a função reachableKeys
  countPaths, // Exporta a função countPaths
  listAcyclicPaths, // Exporta a função listAcyclicPaths
};

// Define o layout do teclado do telefone
var dialpad = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [undefined, 0, undefined],
];

// Função reachableKeys: Retorna um array de teclas que podem ser alcançadas a partir da tecla inicial
function reachableKeys(startingDigit) {
  var nearbyKeys = []; // Inicializa um array para armazenar as teclas próximas

  // Percorre todas as linhas do teclado
  for (let [rowIdx, row] of dialpad.entries()) {
    let colIdx = row.indexOf(startingDigit); // Encontra a coluna da tecla inicial na linha atual
    if (colIdx != -1) {
      // Se a tecla inicial foi encontrada na linha atual
      // Verifica todas as possíveis combinações de movimentos do cavalo
      for (let rowMove of [-2, -1, 1, 2]) {
        for (let colMove of [-2, -1, 1, 2]) {
          // Considera apenas as combinações onde as magnitudes dos movimentos de linha e coluna são diferentes
          if (Math.abs(rowMove) != Math.abs(colMove)) {
            // Verifica se a tecla resultante do movimento está dentro dos limites do teclado e não é undefined
            if (
              rowIdx + rowMove >= 0 &&
              rowIdx + rowMove <= 3 &&
              colIdx + colMove >= 0 &&
              colIdx + colMove <= 2 &&
              dialpad[rowIdx + rowMove][colIdx + colMove] != undefined
            ) {
              // Adiciona a tecla resultante ao array de teclas próximas
              nearbyKeys.push(dialpad[rowIdx + rowMove][colIdx + colMove]);
            }
          }
        }
      }
    }
  }

  // Retorna o array de teclas próximas
  return nearbyKeys;
}

// Função countPaths: Retorna o número de caminhos possíveis a partir da tecla inicial com um número específico de saltos
function countPaths(startingDigit, hopCount) {
  if (hopCount == 0) return 1; // Se o número de saltos é 0, retorna 1
  var pathCount = 0; // Inicializa a contagem de caminhos
  // Para cada tecla que pode ser alcançada a partir da tecla inicial
  for (let digit of reachableKeys(startingDigit)) {
    // Adiciona ao contador o número de caminhos possíveis a partir da tecla atual com um número menor de saltos
    pathCount += countPaths(digit, hopCount - 1);
  }
  // Retorna a contagem de caminhos
  return pathCount;
}

// Função listAcyclicPaths: Retorna uma lista de todos os caminhos possíveis a partir da tecla inicial sem repetir teclas
function listAcyclicPaths(startingDigit) {
  var paths = []; // Inicializa um array para armazenar os caminhos
  var nextHops = reachableKeys(startingDigit); // Obtém um array de teclas que podem ser alcançadas a partir da tecla inicial
  // Para cada tecla no array de teclas próximas
  for (let nextHop of nextHops) {
    // Inicializa um novo caminho com a tecla inicial e a tecla próxima
    let path = [startingDigit, nextHop];
    // Continua o caminho a partir da tecla próxima
    followPath(path, paths);
  }
  // Retorna o array de caminhos
  return paths;
}

// Função followPath: Continua um caminho a partir da última tecla do caminho atual
function followPath(path, paths) {
  var nextHops = reachableKeys(path[path.length - 1]); // Obtém um array de teclas que podem ser alcançadas a partir da última tecla do caminho atual
  var pathForwardFound = false; // Inicializa uma variável para verificar se um caminho para frente foi encontrado
  // Para cada tecla no array de teclas próximas
  for (let nextHop of nextHops) {
    // Verifica se a tecla próxima não está no caminho atual
    if (!path.includes(nextHop)) {
      pathForwardFound = true; // Um caminho para frente foi encontrado
      let nextPath = [...path, nextHop]; // Cria um novo caminho com a tecla próxima
      // Continua o caminho a partir da tecla próxima
      followPath(nextPath, paths);
    }
  }
  // Se nenhum caminho para frente foi encontrado
  if (!pathForwardFound) {
    // O caminho atual está completo, então adiciona-o ao array de caminhos
    paths.push(path);
  }
}
