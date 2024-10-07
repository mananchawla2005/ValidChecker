function darkmode(){
  const wasDarkMode = localStorage.getItem('darkmode') === 'true';
  localStorage.setItem('darkmode', !wasDarkMode);

  const element = document.body;
  element.classList.toggle('dark-mode', !wasDarkMode);
}

function onload(){
  document.body.classList.toggle('dark-mode', localStorage.getItem('darkmode') === 'true')
}


// Preloader
setTimeout(() => {
  document.querySelector(".preloader").classList.toggle("d-block");
  document.querySelector(".preloader").classList.toggle("d-none");
}, 1000);
