
function render(componentName, cssLinkId) {
  fetch(`./${componentName}/${componentName}.html`)
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, "text/html");

      const cssLinkElement = doc.getElementById(`${cssLinkId}`);
      cssLinkElement.href = `./${componentName}/${componentName}.css`;

      const modifiedData = doc.documentElement.outerHTML;

      const componentContainer = document.getElementById(
        `${componentName}-container`
      );
      componentContainer.innerHTML = modifiedData;
    });
}

render('navbar', 'navbarCss')
render('products', 'productsCss');
render('footer', 'footerCss');
