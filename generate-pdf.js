const puppeteer = require('puppeteer');

(async () => {
  console.log('Iniciando geração do PDF...');
  
  // URL do cardápio especial
  const url = 'https://cardapio-pastel-de-rei.vercel.app/cardapio-especial.html';
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Navega até a URL
  await page.goto(url, { waitUntil: 'networkidle2' });
  
  // Define o estilo de mídia para impressão
  await page.emulateMediaType('print');
  
  // Gera o PDF
  await page.pdf({
    path: 'PDFs-Cardapio/Cardapio-Pastel-de-Rei-Oficial.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '20px'
    }
  });

  await browser.close();
  console.log('PDF gerado com sucesso na pasta: PDFs-Cardapio/Cardapio-Pastel-de-Rei-Oficial.pdf');
})();
