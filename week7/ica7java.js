// Get all filter buttons and photo cards
const filterButtons = document.querySelectorAll('.gallery-nav button');
const photoCards = document.querySelectorAll('.photo-card');

// Add click event to each button
filterButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const filterValue = event.target.textContent.toLowerCase();
    filterPhotos(filterValue);
  });
});

function filterPhotos(category) {
  photoCards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Save user's theme choice

let btn = document.querySelector('.theme').addEventListener('click', theme);

function theme()
{
  setTheme("light");
}
function setTheme(theme) {
  let inTheme = 'light'
  if(inTheme=='dark'){
    theme = 'light'
  }
  else{
    theme = 'dark'
  }
    localStorage.setItem('userTheme', theme);
    document.body.className = theme;
}

// Load saved theme on page load
window.addEventListener('load', function() {
    const savedTheme = localStorage.getItem('userTheme') || 'light';
    document.body.className = savedTheme;
});