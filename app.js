const form = document.querySelector('#searchForm');
const movieList = document.querySelector('.movies')

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    deleteImages()
    const searchTerm = form.elements.query.value;
    let type = document.querySelector('select')
    const config = {
        params: { countrylist: 67, limit: 6999, query: searchTerm },
        headers: { 'x-rapidapi-key': '009c4c57b5mshef0739f79b0e984p162487jsn376939394125', 'x-rapidapi-host': 'imdb-api1.p.rapidapi.com' }
    }
    const res = await axios.get(`https://imdb-api.com/en/API/Search${type.value}/k_8r5vw8fu/${searchTerm}`, config);
    // console.log(res.data)
    makeImages(res.data.results)
    await netflixMovie(res.data.results)
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
                name.setAttribute('Href', `https://www.imdb.com/find?s=tt&q=${replaced2}`)
                name.setAttribute('target', '_blank')
                name.setAttribute('rel', 'noopener noreferrer')
                div.append(img)
                div.append(name)
                movieList.append(div)
                doubleMovie()
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
    let allSpans = document.querySelectorAll('.span')
    for (s of allSpans) {
        let type = document.querySelector('.select2')
        const searchTerm = form.elements.query.value;
        const options = {
            method: 'GET',
            url: 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup',
            params: { term: s.innerText, country: type.value },
            headers: {
                'x-rapidapi-key': '009c4c57b5mshef0739f79b0e984p162487jsn376939394125',
                'x-rapidapi-host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com'
            }
        };

        await axios.request(options).then(function (response) {
            let arrNetflix = []
            let data = response.data.results[0].locations
            for (d of data) {
                arrNetflix.push(d.display_name)
            }
            if (arrNetflix.includes('Netflix')) {
                const a = document.createElement('a');
                const span = document.createElement('img');
                a.setAttribute('href', `https://www.netflix.com/search?q=${s.innerText}`)
                a.setAttribute('target', '_blank')
                a.setAttribute('rel', 'noopener noreferrer')
                span.src = "https://img.icons8.com/officexs/16/000000/netflix.png";
                span.classList.toggle('netflix')
                a.append(span)
                s.append(a)
            }
            if (arrNetflix.includes('Disney+')) {
                const a = document.createElement('a');
                const span = document.createElement('img');
                span.src = "https://img.icons8.com/doodle/48/000000/disney-plus.png";
                a.setAttribute('href', `https://www.disneyplus.com/nl-nl/search`)
                a.setAttribute('target', '_blank')
                a.setAttribute('rel', 'noopener noreferrer')
                span.classList.toggle('disney')
                a.append(span)
                s.append(a)
            }

            if (arrNetflix.includes('Amazon Prime Video')) {
                const a = document.createElement('a');
                const span = document.createElement('img');
                span.src = "https://img.icons8.com/color/48/000000/amazon-prime-video.png";
                a.setAttribute('href', `https://www.primevideo.com/search/ref=atv_sr_sug_4?phrase=${s.innerText}`)
                a.setAttribute('target', '_blank')
                a.setAttribute('rel', 'noopener noreferrer')
                a.append(span)
                span.classList.toggle('disney')
                s.append(a);
            }
        }).catch(function (error) {
            console.error(error);
        });
    }
}

function doubleMovie() {
    let allSpans = document.querySelectorAll('.span')
    const movieList = document.querySelectorAll('.movielist')
    const movieArr = []
    let movieArrNew = []
    for (m of movieList) {
        movieArr.push(m.textContent)
    } movieArr.sort()
    for (let i = 0; i <= movieArr.length; i++) {
        if (movieArr[i] !== movieArr[i + 1]) {
            let movie = movieArr[i]
            movieArrNew.push(movie)
        }
    }
    for (s of allSpans) {
        if (movieArrNew.includes(s.innerText)) {
            let remove = movieArrNew.indexOf(s.innerText)
            if (remove > -1) {
                movieArrNew = movieArrNew.splice(remove, 1)
                s.innerText = 'a'
            }
        }
    } allSpans[0].innerText = movieArrNew[0]
    for (s of allSpans) {
        if (s.innerText === 'a') {
            s.parentElement.remove()
        }
    }

}

function checkForDuplicates(array) {
    return new Set(array)
}