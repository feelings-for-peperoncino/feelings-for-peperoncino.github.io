
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
