const modelOpen = '[data-open]'; 
const modelClose = '[data-close]'; 
const isVisible = 'is-visible';
const openModal = document.querySelectorAll(modelOpen);
const closeModal = document.querySelectorAll(modelClose);

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



