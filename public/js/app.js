console.log(
    "client js loading"
)


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message = document.querySelector('#message')

//message.textContent = 'From Javascript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/weather?address=${search.value}`).then((response) => {
        response.json().then((data) => {
            message.textContent = `Temperature in ${data.location} is ${data.forecastdata.temperature} but feels like ${data.forecastdata.feelslike}`
        })
    })
}) 