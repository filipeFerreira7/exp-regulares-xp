# Regex Journey

Regex Journey e um web app estático para demonstrar o funcionamento de expressões regulares de forma visual e interativa.

## O que o app faz

- Permite digitar uma regex com flags `g`, `i` e `m`
- Destaca matches em tempo real no texto de teste
- Executa uma leitura passo a passo pela string
- Explica a regex em linguagem natural
- Oferece exemplos prontos com casos didáticos

## Flags em Expressões Regulares

As **flags** (ou modificadores) são caracteres que alteram o comportamento da expressão regular. Elas são colocadas após a regex.

### Principais Flags

| Flag | Nome              | Descrição                                                                 | Exemplo |
|------|-------------------|---------------------------------------------------------------------------|---------|
| `g`  | **Global**        | Encontra **todas** as ocorrências na string (não para no primeiro match) | `/a/g` em `"banana"` → encontra 3 `"a"` |
| `i`  | **Ignore Case**   | Ignora diferença entre maiúscula e minúscula                             | `/abc/i` casa com `"ABC"`, `"Abc"`, `"abc"` |
| `m`  | **Multiline**     | Faz os metacaracteres `^` e `$` funcionarem em **cada linha**            | Útil em textos com quebra de linha |
| `s`  | **Dot All**       | Permite que o ponto (`.`) case também com quebras de linha (`\n`)        | Menos utilizada |

## Estrutura

- `index.html`: interface principal
- `styles.css`: tema dark minimalista
- `script.js`: lógica do playground, exemplos e animação
- `SESSAO_IA.md`: registro da conversa com a IA

## Como executar

Como o projeto é estático, basta abrir `index.html` no navegador.

Se preferir rodar com um servidor local simples:

```powershell
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

