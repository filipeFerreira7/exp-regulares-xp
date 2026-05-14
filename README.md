# Regex Journey
## Link em produção do projeto: 
<a href="https://regexjourney.vercel.app" target="_blank">
  Regex Journey
</a> <br> 

Regex Journey é um web app estático para demonstrar o funcionamento de expressões regulares de forma visual e interativa.

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

# O que são expressões regulares?

Expressões regulares (Regex) são sequências de caracteres que definem padrões de busca em textos. Elas são amplamente utilizadas em diversas linguagens de programação e ferramentas para validação, pesquisa, extração e manipulação de dados.

Originalmente, o conceito de expressões regulares surgiu no campo da teoria das linguagens formais e se popularizou no ambiente Unix através de ferramentas como `grep`, `sed` e `awk`. Com o tempo, tornaram-se fundamentais em áreas como validação de formulários, processamento de logs, análise de dados e automação de tarefas.

## Principais usos das expressões regulares

### ✅ Validação de dados
Permitem verificar se determinadas informações estão em um formato válido, como:

- Endereços de e-mail
- Números de telefone
- CPF e CEP
- Senhas
- URLs

### 🔍 Busca e extração de informações
Facilitam encontrar padrões específicos dentro de grandes blocos de texto, como:

- URLs
- Datas
- Códigos de identificação
- Tags HTML

### ✏️ Substituição de texto
Possibilitam modificar conteúdos automaticamente, substituindo padrões por outros valores.

Exemplo:
- Trocar múltiplos espaços por apenas um
- Remover caracteres especiais
- Padronizar textos

### 📊 Processamento e filtragem de dados
São muito utilizadas para analisar e estruturar informações em:

- Logs de sistemas
- Bancos de dados
- Arquivos de configuração
- Planilhas e APIs

---

## Fonte

- Informatec Digital — Expressões Regulares (Regex)  
  https://informatecdigital.com/pt/express%C3%B5es-regulares-regex/

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

## Teste Você Também!

Copie e cole os exemplos abaixo diretamente no web app:

### 1. Validação de CPF
**Regex:**
```regex
\d{3}\.\d{3}\.\d{3}-\d{2}
```
### 2. Validação de número celular no Brasil
``` regex
\(\d{2}\) \d{5}-\d{4}
```
Descrição: Valida números de celular no formato (63) 98765-4321

### 3. Datas no formato DD/MM/AAAA
**Regex:**
``` regex
\b(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\d{4}\b
```
Descrição: Valida datas no formato brasileiro 14/05/2026
