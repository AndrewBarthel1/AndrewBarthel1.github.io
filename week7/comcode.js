const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

var menushow = false;



function showMenu() {
    var shown = navMenu.classList.toggle("show");
    navMenu.classList.toggle("hide");

    if(shown){
        navToggle.setAttribute("aria-expanded", "true");
        size.style.height = '10rem'
    }

    else {
        navToggle.setAttribute("aria-expanded", "false");
        size.style.height = '52px'
    }

}

navToggle.addEventListener('click', showMenu);


const trailLinks = document.querySelectorAll('.trailhead-containers');






const filterButton = document.querySelectorAll('.trailhead-filter');
const dataRequest = document.querySelector('.alert')
const filterText = document.querySelectorAll('.trailhead-filter-text');
const grid = document.querySelector('.grid-system')
const filterList = document.querySelector('.trailhead-filter-list')
const changeFilter = document.querySelectorAll('.filter-item')
const trailheads = document.querySelectorAll('.trailhead-containers')
const trailheadsmini = document.querySelectorAll('.trailhead-containers-mini')
const size = document.querySelector('.header-container')
const bookmark = document.querySelectorAll('.save-me')
const ratings = document.querySelectorAll('.diff-rating')
const a = document.querySelector('.accept')
const d = document.querySelector('.deny')
let tracker = true
let savedTrailheads = JSON.parse(localStorage.getItem('savedTrailheads')) || [];
let savedTrailheadsUpdate = savedTrailheads;
let storageSetting = localStorage.getItem('storageSetting') || true;

trailLinks.forEach(span => {
  span.addEventListener('click', (event) => {
    const url = event.currentTarget.dataset.href


    if(url && tracker)
    {
        window.location.href = url;
    }
  });
});

trailheadsmini.forEach(span => {
  span.addEventListener('click', (event) => {
    const url = event.currentTarget.dataset.href


    if(url && tracker)
    {
        window.location.href = url;
    }
  });
});

bookmark.forEach(span => {
  span.addEventListener('mouseover', (event) => {
    tracker=false;
  });
});

bookmark.forEach(span => {
  span.addEventListener('mouseleave', (event) => {
    tracker=true;
  });
});


window.addEventListener('load', function() {

ratings.forEach(rate => {

const stars = parseInt(rate.getAttribute('data-stars'),10)
const rateStars = rate.querySelectorAll('.rate-ball')
for(let i = 0; i<stars && i < rateStars.length; i++)
{
  
  rateStars[i].classList.add(rate.getAttribute('data-color'))
}
});
});

function askForAccess(){

  dataRequest.classList.remove('hidden');
}

bookmark.forEach(span => {
  span.addEventListener('click', (event) => {

    console.log(storageSetting)
    if(storageSetting == 'true'){
    let savedTrailheads = JSON.parse(localStorage.getItem('savedTrailheads')) || [];
    const href = span.getAttribute('data-href');
    const image = span.querySelector('img');

    const index = savedTrailheads.indexOf(href);
    console.log(index)
    console.log(href)
    console.log(image)


    if (index !== -1) {
      savedTrailheads.splice(index, 1);
      image.src = 'bookmark.png';
    } else {
      savedTrailheads.push(href);
      image.src = 'filledBookmark.png';
    }

    localStorage.setItem('savedTrailheads', JSON.stringify(savedTrailheads));
    savedTrailheadsUpdate = savedTrailheads
  }
  else{
    alert('accept data storage to access this feature!')
  }

  });
});



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

    if(li.textContent == 'Saved')
    {
      console.log(savedTrailheads)
      trailheads.forEach(trail => {
  const href = trail.getAttribute('data-href');

  if (savedTrailheadsUpdate.includes(href)) {
    trail.classList.remove('hidden');
  } else {
    trail.classList.add('hidden');
  }
});
    }
    else{
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
}});
});

const eventZoom = document.querySelectorAll('.event');
const eventInfo = document.querySelectorAll('.before');
const eventFull = document.querySelectorAll('.after')
const eventGrid = document.querySelector('.grid-system-events')

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

window.addEventListener('load', function() {
  console.log('loaded')

      trailheads.forEach(trail => {
  const href = trail.getAttribute('data-href');
  const image = trail.querySelector('.save-me img');
      if (savedTrailheads.includes(href))
      {
        console.log(savedTrailheads)
        console.log(image)
  image.src = 'filledBookmark.png';
  console.log(image)
      }
      else{
        image.src = 'bookmark.png';
      }
    });
});


// Load saved theme on page loade
/*window.addEventListener('load', function() {

  for(let i = 0; i < trailheads.length; i++)
  {
      if(savedTrailheads.contains(trailheads[i].getAttribute('data-href')))
      {

      }

  }
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