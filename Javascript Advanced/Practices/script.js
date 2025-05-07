import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js';
fetch('./index.md')
  .then((res) => res.text())
  .then((res) => {
    document.getElementById('root').innerHTML = marked.parse(res);
  });

const exampleButtons = document.getElementsByClassName('example-btn');
if (exampleButtons.length) {
  for (const $button of exampleButtons) {
    $button.addEventListener('click', function () {
      const $parent = this.closest('[data-example-file]');
      if ($parent) {
        const file = $parent.getAttribute('data-example-file');
        const $exampleBlock = $parent.querySelector('.example');
        fetch(file)
          .then((res) => res.text())
          .then((res) => {
            $exampleBlock.innerHTML = marked.parse('```' + res + '```');
          });

        const $existedScript = document.getElementById(file);
        if ($existedScript) $existedScript.remove();
        const $exampleScript = document.createElement('script');
        $exampleScript.id = file;
        $exampleScript.src = file;
        document.body.appendChild($exampleScript);
      }
    });
  }
}
