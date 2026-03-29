const iselect = document.querySelectorAll('.iselect')
const itext = document.querySelectorAll('.itext')
const iimg = document.querySelectorAll('.img1')


window.addEventListener('load', () => {
  itext.forEach(el => {
    el.classList.add('hide');
  });
});

window.addEventListener('load', () => {
  iimg.forEach(el => {
    el.classList.add('hide');
  });
});


iselect.forEach((select, index) => {
  select.addEventListener('click', () => {
    const textEl = itext[index];
    const imgEl = iimg[index];

    textEl.classList.toggle('hide');
    imgEl.classList.toggle('hide');


  });
});

const displayMsg = document.getElementById('click-msgb');

document.addEventListener('mousemove', function(event) {
    displayMsg.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
});

document.addEventListener('click', function(event) {
    if (!event.target.closest('.iselect')) {
        displayMsg.style.opacity = '1';
        setTimeout(() => {
            displayMsg.style.opacity = '0';
        }, 3000); 
    } else {
        displayMsg.style.opacity = '0';
    }
});