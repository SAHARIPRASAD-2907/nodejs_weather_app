console.log("Welcome");


const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')

const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=searchElement.value
    messageTwo.textContent="Loading....."
    messageOne.textContent=""
    fetch('http://localhost:3000/weather?address=+'+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
        }
        else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.forcastData
            // console.log(data.location);
            // console.log(data.forcastData);
        }
    })
})
})