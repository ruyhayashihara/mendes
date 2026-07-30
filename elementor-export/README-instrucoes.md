# Guia de Instalação: Landing Page Escola de Solda (Elementor Pro)

Este diretório contém os arquivos necessários para recriar a Landing Page da Escola de Solda no seu WordPress com Elementor Pro.

## Arquivos Entregues

1. **`escola-solda-landing-page.json`**: Template principal da página para o Elementor.
2. **`escola-solda-popup-lead.json`**: Template do popup de captura de leads.
3. **`elementor-custom.css`**: Estilos CSS vitais para as animações (Framer Motion convertidas para CSS), glows e identidade visual.
4. **`elementor-custom.js`**: Lógica do "Simulador de Salário" e integração do WhatsApp pós-submit.
5. **`functions-snippet.php`**: Código PHP para registrar os leads, incluir o JS/CSS e ajustar configurações do WP.

---

## Passo a Passo da Instalação

### Passo 1: Preparar Imagens e Fontes
1. Vá em **Mídia > Adicionar Nova** no WordPress.
2. Faça o upload das fotos usadas na landing page original (fotos de solda, instrutor, background).
3. Certifique-se de que o Elementor está configurado para baixar fontes Google (Inter, Space Grotesk, JetBrains Mono).

### Passo 2: Configurar Tema e Snippets (PHP, CSS, JS)
1. **PHP:** Se você usa um tema filho, cole o conteúdo de `functions-snippet.php` no arquivo `functions.php`. (Ou use um plugin como "Code Snippets").
2. **CSS:** Acesse o painel **Elementor > Configurações > Avançado** ou **Aparência > Personalizar > CSS Adicional** e cole o conteúdo de `elementor-custom.css`.
3. **JS:** O arquivo `elementor-custom.js` deve ser salvo na pasta `/js/` do seu tema filho (ou inserido via Elementor Custom Code no Footer).

### Passo 3: Importar o Popup (Lead Capture)
1. Vá em **Modelos > Popups > Adicionar Novo**.
2. Clique no ícone da pastinha (Importar Modelo) e envie o arquivo `escola-solda-popup-lead.json`.
3. Após inserir, verifique se os campos do formulário (Nome, WhatsApp, etc) estão corretos.
4. Vá em **Ações Após Envio** (no widget de Formulário) e confirme se está configurado para redirecionar ou acionar o Webhook/Email. O nosso script JS intercepta o evento `submit_success` para abrir o WhatsApp.
5. Em **Condições de Exibição**, deixe sem condições automáticas (será aberto via clique de botão).
6. Publique o popup.

### Passo 4: Importar a Landing Page
1. Vá em **Páginas > Adicionar Nova**, nomeie como "Escola de Solda" e mude o Modelo da Página para **Elementor Canvas** ou **Elementor Largura Total**.
2. Salve como rascunho e clique em **Editar com Elementor**.
3. Clique no ícone de pastinha 📁 > aba **Meus Modelos** > Ícone de Importar (seta para cima).
4. Selecione o arquivo `escola-solda-landing-page.json`.
5. Insira o modelo na página.

### Passo 5: Ajustes Finais no Editor
Devido à forma como a exportação/importação do Elementor funciona com widgets complexos e imagens locais:
1. **Substituir Imagens:** Clique nos widgets de imagem que estão vazios e selecione as imagens enviadas no Passo 1.
2. **Revisar Textos:** As fontes e cores globais podem assumir o padrão do seu tema WordPress. Caso algo não fique com a cor laranja (#ff6b00) ou fonte correta, basta ajustar nas configurações globais do Elementor (Menu Hambúrguer > Configurações do Site > Cores Globais / Fontes Globais).
3. **Ligar os Botões ao Popup:** Clique nos botões "VER VAGAS E PREÇOS", vá na aba Conteúdo > Link > Tags Dinâmicas (ícone de pilha de moedas) > Popup > selecione o Popup importado no Passo 3.

### Passo 6: Testar!
1. Publique a página.
2. Acesse pelo navegador e teste a calculadora de salário (os controles de input de tempo/hora).
3. Clique no botão de CTA e verifique se o Popup abre.
4. Preencha o formulário e garanta que o WhatsApp é aberto com os dados formatados corretamente.

---

*Nota sobre a Calculadora:* A calculadora usa um Widget HTML Customizado com as tags `<input type="range">`. O estilo e a matemática acontecem nos arquivos CSS e JS que você configurou. Caso o cálculo não ocorra, verifique se o `elementor-custom.js` está sendo carregado corretamente no footer.
