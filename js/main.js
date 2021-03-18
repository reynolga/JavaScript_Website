const theme = 'theme';  //Light or Dark theme
const dataTheme = 'data-theme';
const themeTab = '.theme-tab';
const switcherBtn = '.switcher-btn';
const dark = 'dark';
const light = 'light';
const open = 'open';
const active = 'active';
const themePanel = '.theme-panel';

const modelOpen = '[data-open]'; 
const modelClose = '[data-close]'; 
const isVisible = 'is-visible';

const root = document.documentElement;


/* Theme */
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn);
const currentTheme = localStorage.getItem(theme);

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



