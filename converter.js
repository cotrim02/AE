const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const pasta = 'C:/Users/victo/OneDrive/Documentos/GitHub/AE/the-hydrogen.github.io/img/sticker';

console.log('Iniciando script de conversão...');

fs.readdir(pasta, (err, arquivos) => {
  if (err) {
    console.error('Erro ao ler a pasta:', err);
    return;
  }

  // Filtra arquivos .webp
  const webps = arquivos.filter(arquivo => path.extname(arquivo).toLowerCase() === '.jpg');

  if (webps.length === 0) {
    console.log('Nenhum arquivo .webp encontrado na pasta.');
    return;
  }

  webps.forEach((arquivo, i) => {
    const caminhoAntigo = path.join(pasta, arquivo);
    const novoNome = `${i + 1}.webp`;
    const caminhoNovo = path.join(pasta, novoNome);

    sharp(caminhoAntigo)
      .toFormat('png')
      .toFile(caminhoNovo)
      .then(() => console.log(`${arquivo} convertido para ${novoNome}`))
      .catch(err => console.error('Erro na conversão:', err));
  });
});
