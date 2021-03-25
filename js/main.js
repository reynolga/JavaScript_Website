const theme = 'theme';  //Light or Dark theme
const dataTheme = 'data-theme';
const themeTab = '.theme-tab';
const switcherBtn = '.switcher-btn';
const dark = 'dark';
const light = 'light';
const open = 'open';
const active = 'active';
const themePanel = '.theme-panel';
const portfolioGrid = '.portfolio-grid';

const modelOpen = '[data-open]'; 
const modelClose = '[data-close]'; 
const isVisible = 'is-visible';

const dataFilter = '[data-filter]';
const portfolioData = '[data-item]';

const root = document.documentElement;

const cards = [
  {
    type:'web',
    heading: 'Web Development',
    imageName:'portfolio-1.jpg',
    headerTag:'Skate Websites',
    dataOpen:'web-1',
    modalTitle: 'Web Project 1'
  },
  {
    type:'web',
    heading: 'Web Development',
    imageName:'portfolio-2.jpg',
    headerTag:'Skating Websites',
    dataOpen:'web-2',
    modalTitle: 'Web Project 2'
  },
  {
    type:'web',
    heading: 'Web Development',
    imageName:'portfolio-3.jpg',
    headerTag:'Eating Websites',
    dataOpen:'web-3',
    modalTitle: 'Web Project 3'
  },
  {
    type:'ui',
    heading: 'UI Design',
    imageName:'portfolio-4.jpg',
    headerTag:'Cool Design',
    dataOpen:'ui-1',
    modalTitle: 'Web Project 4'
  },
  {
    type:'app',
    heading: 'App Development',
    imageName:'portfolio-5.jpg',
    headerTag:'Game app',
    dataOpen:'app-1'
  },
  {
    type:'app',
    heading: 'App Development',
    imageName:'portfolio-6.jpg',
    headerTag:'Gambling app',
    dataOpen:'app-2'
  },
  {
    type:'ui',
    heading: 'UI Design',
    imageName:'portfolio-7.jpg',
    headerTag:'Money Design',
    dataOpen:'ui-2'
  },
  {
    type:'ui',
    heading: 'UI Design',
    imageName:'portfolio-8.jpg',
    headerTag:'Fantastic Design',
    dataOpen:'ui-3'
  }
];

createCards(cards);

/* Theme */
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn);
const currentTheme = localStorage.getItem(theme);

/* Portfolio */ 
const filterLink = document.querySelectorAll(dataFilter);
const portfolioItems = document.querySelectorAll(portfolioData);
const searchbox = document.querySelector('#search');

/* Modal */
const openModal = document.querySelectorAll(modelOpen);
const closeModal = document.querySelectorAll(modelClose);

const setActive = (elm, selector) => {
  if(document.querySelector(`${selector}.${active}`) !== null){
    document.querySelector(`${selector}.${active}`).classList.remove(active);
  }
  elm.classList.add(active);  
};

const setTheme = (val) => {
  if(val === dark) {
    root.setAttribute(dataTheme, dark); //arg1 = attribute, arg2 = value
    localStorage.setItem(theme, dark);
  }else {
    root.setAttribute(dataTheme, light); //arg1 = attribute, arg2 = value
    localStorage.setItem(theme, light);
  }
};

if(currentTheme) {
  root.setAttribute(dataTheme, currentTheme);
  switcher.forEach((btn) => {
    btn.classList.remove(active);    
  });
}

if(currentTheme === dark) {
  switcher[1].classList.add(active);
} else {
  switcher[0].classList.add(active);  
}

toggleTheme.addEventListener('click', function(){  
  const tab = document.querySelector(themePanel);
  if(!tab.className.includes(open)){
    tab.classList.add(open);
  } else {
    tab.classList.remove(open);
  }  
})

for(const elm of switcher){
  elm.addEventListener('click', function(){
    const toggle = this.dataset.toggle;
    // set active state
    setActive(elm, switcherBtn);
    setTheme(toggle);
  })
}

searchbox.addEventListener('keyup', (e) => {
  const searchInput = e.target.value.toLowerCase().trim();
  
  portfolioItems.forEach((item) => {
    if(item.dataset.item.includes(searchInput)){
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  })
})

for(const link of filterLink) {
  link.addEventListener('click', function(){
    setActive(link, '.filter-link');

    portfolioItems.forEach((card) => {
      const filter = this.dataset.filter;
      if(filter === 'all'){
        card.style.display = 'block';
      } else if (card.dataset.item === filter){
         card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// Full Site Modal "open buttons" 
for(const elm of openModal){
  elm.addEventListener('click', function(){
      const modalId = this.dataset.open;
      document.getElementById(modalId).classList.add(isVisible);
  });
}

for(const elm of closeModal){
  elm.addEventListener('click', function(){
    const modalId = this.dataset.close;
    document.getElementById(modalId).classList.remove(isVisible);
  });
}


function createCards(cardList) {
  
  const portfolioGridElement = document.querySelector(portfolioGrid);

  //Create the cards
  cards.forEach( (card) => {    
    const newCard = 
    `<div class="portfolio-card" data-item="${card.type}" data-open="${card.dataOpen}">
        <div class="card-body">
          <img src="./assets/images/${card.imageName}" alt="portfolio icon">
          <div href="#" class="card-popup-box">
            <div>${card.heading}</div>
            <h3>${card.headerTag}</h3>
          </div>
        </div>            
      </div>`;

      portfolioGridElement.innerHTML += newCard;      
  });

  //Add addEventListeners
  const portfolioCards = document.querySelectorAll(".portfolio-card");
  for(const elm of portfolioCards) {
    elm.addEventListener('click', () => {
      const cardElements = cardList.find((card) => card.dataOpen == elm.dataset.open);
      if(cardElements != null) {
        if(document.getElementById(cardElements.dataOpen) === null){
          createModal(cardElements);
        }
      }
    });
  }

  
}

function createModal(card) {
  console.log(card);
   
  // Create the modal popup
  const popupHtml = 
  `<div id="${card.dataOpen}" class="modal" data-animation="slideInOutTop">
      <div class="modal-dialog">
        <header class="modal-header">
          <h3>Web Project 1</h3>
          <i class="fas fa-times" data-close="${card.dataOpen}"></i>
        </header>
        <div class="modal-body">
          <div class="img-wrapper">
            <img src="./assets/images/${card.imageName}" alt="portfolio icon">  
          </div>  
          <div class="text-wrapper">
            <p><strong>My first awesome website</strong></p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur magna posuere tortor cursus, ac finibus ante ultrices.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur magna posuere tortor cursus, ac finibus ante ultrices.</p>
          </div>
        </div>
      </div>
    </div>`

    // Insert adjacent to other modals
  const contactModal = document.getElementById('contact');
  contactModal.insertAdjacentHTML("afterend", popupHtml);
  
  // Add event listener for closing.
  const popUpClose = document.querySelector(`#${card.dataOpen} .fa-times`);
  
  popUpClose.addEventListener('click', function() {
    const modalId = this.dataset.close;
    document.getElementById(modalId).classList.remove(isVisible);
  });
  
}

//Modal dialog
document.addEventListener('click', (e) => {
  // console.log(e.target, document.querySelector('.modal.is-visible'));
  if(e.target === document.querySelector('.modal.is-visible')){
    document.querySelector('.modal.is-visible').classList.remove(isVisible)
  }
});

document.addEventListener('keyup', (e) => {
  // console.log(e.key);
  if(e.key === 'Escape'){
    document.querySelector('.modal.is-visible').classList.remove(isVisible)
  }
});

const marqueeElmsDisplayed = getComputedStyle(root).getPropertyValue('--marquee-elms-displayed');
const marqueeContent = document.querySelector('ul.marquee-content');

root.style.setProperty('--marquee-elms', marqueeContent.children.length);

for(let i = 0; i < marqueeElmsDisplayed; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}

// get elements displayed in modal
// nodelist.length
// assign --marquee-elems nodelist.length
