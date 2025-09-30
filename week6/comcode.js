const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

var menushow = false;

function showMenu() {
    var shown = navMenu.classList.toggle("show");
    navMenu.classList.toggle("hide");

    if(shown){
        navToggle.setAttribute("aria-expanded", "true");
    }

    else {
        navToggle.setAttribute("aria-expanded", "false");
    }

}

navToggle.addEventListener('click', showMenu);


const trailLinks = document.querySelectorAll('.trailhead-containers');


trailLinks.forEach(span => {
  span.addEventListener('click', (event) => {
    const url = event.currentTarget.dataset.href


alert("hello");

    if(url)
    {
        window.location.href = url;
    }
  });
});




const filterButton = document.querySelector('.trailhead-filter');
const filterItems = document.querySelector('.trailhead-filter-list')

// Add click event to each button
filterButton.forEach(nav => {
  nav.addEventListener('hover', (event) => {

    alert("hovering")
filterItems.forEach(ul => {
    ul.style.display = 'block'
  })

    //const filterValue = event.target.textContent.toLowerCase();
   // filterPhotos(filterValue);
  });
});

/*function filterPhotos(category) {
  trailLinks.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}
  */