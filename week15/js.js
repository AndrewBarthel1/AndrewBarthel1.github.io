document.querySelectorAll('.morph-btn').forEach(btn => {
    
    const short = btn.querySelector('.short');
    const long = btn.querySelector('.full');

    function show() {
        //short.classList.add("hidden");
        if(window.innerWidth < 768)
        {
            long.classList.remove("hidden");
            document.querySelectorAll('.morph-btn').forEach(btn => {
                if(btn.matches(':hover'))
                {
                long.classList.remove("hidden");
                btn.classList.add('addWidth');
                }
                else{
                btn.classList.add('hidden');
                
                }

            })

        }
    }

    function hide() {
        long.classList.add("hidden");
        if(window.innerWidth < 768)
        {
            document.querySelectorAll('.morph-btn').forEach(btn => {
                btn.classList.remove('hidden')
                btn.classList.remove('addWidth');

            })

        }
    }

    btn.addEventListener('mouseover', show);
    btn.addEventListener('mouseleave', hide);

});

const displayMsg = document.getElementById('click-msg');

document.addEventListener('mousemove', function(event) {
    displayMsg.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
});

document.addEventListener('click', function(event) {
    if (!event.target.closest('button')) {
        displayMsg.style.opacity = '1';
        setTimeout(() => {
            displayMsg.style.opacity = '0';
        }, 5000); 
    } else {
        displayMsg.style.opacity = '0';
    }
});