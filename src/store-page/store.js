const mainElement = document.getElementById('store-page');
const freshOfTheLineContainer = document.getElementById(
  'freshOffTheLine-container'
);
const bestSellersContainer = document.getElementById('bestSellers-container');
const razerExclusivesContainer = document.getElementById(
  'razerExclusives-container'
);
const razerLastChanceContainer = document.getElementById(
  'razerLastChance-container'
);
const campainCarouselBannerContainer = document.getElementById(
  'campainCarouselBanner-container'
);
const exclusiveBannercontainer = document.getElementById(
  'exclusiveBanner-container'
);

const otherLinksContainer = document.getElementById('otherLinks');

// Card Scroll //

renderHOCs('navbar', 'navbarCss');
renderHOCs('footer', 'footerCss');

fetch('./storeData.json')
  .then((response) => response.json())
  .then((data) => {
    const freshOfTheLineData = data.freshOfTheLine;
    const bestSellersData = data.bestSellers;
    const campainCarouselBannerData = data.campainCarouselBanner;
    const razerExclusivesData = data.razerExclusives;
    const exclusiveBannerData = data.exclusiveBanner;
    const razerLastChanceData = data.razerLastChance;
    const otherLinksData = data.otherLinks;

    renderCardCarousel(freshOfTheLineContainer, freshOfTheLineData);
    renderCardCarousel(bestSellersContainer, bestSellersData);
    renderBannerCarousel(
      campainCarouselBannerContainer,
      campainCarouselBannerData
    );
    renderCardCarousel(razerExclusivesContainer, razerExclusivesData);
    renderBannerCarousel(exclusiveBannercontainer, exclusiveBannerData);
    renderOtherLinks(otherLinksContainer, otherLinksData);
    renderCardCarousel(razerLastChanceContainer, razerLastChanceData);
  });

function renderCardCarousel(container, data) {
  const cardList = document.createElement('ul');
  cardList.className = 'card-scroll';

  const prevArrow = document.createElement('button');
  prevArrow.className = 'arrow left';
  const nextArrow = document.createElement('button');
  nextArrow.className = 'arrow right';

  prevArrow.innerHTML = '<img src="../assets/storePage/leftArrow.svg" />';
  nextArrow.innerHTML = '<img src="../assets/storePage/rightArrow.svg" />';

  container.appendChild(prevArrow);
  container.appendChild(nextArrow);

  data.forEach((item) => {
    let labelBg = '';
    if (item.label.startsWith('gift')) {
      labelBg = 'yellow';
    } else if (item.label.startsWith('new')) {
      labelBg = 'green';
    } else if (item.label.endsWith('off')) {
      labelBg = 'blue';
    } else {
      labelBg = 'orange';
    }

    const li = `
      <div class="card-container">
        <a href="#" class="img-container">
          <img class="product-img" src="${item.url.img}" />
          <img class="chroma-badge" src="${item.url.chroma}"/>
        </a>
 
        ${
          item.label
            ? `<span class="card-label ${labelBg}">${item.label}</span>`
            : ''
        }
       
        <div class="content-container">
          <div class="text-container">
            <h3 class="title">${item.title}</h3>
            <p class="summary">${item.summary}</p>
            <p class="promoline">${item.infoText}</p>
          </div>

          <div class="cta-container">
            <p class="price-text">
              ${item.variations ? '<span>From</span>' : ''}
              US$${item.price}
              ${
                item.discount
                  ? `<span class="line">US$${item.mainPrice}</span>`
                  : ''
              }
            </p>
            <a href="#">Buy</a>
          </div>
        </div>
        

      </div>
    `;

    const liElement = document.createElement('li');
    liElement.className = 'list-item card';
    liElement.innerHTML = li;
    cardList.appendChild(liElement);
  });
  container.appendChild(cardList);
}

function renderBannerCarousel(container, data) {
  const bannerList = document.createElement('ul');
  bannerList.className = 'banner-list';
  bannerList.dataset.slides = '';

  container.dataset.carousel = '';

  const prevArrow = document.createElement('button');
  prevArrow.className = 'arrow left';
  prevArrow.dataset.carouselButton = 'prev';
  const nextArrow = document.createElement('button');
  nextArrow.className = 'arrow right';
  nextArrow.dataset.carouselButton = 'next';

  prevArrow.innerHTML = '<img src="../assets/storePage/leftArrow.svg" />';
  nextArrow.innerHTML = '<img src="../assets/storePage/rightArrow.svg" />';

  const buttons = [prevArrow, nextArrow];

  handleBannerSlider(buttons);

  container.appendChild(prevArrow);
  container.appendChild(nextArrow);

  data.forEach((item, idx) => {
    const li = `
      <div class="banner-card-container">
        <img src="${item.url.img}" />
        <div class="text-container">
          <h2>${item.title}</h2>
          <p>${item.summary}</p>
          <button class="cta-btn">${item.cta}</button>
        </div>
      </div>
      `;

    const liElement = document.createElement('li');
    liElement.className = 'banner-list-item';
    if (idx === 0) liElement.dataset.active = true;
    liElement.innerHTML = li;
    bannerList.appendChild(liElement);
  });

  container.appendChild(bannerList);
}

function handleBannerSlider(buttons) {
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const offset = button.dataset.carouselButton === 'next' ? 1 : -1;
      const slides = button
        .closest('[data-carousel]')
        .querySelector('[data-slides]');

      const activeSlide = slides.querySelector('[data-active]');
      let newIndex = [...slides.children].indexOf(activeSlide) + offset;
      if (newIndex < 0) newIndex = slides.children.length - 1;
      if (newIndex >= slides.children.length) newIndex = 0;

      slides.children[newIndex].dataset.active = true;
      delete activeSlide.dataset.active;
    });
  });
}

function renderOtherLinks(container, data) {
  const otherLinksList = document.createElement('ul');
  otherLinksList.className = 'other-links-list';

  data.forEach((item) => {
    const li = `
      <div class="card">
        <span>${item.title}</span>
        <img src=${item.url.img} />
      </div>
    `;

    const liElement = document.createElement('li');
    liElement.innerHTML = li;
    liElement.className = 'list-item';

    otherLinksList.appendChild(liElement);
  });

  container.appendChild(otherLinksList);
}

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
