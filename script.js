//Get API key
const nasaImgAPI = 'https://api.nasa.gov/planetary/apod?api_key=ZZ814JxDCFalaQcXQzdXiDhbjIDo3tjBfNVDGxR2'
const weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=5661c8b362d56a87001bdd87dc00ee3f'
const quoteAPI = 'https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en'
//set global variables

//Get html tags


//get background image
class BackgroundImg {
    constructor(image, description, temp, location) {
        this.image = image

    }
    setBackground() {
        console.log('setBackground')
        const body = document.querySelector('body');
        console.log(this.image)
        body.style.backgroundImage = `url(${this.image})`
        body.classList.add('background')
    }
    getImageOfDay() {
        axios({
            url: nasaImgAPI,
            method: 'get',
        })
            .then(response => {
                this.image = response.data.url
                this.setBackground()

                //console.log('after background image', this.image)
                //console.log(response.data.url)
            })
    }


    getWeatherofTheDay() {
        axios({
            url: weatherAPI,
            method: 'get',
        })
            .then(response => {
                const weatherId = document.querySelector('#weather')
                let temp = response.data.main.temp
                console.log(response.data.main.temp)
                weatherId.classList.add('weather')
                weatherId.innerText = temp

                const descId = document.querySelector('#desc')
                let description = response.data.weather[0].description
                console.log(response.data.weather[0].description)
                descId.classList.add('weather')
                descId.innerText = description

                const locationID = document.querySelector('#location')
                let location = response.data.name
                console.log(response.data.name)
                locationID.classList.add('weather')
                locationID.innerText = location

            })
            .catch(error => {
                console.log(error, `Uh oh`);
            })
    }

    getQuoteofTheDay() {
        axios({
            url: quoteAPI,
            method: 'get',
        })
            .then(response => {
                const quoteID = document.querySelector('#quote')
                let quote = response.data.quoteText
                quoteID.classList.add('quotes')
                quoteID.innerHTML = `"${quote}"`

                const authorId = document.querySelector('#author')
                let author = response.data.quoteAuthor
                authorId.classList.add('author')
                authorId.innerHTML = `-- ${author} --`
                console.log(response.data.quoteAuthor)

            })
            .catch(error => {
                console.log(error, `Uh oh`);
            })


    }
    getCurrentTime() {
        const timeID = document.querySelector('#currentTime')
        console.log(moment().format('LTS'))
        timeID.innerText = moment().format('LTS')
    }
}


// update backimage
window.onload = function () {
    console.log('Loading')
    let background = new BackgroundImg()
    background.getImageOfDay()
    background.getWeatherofTheDay()
    background.getQuoteofTheDay()
    background.getCurrentTime()
}




