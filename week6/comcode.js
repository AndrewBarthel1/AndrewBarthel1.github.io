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


    if(url)
    {
        window.location.href = url;
    }
  });
});




const filterButton = document.querySelectorAll('.trailhead-filter');
const filterText = document.querySelectorAll('.trailhead-filter-text');
const grid = document.querySelector('.grid-system')
const filterList = document.querySelector('.trailhead-filter-list')
const changeFilter = document.querySelectorAll('.filter-item')
const trailheads = document.querySelectorAll('.trailhead-containers')


filterButton.forEach(nav => {
  nav.addEventListener('mouseenter', (event) => {

    filterList.classList.remove('hidden');

//    document.querySelector('.trailhead-filter-list').classList.remove('hidden');
    //const filterValue = event.target.textContent.toLowerCase();
   // filterPhotos(filterValue);
  });
});

filterButton.forEach(nav => {
  nav.addEventListener('mouseleave', (event) => {

    filterList.classList.add('hidden');

    //const filterValue = event.target.textContent.toLowerCase();
   // filterPhotos(filterValue);
  });
});

changeFilter.forEach(li => {
  li.addEventListener('click', (event) => {
    filterText[0].textContent = 'Filter: ' + li.textContent;
    for(let i = 0; i < trailheads.length; i++)
    {
        if(trailheads[i].getAttribute('data-catagory') == li.textContent || li.textContent == "None")
        {
            trailheads[i].classList.remove('hidden')
        }
        else{
            trailheads[i].classList.add('hidden')
        }
    }

    //const filterValue = event.target.textContent.toLowerCase();
   // filterPhotos(filterValue);
  });
});

const eventZoom = document.querySelectorAll('.event');
const eventInfo = document.querySelectorAll('.before');
const eventFull = document.querySelectorAll('.after')

eventZoom.forEach(div => {
  div.addEventListener('click', (event) => {

    if(div.classList.contains('blowup'))
            {
                eventReset()
            }
            else{
    for(let i = 0; i < eventZoom.length; i++)
    {

        if(eventZoom[i].getAttribute('data-cell') == div.getAttribute('data-cell'))
        {
            eventZoom[i].classList.remove('hidden')
            eventZoom[i].classList.add('blowup')
            eventInfo[i].classList.add('hidden')
            eventFull[i].classList.remove('hidden')
        }
        else{
            eventZoom[i].classList.add('hidden')
            eventZoom[i].classList.remove('blowup')
            eventInfo[i].classList.remove('hidden')
            eventFull[i].classList.add('hidden')
        }
    }
    }

    //const filterValue = event.target.textContent.toLowerCase();
   // filterPhotos(filterValue);
  });
});

function eventReset(){
        for(let i = 0; i < eventZoom.length; i++)
        {
            eventZoom[i].classList.remove('hidden')
            eventZoom[i].classList.remove('blowup')
            eventInfo[i].classList.remove('hidden')
            eventFull[i].classList.add('hidden')
        }
}





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