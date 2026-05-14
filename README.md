# Regex Journey

Regex Journey e um web app estatico para demonstrar o funcionamento de expressoes regulares de forma visual e interativa.

## O que o app faz

- Permite digitar uma regex com flags `g`, `i` e `m`
- Destaca matches em tempo real no texto de teste
- Executa uma leitura passo a passo pela string
- Explica a regex em linguagem natural
- Oferece exemplos prontos com casos didaticos

## Estrutura

- `index.html`: interface principal
- `styles.css`: tema dark minimalista
- `script.js`: logica do playground, exemplos e animacao
- `SESSAO_IA.md`: registro da conversa com a IA

## Como executar

Como o projeto e estatico, basta abrir `index.html` no navegador.

Se preferir rodar com um servidor local simples:

```powershell
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Como publicar no Github Pages

1. Crie um repositorio no Github.
2. Envie estes arquivos para a branch principal.
3. Ative o Github Pages nas configuracoes do repositorio.
4. Escolha publicar a partir da branch principal e da pasta raiz.
5. O Github gerara a URL publica do web app.

## Observacao academica

O exemplo da linguagem `a^n b^n` esta no app para destacar uma limitacao conceitual: regex tradicionais nao reconhecem perfeitamente essa linguagem, apenas aproximacoes.
