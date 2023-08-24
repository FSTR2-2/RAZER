const mainElement = document.getElementById('lifestyle-page');

renderHOCs('navbar', 'navbarCss');
renderHOCs('footer', 'footerCss');

function renderHOCs(componentName, cssLinkId) {
  fetch(`../${componentName}/${componentName}.html`)
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');

      const cssLinkElement = doc.getElementById(`${cssLinkId}`);
      cssLinkElement.href = `../${componentName}/${componentName}.css`;

      if (componentName === 'navbar') {
        const razerLogo = doc.getElementById('razer-logo');
        razerLogo.src = `../assets/${componentName}/razer-logo.png`;

        const iconSearch = doc.getElementById('iconSearch');
        iconSearch.src = `../assets/${componentName}/magnifier-white.png`;

        const iconCart = doc.getElementById('iconCart');
        iconCart.src = `../assets/${componentName}/shopping-cart-white.png`;
      }

      if (componentName === 'footer') {
        const socialIcons = doc.querySelectorAll('[data-social]');
        socialIcons.forEach((socialIcon) => {
          socialIcon.src = `../assets/${componentName}/icons8-${socialIcon.alt}.svg`;
        });
      }

      const modifiedData = doc.documentElement.outerHTML;

      const componentContainer = document.getElementById(
        `${componentName}-container`
      );
      componentContainer.innerHTML = modifiedData;
    });
}