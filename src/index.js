document.addEventListener("DOMContentLoaded", () => {

    let goodDogFilter = document.getElementById('good-dog-filter');
    let dogBar = document.querySelector('#dog-bar');

    function getAllDogs() {
        fetch('http://localhost:3000/pups') 
        .then(res => res.json())
        .then(dogData => renderDogs(dogData));
    }

    function renderDogs(dogs) {
        dogBar.innerHTML = "";
        dogs.forEach(dog => renderOneDog(dog));
    }

    function filterDogs(dogs) {
        return dogs.filter(dog => dog.isGoodDog);
    }

    function fetchAndRenderDogs() {
        fetch('http://localhost:3000/pups')
            .then(res => res.json())
            .then(dogData => {
                const filteredDogs = goodDogFilter.innerText === 'Filter good dogs: ON' ? filterDogs(dogData) : dogData;
                renderDogs(filteredDogs);
            });
    }

    getAllDogs() 

    let dogInfo = document.querySelector('#dog-info');

    function renderOneDog(dog) {
        let span = document.createElement('span');
        span.innerText = `${dog.name}`;
        span.className = `${dog.isGoodDog}`;
        span.addEventListener('click', () => {
            dogInfo.innerHTML =`
                <img src="${dog.image}">
                <h2>${dog.name}</h2>
                <button type = 'button'>${dog.isGoodDog ? 'Good Dog' : 'Bad Dog'}</button>
            `
        let goodDogButton = document.querySelectorAll('button')[1];

        if (goodDogButton) {
            goodDogButton.addEventListener('click', () => {
                dog.isGoodDog = !dog.isGoodDog;
                goodDogButton.innerText = dog.isGoodDog ? 'Good Dog' : 'Bad Dog';

                fetch(`http://localhost:3000/pups/${dog.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ isGoodDog: dog.isGoodDog })
                })
                .then(fetchAndRenderDogs);
            });
            
         }

        });
        document.querySelector('#dog-bar').appendChild(span);

    }

    goodDogFilter.addEventListener('click', () => {
        if (goodDogFilter.innerText === 'Filter good dogs: OFF') {
            goodDogFilter.innerText = 'Filter good dogs: ON'
         } else {
            goodDogFilter.innerText = 'Filter good dogs: OFF'
         }
         fetchAndRenderDogs();
    });

})