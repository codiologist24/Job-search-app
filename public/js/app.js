console.log('Client side js file is loaded')



const weather_form=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.querySelector('#mes-1')
const message2=document.querySelector('#mes-2')

message1.textContent='Loading...!'
message2.textContent=''

weather_form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            message1.textContent=data.error
            message2.textContent=''
        }
        else
        {
            message1.textContent=data.location
            message2.textContent=data.forecast
        }
    })
}
)
})