document.querySelectorAll('.morph-btn').forEach(btn => {
    
    const short = btn.querySelector('.short');
    const long = btn.querySelector('.full');

    function show() {
        //short.classList.add("hidden");
        long.classList.remove("hidden");
    }

    function hide() {
        long.classList.add("hidden");
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
        }, 3000); 
    } else {
        displayMsg.style.opacity = '0';
    }
});