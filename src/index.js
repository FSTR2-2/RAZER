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
  

