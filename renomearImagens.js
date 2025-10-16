const fs = require('fs');
const path = require('path');

const pasta = 'C:\\Users\\yudin\\OneDrive\\Documentos\\Área de Trabalho\\the_hydrogen.github.io\\the-hydrogen.github.io\\img\\sticker';

fs.readdir(pasta, (err, arquivos) => {
  if (err) {
    console.error('Erro ao ler a pasta:', err);
    return;
  }

  // Filtrar só os arquivos de imagem comuns
  const imagens = arquivos.filter(arquivo => {
    const ext = path.extname(arquivo).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
  });

  imagens.forEach((arquivo, i) => {
    const novoNome = `${i + 1}.webp`;
    const caminhoAntigo = path.join(pasta, arquivo);
    const caminhoNovo = path.join(pasta, novoNome);

    fs.rename(caminhoAntigo, caminhoNovo, err => {
      if (err) console.error(`Erro ao renomear ${arquivo}:`, err);
      else console.log(`${arquivo} renomeado para ${novoNome}`);
    });
  });
});
