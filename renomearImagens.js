const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const pastaOrigem = 'C:/Users/victo/OneDrive/Documentos/GitHub/AE/the-hydrogen.github.io/img/sticker';
const pastaDestino = 'C:/Users/victo/OneDrive/Documentos/GitHub/AE/the-hydrogen.github.io/img/sticker-converted';

// Cria a pasta destino, se não existir
if (!fs.existsSync(pastaDestino)) {
  fs.mkdirSync(pastaDestino);
}

fs.readdir(pastaOrigem, (err, arquivos) => {
  if (err) {
    console.error('Erro ao ler a pasta:', err);
    return;
  }

  // Filtra arquivos de imagem comuns
  const imagens = arquivos.filter(arquivo => {
    const ext = path.extname(arquivo).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
  });

  imagens.forEach((arquivo, i) => {
    const ext = path.extname(arquivo).toLowerCase();
    const caminhoAntigo = path.join(pastaOrigem, arquivo);

    // Se já for PNG, copiar direto pra pastaDestino sem conversão
    if (ext === '.png') {
      const caminhoNovo = path.join(pastaDestino, `${i + 1}.png`);
      fs.copyFile(caminhoAntigo, caminhoNovo, err => {
        if (err) console.error(`Erro ao copiar ${arquivo}:`, err);
        else console.log(`${arquivo} copiado para ${caminhoNovo}`);
      });
    } else {
      // Convertendo outros formatos para PNG na pastaDestino
      const caminhoNovo = path.join(pastaDestino, `${i + 1}.png`);

      sharp(caminhoAntigo)
        .toFormat('png')
        .toFile(caminhoNovo)
        .then(() => console.log(`${arquivo} convertido para ${caminhoNovo}`))
        .catch(err => console.error(`Erro na conversão de ${arquivo}:`, err));
    }
  });
});
