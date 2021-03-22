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

const cards = [
  {
    type:'web',
    heading: 'Web Development',
    imageName:'portfolio-1.jpg',
    headerTag:'Skate Websites'
  },
  {
    type:'web',
    heading: 'Web Development',
    imageName:'portfolio-2.jpg',
    headerTag:'Skating Websites'
  },
  {
    type:'web',
    heading: 'Web Development',
    imageName:'portfolio-3.jpg',
    headerTag:'Eating Websites'
  },
  {
    type:'ui',
    heading: 'UI Design',
    imageName:'portfolio-4.jpg',
    headerTag:'Cool Design'
  },
  {
    type:'app',
    heading: 'App Development',
    imageName:'portfolio-5.jpg',
    headerTag:'Game app'
  },
  {
    type:'app',
    heading: 'App Development',
    imageName:'portfolio-6.jpg',
    headerTag:'Gambling app'
  },
  {
    type:'ui',
    heading: 'UI Design',
    imageName:'portfolio-7.jpg',
    headerTag:'Money Design'
  },
  {
    type:'ui',
    heading: 'UI Design',
    imageName:'portfolio-8.jpg',
    headerTag:'Fantastic Design'
  }, 

];

const portfolioGridElement = document.querySelector(portfolioGrid);

cards.forEach( (card) => {
  portfolioGridElement.innerHTML += 
  `<div class="portfolio-card" data-item="${card.type}">
      <div class="card-body">
        <img src="./assets/images/${card.imageName}" alt="portfolio icon">
        <a href="#" class="card-popup-box">
          <div>${card.heading}</div>
          <h3>${card.headerTag}</h3>
        </a>
      </div>            
    </div>`;
});