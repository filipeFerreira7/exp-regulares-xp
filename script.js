const examples = [
  {
    title: "Email",
    regex: "\\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[A-Za-z]{2,}\\b",
    flags: "g",
    text: "Contato: aluno@ifto.edu.br\nInvalido: user@@site\nValido: suporte@empresa.com.br",
    note: "Reconhece emails em formato comum."
  },
  {
    title: "CPF",
    regex: "\\b\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}\\b",
    flags: "g",
    text: "CPF: 123.456.789-09\nErrado: 12345678909",
    note: "Verifica apenas o formato."
  },
  {
    title: "CEP",
    regex: "\\b\\d{5}-\\d{3}\\b",
    flags: "g",
    text: "CEPs: 77824-838 e 01001-000\nErrado: 77000000",
    note: "Mostra cinco digitos, hifen e tres digitos."
  },
  {
    title: "Binario",
    regex: "^(0*10*10*)*$",
    flags: "m",
    text: "1010\n1111\n1001\n101\n0000",
    note: "Exemplo de linguagem regular."
  },
  {
    title: "Flag i",
    regex: "regex",
    flags: "gi",
    text: "Regex\nREGEX\nregex\nReGeX",
    note: "Com a flag i, a busca ignora maiusculas e minusculas."
  },
  {
    title: "Flag m",
    regex: "^Erro",
    flags: "gm",
    text: "OK: sistema iniciado\nErro: login falhou\nAviso: senha fraca\nErro: token invalido",
    note: "Com a flag m, o ^ funciona no inicio de cada linha."
  },
  {
    title: "Flag g",
    regex: "\\d{2}",
    flags: "g",
    text: "IDs: 12 34 56 78",
    note: "Com a flag g, a regex encontra todas as ocorrencias."
  }
];

const regexInput = document.getElementById("regexInput");
const testInput = document.getElementById("testInput");
const flagG = document.getElementById("flagG");
const flagI = document.getElementById("flagI");
const flagM = document.getElementById("flagM");
const highlightOutput = document.getElementById("highlightOutput");
const matchSummary = document.getElementById("matchSummary");
const regexExplanation = document.getElementById("regexExplanation");
const regexPreview = document.getElementById("regexPreview");
const stepString = document.getElementById("stepString");
const currentPosition = document.getElementById("currentPosition");
const currentState = document.getElementById("currentState");
const currentToken = document.getElementById("currentToken");
const statusBadge = document.getElementById("statusBadge");
const examplesGrid = document.getElementById("examplesGrid");
const runStepButton = document.getElementById("runStep");
const stopStepButton = document.getElementById("stopStep");

let stepTimer = null;
let stepIndex = 0;

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getFlags() {
  return `${flagG.checked ? "g" : ""}${flagI.checked ? "i" : ""}${flagM.checked ? "m" : ""}`;
}

function getRegex() {
  return new RegExp(regexInput.value, getFlags());
}

function getMatchRegex() {
  const flags = getFlags();
  return new RegExp(regexInput.value, flags.includes("g") ? flags : `${flags}g`);
}

function getMatches(text) {
  const regex = getMatchRegex();
  const matches = [];

  for (const match of text.matchAll(regex)) {
    matches.push({
      index: match.index ?? 0,
      end: (match.index ?? 0) + match[0].length
    });

    if (match[0] === "") {
      regex.lastIndex += 1;
    }
  }

  return matches;
}

function renderHighlightedText(text, matches, activeIndex = -1) {
  if (!text.length) {
    return '<span class="is-error">Digite um texto para testar.</span>';
  }

  return [...text]
    .map((char, index) => {
      const escapedChar = char === "\n" ? "\n" : escapeHtml(char);
      const classNames = ["regex-chip"];
      const isMatch = matches.some((item) => index >= item.index && index < item.end);

      if (isMatch) {
        classNames.push("match");
      }

      if (index === activeIndex) {
        classNames.push("active");
      }

      return `<span class="${classNames.join(" ")}">${escapedChar || "&nbsp;"}</span>`;
    })
    .join("");
}

function renderStepString(text, matches, activeIndex = -1) {
  if (!text.length) {
    stepString.innerHTML = '<span class="is-error">A animacao precisa de uma string de teste.</span>';
    return;
  }

  stepString.innerHTML = [...text]
    .map((char, index) => {
      const escapedChar = char === "\n" ? "\n" : escapeHtml(char);
      const classNames = ["char-chip"];
      const isMatch = matches.some((item) => index >= item.index && index < item.end);

      if (isMatch) {
        classNames.push("match");
      }

      if (index === activeIndex) {
        classNames.push("active");
      }

      return `<span class="${classNames.join(" ")}">${escapedChar || "&nbsp;"}</span>`;
    })
    .join("");
}

function tokenizeRegex(pattern) {
  const tokens = [];

  for (let index = 0; index < pattern.length; index += 1) {
    const current = pattern[index];

    if (current === "\\") {
      tokens.push(pattern.slice(index, index + 2));
      index += 1;
      continue;
    }

    if (current === "[") {
      let end = index + 1;
      while (end < pattern.length && pattern[end] !== "]") {
        if (pattern[end] === "\\") {
          end += 1;
        }
        end += 1;
      }
      tokens.push(pattern.slice(index, end + 1));
      index = end;
      continue;
    }

    if (current === "{") {
      let end = index + 1;
      while (end < pattern.length && pattern[end] !== "}") {
        end += 1;
      }
      tokens.push(pattern.slice(index, end + 1));
      index = end;
      continue;
    }

    tokens.push(current);
  }

  return tokens;
}

function describeToken(token) {
  const directMap = {
    "^": "inicio da linha",
    "$": "fim da linha",
    ".": "qualquer caractere",
    "*": "repete 0 ou mais vezes",
    "+": "repete 1 ou mais vezes",
    "?": "item opcional",
    "|": "alternativa",
    "(": "abre grupo",
    ")": "fecha grupo",
    "\\d": "um digito",
    "\\w": "um caractere de palavra",
    "\\s": "um espaco",
    "\\b": "limite de palavra",
    "\\1": "repete o grupo 1"
  };

  if (directMap[token]) {
    return directMap[token];
  }

  if (/^\{(\d+)\}$/.test(token)) {
    return `repete ${token.slice(1, -1)} vezes`;
  }

  if (/^\{(\d+),(\d+)\}$/.test(token)) {
    const [, min, max] = token.match(/^\{(\d+),(\d+)\}$/);
    return `repete de ${min} a ${max} vezes`;
  }

  if (/^\[[^\]]+\]$/.test(token)) {
    return `um caractere do conjunto ${token}`;
  }

  if (/^\\./.test(token)) {
    return `escape de ${token.slice(1)}`;
  }

  return `caractere "${token}"`;
}

function buildExplanation(pattern) {
  return tokenizeRegex(pattern).slice(0, 6).map((token) => ({
    token,
    description: describeToken(token)
  }));
}

function describeCurrentAttempt(index, matches, tokens) {
  const coveringMatch = matches.find((item) => index >= item.index && index < item.end);

  if (coveringMatch) {
    return {
      state: `match entre ${coveringMatch.index} e ${coveringMatch.end - 1}`,
      token: "trecho reconhecido"
    };
  }

  const tokenIndex = tokens.length === 0 ? 0 : index % tokens.length;
  return {
    state: `testando na posicao ${index}`,
    token: tokens[tokenIndex] ? describeToken(tokens[tokenIndex]) : "-"
  };
}

function updatePreview() {
  regexPreview.textContent = `/${regexInput.value}/${getFlags()}`;
}

function stopStepAnimation() {
  if (stepTimer) {
    window.clearInterval(stepTimer);
    stepTimer = null;
  }
  statusBadge.textContent = "Pronto";
}

function refresh() {
  updatePreview();
  const text = testInput.value;

  try {
    getRegex();
    const matches = getMatches(text);
    highlightOutput.innerHTML = renderHighlightedText(text, matches);
    renderStepString(text, matches);
    matchSummary.textContent = `${matches.length} match(es) encontrado(s).`;
    matchSummary.classList.remove("is-error");

    regexExplanation.innerHTML = buildExplanation(regexInput.value)
      .map(
        (item) =>
          `<div class="explanation-item"><span class="explanation-token">${escapeHtml(item.token)}</span>${escapeHtml(item.description)}</div>`
      )
      .join("");
  } catch (error) {
    highlightOutput.innerHTML = `<span class="is-error">${escapeHtml(error.message)}</span>`;
    matchSummary.textContent = "Regex invalida.";
    matchSummary.classList.add("is-error");
    regexExplanation.innerHTML =
      '<div class="explanation-item">Nao foi possivel interpretar essa regex.</div>';
    renderStepString(text, [], -1);
    stopStepAnimation();
  }
}

function runStepAnimation() {
  stopStepAnimation();

  const text = testInput.value;
  const tokens = tokenizeRegex(regexInput.value);
  let matches = [];

  try {
    matches = getMatches(text);
  } catch {
    refresh();
    return;
  }

  if (!text.length) {
    refresh();
    return;
  }

  statusBadge.textContent = "Executando";
  stepIndex = 0;

  stepTimer = window.setInterval(() => {
    if (stepIndex >= text.length) {
      stopStepAnimation();
      currentState.textContent = "Leitura concluida";
      currentToken.textContent = "Fim da string";
      return;
    }

    const current = describeCurrentAttempt(stepIndex, matches, tokens);
    renderStepString(text, matches, stepIndex);
    highlightOutput.innerHTML = renderHighlightedText(text, matches, stepIndex);
    currentPosition.textContent = `${stepIndex}`;
    currentState.textContent = current.state;
    currentToken.textContent = current.token;
    stepIndex += 1;
  }, 220);
}

function setExample(example) {
  regexInput.value = example.regex;
  flagG.checked = example.flags.includes("g");
  flagI.checked = example.flags.includes("i");
  flagM.checked = example.flags.includes("m");
  testInput.value = example.text;
  refresh();
}

function renderExamples() {
  examplesGrid.innerHTML = examples
    .map(
      (example, index) => `
        <article class="example-card">
          <h3>${escapeHtml(example.title)}</h3>
          <span class="example-meta">/${escapeHtml(example.regex)}/${example.flags}</span>
          <p>${escapeHtml(example.note)}</p>
          <button class="secondary-button" type="button" data-example-index="${index}">
            Usar exemplo
          </button>
        </article>
      `
    )
    .join("");
}

regexInput.addEventListener("input", refresh);
testInput.addEventListener("input", refresh);
flagG.addEventListener("change", refresh);
flagI.addEventListener("change", refresh);
flagM.addEventListener("change", refresh);
runStepButton.addEventListener("click", runStepAnimation);
stopStepButton.addEventListener("click", stopStepAnimation);

examplesGrid.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const button = target.closest("[data-example-index]");
  if (!button) {
    return;
  }

  const exampleIndex = Number(button.getAttribute("data-example-index"));
  setExample(examples[exampleIndex]);
});

renderExamples();
refresh();
