renderHOCs('navbar')
renderHOCs('footer')

function renderHOCs(componentName) {
  fetch(`../${componentName}.html`)
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');

      const modifiedData = doc.documentElement.outerHTML;

      const componentContainer = document.getElementById(
        `${componentName}-container`
      );
      componentContainer.innerHTML = modifiedData;
    });
}