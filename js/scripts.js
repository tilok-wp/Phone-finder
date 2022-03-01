// Get search value
const getSearchText = () => {
    const searchText = document.getElementById('search-text')
    let searchValue = searchText.value.toLowerCase()
    if(searchValue != ''){
        loadPhoneData(searchValue)
        cleanInnerHtml('phone-details')
    }else{
        cleanInnerHtml('search-result')
        cleanInnerHtml('phone-details')
        const searchMessage = cleanInnerHtml('search-message')
        searchMessage.classList.add('text-danger')
        searchMessage.innerText = `Please write some text`

    }
    searchText.value = ''
}

const loadPhoneData = searchText => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(request => request.json())
    .then(dataObject => displaySearchResult(dataObject.data))
}

const displaySearchResult = (phoneList) =>{
    const searchResult = cleanInnerHtml('search-result')
    searchResult.innerHTML = ''
    const searchMessage = cleanInnerHtml('search-message')
    console.log()
    if(phoneList.length > 0){
        searchMessage.classList.remove('text-danger')
        searchMessage.innerText = `Search result: ${phoneList.length} Phones found`
        
    }else{
        searchMessage.classList.add('text-danger')
        searchMessage.innerText = `No phone Found`
    }

    let count = 1
    phoneList.forEach(phone => {
        if(count <=2000){
            const div = document.createElement('div')
            div.classList.add('col-12')
            div.classList.add('col-md-4')
            div.classList.add('my-3')
            div.innerHTML = `
                <div class="card p-3 text-center">
                    <img src="${phone.image}" class="card-img-top" alt="${phone.phone_name}">
                    <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">Brand: ${phone.brand}</p>
                    <button class="btn btn-primary" onclick="loadDetails('${phone.slug}')">Details</button>
                    </div>
                </div>
            `
            searchResult.appendChild(div)
            count++

        }
    });

}

const loadDetails = (idName) => {
    const url = `https://openapi.programming-hero.com/api/phone/${idName}`
    fetch(url)
    .then(request => request.json())
    .then(dataObject => displayPhoneDetails(dataObject.data))

}

const displayPhoneDetails = (data) => {
    const phoneDetails = cleanInnerHtml('phone-details')
    // console.log(data)
    const div = document.createElement('div')
    div.classList.add('col-8')
    div.classList.add('offset-md-2')
    div.innerHTML = `
        <div class="card d-flex p-3 my-3">
            <div class="row">
                <div class="col-md-5">
                    <img src="${properityContent(data?.image)}" class="card-img-top" alt="Phone Image">
                </div>
                <div class="col-md-7 my-3">
                    <h3 class="card-title">${properityContent(data?.name)}</h3>
                    <p class="card-text"><strong> Brand:</strong> ${properityContent(data?.brand)}</p>
                    <p class="card-text"><strong> ReleaseDate:</strong> ${properityContent(data?.releaseDate)}</p>
                    <p class="card-text"><strong> Sensors:</strong> ${properityContent(data?.mainFeatures?.sensors.toString())}</p>
                </div>
                <div class="col-md-12">
                    <h4 class="card-title mt-5">Main Feature</h4>
                    <p class="card-text"><strong>ChipSet:</strong> ${properityContent(data?.mainFeatures?.chipSet)}</p>
                    <p class="card-text"><strong>DisplaySize:</strong> ${properityContent(data?.mainFeatures?.displaySize)}</p>
                    <p class="card-text"><strong>Memory:</strong> ${properityContent(data?.mainFeatures?.memory)}</p>
                    <p class="card-text"><strong>Storage:</strong> ${properityContent(data?.mainFeatures?.storage)}</p>
                </div>
            </div>         
        `
        phoneDetails.appendChild(div)


    console.log(data?.mainFeatures)
    // console.log(properityContent(data?.others))
    // console.log(properityContent(data?.releaseDate))
    // console.log(typeof(data?.releaseDate))
    // console.log(data?.releaseDate)
    // console.log(properityContent(data?.mainFeatures))
    // console.log(properityContent(data?.mainFeatures?.sensors.toString()))
}


const properityContent = (target) => {
    if(target != undefined && target != ''){
        return  target
    }else {
        return ' info Not available'
    }
}

const cleanInnerHtml = (id) => {
   const element =  document.getElementById(id)
   element.innerHTML = ''
   return element
}