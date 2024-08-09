
let currentIndex = -1;
let results = [];

function searchText() {
  const searchText = document.getElementById("searchInput").value.toLowerCase();

  // 検索結果をクリア
  clearHighlights();
  results = [];

  if (searchText) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node, nodeText, index;
    let offset = 0;

    while (node = walker.nextNode()) {
      nodeText = node.textContent.toLowerCase();
      index = nodeText.indexOf(searchText);

      while (index !== -1) {
        results.push({
          node: node,
          start: index,
          length: searchText.length
        });

        index = nodeText.indexOf(searchText, index + searchText.length);
      }
    }

    // 検索結果の件数を表示
    document.getElementById("resultCount").innerText = results.length + " 件の結果";

    // 最初の結果にジャンプ
    if (results.length > 0) {
      currentIndex = 0;
      highlightResult();
    }
  } else {
    document.getElementById("resultCount").innerText = "0 件の結果";
  }
}

function highlightResult() {
  if (currentIndex >= 0 && currentIndex < results.length) {
    clearHighlights();

    const result = results[currentIndex];
    const range = document.createRange();
    range.setStart(result.node, result.start);
    range.setEnd(result.node, result.start + result.length);

    const highlight = document.createElement("span");
    highlight.className = "highlight";
    range.surroundContents(highlight);

    // ハイライト箇所にスクロール
    highlight.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function clearHighlights() {
  const highlights = document.querySelectorAll('.highlight');
  highlights.forEach(span => {
    const parent = span.parentNode;
    parent.replaceChild(span.firstChild, span);
    parent.normalize(); // 連続するテキストノードを結合する
  });
}

function nextResult() {
  if (results.length > 0) {
    currentIndex = (currentIndex + 1) % results.length;
    highlightResult();
  }
}

function prevResult() {
  if (results.length > 0) {
    currentIndex = (currentIndex - 1 + results.length) % results.length;
    highlightResult();
  }
}


// コピーボタンのscript
document.querySelectorAll('.copy-btn').forEach(button => {
  button.addEventListener('click', () => {
    var codeBlock = button.previousElementSibling;
    var textToCopy = codeBlock.textContent;

    // 一時的にテキストエリアを作成してコピー
    var tempTextArea = document.createElement("textarea");
    tempTextArea.value = textToCopy;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);

    // ボタンのテキストを変更して、コピーが成功したことを示す
    button.textContent = "Copied!";
    setTimeout(() => {
      button.textContent = "Copy";
    }, 2000);
  });
});

// エスケープ処理のscript
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.auto-escape').forEach(function (codeBlock) {
      // 元のテキストをエスケープ
      var escapedContent = codeBlock.innerHTML
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      // エスケープ後のテキストを再挿入
      codeBlock.innerHTML = escapedContent;
    });
  });
