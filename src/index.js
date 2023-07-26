fetch("./navbar/navbar.html")
  .then((response) => response.text())
  .then(html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const cssLinkElement = doc.getElementById('navbarCss');
    cssLinkElement.href = './navbar/navbar.css';

    const modifiedHtml = doc.documentElement.outerHTML;

    const navbarContainer = document.getElementById('navbar-container');
    navbarContainer.innerHTML = modifiedHtml;
  })

fetch('./footer/footer.html')
  .then(response => response.text())
  .then(html => {
    const parser = new DOMParser(); 
    const doc = parser.parseFromString(html, 'text/html');

    const cssLinkElement = doc.getElementById('footerCss');
    cssLinkElement.href = './footer/footer.css';

    const modifiedHtml = doc.documentElement.outerHTML;

    const footerContainer = document.getElementById('footer-container')
    footerContainer.innerHTML = modifiedHtml;
  })
  
  fetch('./dashboard2/dashboard2.html')
  .then(response => response.text())
  .then(html => {
    const parser = new DOMParser(); 
    const doc = parser.parseFromString(html, 'text/html');

    const cssLinkElement = doc.getElementById('dashboard2Css');
    cssLinkElement.href = './dashboard2/dashboard2.css';

    const modifiedHtml = doc.documentElement.outerHTML;

    const footerContainer = document.getElementById('dashboard2-container')
    footerContainer.innerHTML = modifiedHtml;
  })
  
  fetch('./dashboard3/dashboard3.html')
  .then(response => response.text())
  .then(html => {
    const parser = new DOMParser(); 
    const doc = parser.parseFromString(html, 'text/html');

    const cssLinkElement = doc.getElementById('dashboard3Css');
    cssLinkElement.href = './dashboard3/dashboard3.css';

    const modifiedHtml = doc.documentElement.outerHTML;

    const footerContainer = document.getElementById('dashboard3-container')
    footerContainer.innerHTML = modifiedHtml;
  })
  