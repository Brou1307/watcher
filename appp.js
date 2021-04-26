const form = document.querySelector('#searchForm');
const movieList = document.querySelector('.movies')
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    deleteImages()
    const searchTerm = form.elements.query.value;
    const config = {
        params: { countrylist: 67, limit: 6999, query: searchTerm },
        headers: { 'x-rapidapi-key': '009c4c57b5mshef0739f79b0e984p162487jsn376939394125', 'x-rapidapi-host': 'imdb-api1.p.rapidapi.com' }
    }
    const res = await axios.get(`https://imdb-api.com/en/API/Search/k_8r5vw8fu/${searchTerm}`, config);
    console.log(res)
    makeImages(res.data.results)
    netflixMovie(res.data)

    // form.elements.query.value = '';
})



const makeImages = (shows) => {
    try {
        for (let result of shows) {
            if (result.image) {
                const div = document.createElement('div')
                const img = document.createElement('IMG');
                const name = document.createElement('a');
                div.classList.toggle('movielist')
                name.classList.toggle('span')
                img.classList.toggle('images')
                img.src = result.image;
                name.innerText = result.title
                const replaced = result.title.split(' ').join('-');
                const replaced2 = replaced.split("'").join('');
                name.setAttribute('Href', `https://www.justwatch.com/nl/tv-series/${replaced2}`)
                div.append(img)
                div.append(name)
                movieList.append(div)
            }
        }
    } catch {
        const h2 = document.createElement('h2');
        h2.innerText = "Niets gevonden"
        movieList.append(h2)
    }
}


const deleteImages = () => {
    const currentIMG = document.querySelectorAll('.movielist')
    const h2 = document.querySelector('h2')
    if (h2) {
        h2.remove()
    }
    for (i of currentIMG) {
        i.remove()
    }
}



const netflixMovie = async function (shows) {
    const searchTerm = form.elements.query.value;
    const options = {
        method: 'GET',
        url: 'https://unogsng.p.rapidapi.com/search',
        params: {
            countrylist: 67,
            limit: 6999,
            query: searchTerm,
        },
        headers: {
            'x-rapidapi-key': '009c4c57b5mshef0739f79b0e984p162487jsn376939394125',
            'x-rapidapi-host': 'unogsng.p.rapidapi.com'
        }
    };

    await axios.request(options).then(function (response) {
        const form = document.querySelector('#searchForm');
        const searchTerm = form.elements.query.value.toUpperCase()
        let allSpans = document.querySelectorAll('.span')

        let arrNetflix = []
        let arrHome = []
        let lala = response.data.results
        for (i of lala) {
            arrNetflix.push(i.title)
        }
        for (let result of allSpans) {
            if (arrNetflix.includes(result.textContent)) {
                const span = document.createElement('img');
                span.src = "https://img.icons8.com/officexs/16/000000/netflix.png";
                span.classList.toggle('badges')
                result.append(span)
            } else {
                console.log(false)
            }
        }
    }).catch(function (error) {
        console.error(error);
    });
}


