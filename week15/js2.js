const galleryPics = document.querySelectorAll('.gallery-item')
const galleryButton = document.querySelectorAll('.gallery-selection')
const galleryDes = document.querySelector('.gallery-description')
galleryDes.textContent = galleryPics[0].getAttribute('alt')

galleryButton[0].addEventListener('click', function() {
    for(let i = 0; i<galleryPics.length;i++)
    {
        if(!galleryPics[i].classList.contains('hide'))
        {
            if(i==0)
            {
                galleryPics[galleryPics.length-1].classList.remove('hide');
                galleryDes.textContent = galleryPics[galleryPics.length-1].getAttribute('alt')
                galleryPics[i].classList.add('hide')
                break;
            }
            else{
                galleryPics[i-1].classList.remove('hide');
                galleryDes.textContent = galleryPics[i-1].getAttribute('alt')
                galleryPics[i].classList.add('hide')
                break;
            }
        }
    }
});

galleryButton[1].addEventListener('click', function() {
    for(let i = 0; i<galleryPics.length;i++)
    {
        if(!galleryPics[i].classList.contains('hide'))
        {
            if(i==galleryPics.length-1)
            {
                galleryPics[0].classList.remove('hide');
                galleryDes.textContent = galleryPics[0].getAttribute('alt')
                galleryPics[i].classList.add('hide')
                break;
            }
            else{
                galleryPics[i+1].classList.remove('hide');
                galleryDes.textContent = galleryPics[i+1].getAttribute('alt')
                galleryPics[i].classList.add('hide')
                break;
            }
        }
    }
});

//document.addEventListener('click',function(){});