const iselect = document.querySelectorAll('.iselect')
const itext = document.querySelectorAll('.itext')
const iimg = document.querySelectorAll('.img1')

iselect.forEach(select => {

const arsel = Array.from(iselect)
select.addEventListener('click',function(){

    if(itext[arsel.indexOf(select)].classList.contains('hide'))
    {
itext[arsel.indexOf(select)].classList.remove('hide')
iimg[arsel.indexOf(select)].classList.remove('hide')
    }
    else{
        itext[arsel.indexOf(select)].classList.add('hide')
        iimg[arsel.indexOf(select)].classList.add('hide')
    }

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