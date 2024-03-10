export default {
  reachableKeys, // Exporta a função reachableKeys
  countPaths, // Exporta a função countPaths
  listAcyclicPaths, // Exporta a função listAcyclicPaths
};

// Define as teclas próximas para cada tecla do teclado do telefone
var nearbyKeys = [
  [4, 6], // Teclas próximas para a tecla 0
  [6, 8], // Teclas próximas para a tecla 1
  [7, 9], // Teclas próximas para a tecla 2
  [4, 8], // Teclas próximas para a tecla 3
  [3, 9, 0], // Teclas próximas para a tecla 4
  [], // Teclas próximas para a tecla 5
  [1, 7, 0], // Teclas próximas para a tecla 6
  [2, 6], // Teclas próximas para a tecla 7
  [1, 3], // Teclas próximas para a tecla 8
  [2, 4], // Teclas próximas para a tecla 9
];

// Função reachableKeys: Retorna um array de teclas que podem ser alcançadas a partir da tecla inicial
function reachableKeys(startingDigit) {
  return nearbyKeys[startingDigit];
}

// Função countPaths: Retorna o número de caminhos possíveis a partir da tecla inicial com um número específico de saltos
function countPaths(startingDigit, hopCount) {
  if (hopCount == 0) return 1; // Se o número de saltos é 0, retorna 1
  // Inicializa um array para armazenar a contagem cumulativa de caminhos para cada uma das 10 teclas
  var priorPathCounts = Array(10).fill(1);
  for (let hops = 0; hops < hopCount; hops++) {
    // Inicializa um array para armazenar a contagem de caminhos para o próximo salto para cada uma das 10 teclas
    let pathCounts = Array(10).fill(0);
    // Processa todas as 10 teclas
    for (let digit = 0; digit <= 9; digit++) {
      // Atualiza a contagem apenas para as teclas próximas da tecla atual (ou seja, movimentos válidos)
      for (let n of nearbyKeys[digit]) {
        pathCounts[digit] += priorPathCounts[n];
      }
    }
    // Preserva a contagem cumulativa para a próxima iteração (se houver)
    priorPathCounts = pathCounts;
  }
  // Retorna apenas a contagem para a tecla inicial (mesmo que todas as contagens tenham sido calculadas)
  return priorPathCounts[startingDigit];
}

// Função listAcyclicPaths: Retorna uma lista de todos os caminhos possíveis a partir da tecla inicial sem repetir teclas
function listAcyclicPaths(startingDigit) {
  var paths = []; // Inicializa um array para armazenar os caminhos
  var nextHops = nearbyKeys[startingDigit]; // Obtém um array de teclas que podem ser alcançadas a partir da tecla inicial
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
  var nextHops = nearbyKeys[path[path.length - 1]]; // Obtém um array de teclas que podem ser alcançadas a partir da última tecla do caminho atual
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
