let newBtn = document.querySelector("#new-cat").addEventListener('click', newCat);
const endpoint =  "https://api.thecatapi.com/v1/images/search";
let moreBtn = document.querySelector('#more-cat').addEventListener('click', createCat);
let btnText = '';
let num = 3;

async function newCat() {
    try {
        const catImgs = document.querySelectorAll('.cat-img');
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${catImgs.length}`);
        if (!response.ok) throw Error(response.statusText);

        const json = await response.json();

        for (let i = 0; i < catImgs.length; i++) {
            catImgs[i].src = json[i].url;
        }
    } catch (err) {
        console.log(err);
        alert('No More Cats :(');
    }
}


function createCat(){
  if(num>1)
  {
  const catfinder = document.querySelector('.hidden')
  catfinder.classList.remove('hidden')
  num--;
  }
  else{
    const btn = document.querySelector('#more-cat')
    btn.textContent="No more cats in storage!"
  }
}

newCat();