// Get search value
const getSearchText = () => {
    const searchText = document.getElementById('search-text')
    let searchValue = searchText.value.toLowerCase()
    if(searchValue != ''){
        loadPhoneData('https://openapi.programming-hero.com/api/phones?search=', searchValue)
        cleanInnerHtml('phone-details')
        spinnerDisplay('block')
    }else{
        cleanInnerHtml('search-result')
        cleanInnerHtml('phone-details')
        const searchMessage = cleanInnerHtml('search-message')
        searchMessage.classList.add('text-danger')
        searchMessage.innerText = `Please write some text`
    }
    searchText.value = ''
}
// Load data from API

const loadPhoneData = (apiLink,searchText) => {
    const url = apiLink.concat(searchText)
    fetch(url)
    .then(request => request.json())
    .then(dataObject => displaySearchResult(dataObject.data, searchText))
}

// Display result option
const displaySearchResult = (phoneList, searchText) =>{
    spinnerDisplay('none')
    const searchResult = cleanInnerHtml('search-result')
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
        if(count <=20){
            singleSearchContent(phone, searchResult)
            count++
            if(count == 21){
                const div = document.createElement('div')
                div.classList.add('col-12')
                div.classList.add('text-center')
                div.innerHTML = `<div class="col-md-12 text-center"> <button class="btn btn-outline-primary px-4" type="button" id="load-more" onclick="load-more('${searchText}')">Load more</button> </div>`
                searchResult.appendChild(div)
            }
        }
    });
}

const loadDetails = (idName) => {
    const url = `https://openapi.programming-hero.com/api/phone/${idName}`
    fetch(url)
    .then(request => request.json())
    .then(dataObject => displayPhoneDetails(dataObject.data))
}
// Single search congent
const singleSearchContent = (phone, reultContainer) => {
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
            reultContainer.appendChild(div)
}
// Display phone data
const displayPhoneDetails = (data) => {
    const phoneDetails = cleanInnerHtml('phone-details')
    const div = document.createElement('div')
    div.classList.add('col-md-8')
    div.classList.add('offset-md-2')
    div.innerHTML = `
        <div class="card d-flex p-5 my-3">
            <div class="row">
                <div class="col-md-5 text-center">
                    <img src="${properityContent(data?.image)}" class="card-img-top" alt="Phone Image">
                </div>
                <div class="col-md-7 my-3">
                    <h3 class="card-title">${properityContent(data?.name)}</h3>
                    <p class="card-text"><strong> Brand:</strong> ${properityContent(data?.brand)}</p>
                    <p class="card-text"><strong> ReleaseDate:</strong> ${properityContent(data?.releaseDate)}</p>
                    <p class="card-text"><strong> Sensors:</strong> ${properityContent(data?.mainFeatures?.sensors.join(', '))}</p>
                </div>
                <div class="col-md-12">
                    <h4 class="card-title mt-5">Main Features</h4>
                    <p class="card-text"><strong>ChipSet:</strong> ${properityContent(data?.mainFeatures?.chipSet)}</p>
                    <p class="card-text"><strong>DisplaySize:</strong> ${properityContent(data?.mainFeatures?.displaySize)}</p>
                    <p class="card-text"><strong>Memory:</strong> ${properityContent(data?.mainFeatures?.memory)}</p>
                    <p class="card-text"><strong>Storage:</strong> ${properityContent(data?.mainFeatures?.storage)}</p>
                    <h4 class="card-title mt-3">Others</h4>
                    ${othersInfo(data?.others)}
                </div>
            </div>      
        `
        phoneDetails.appendChild(div)
}

// Check object properity avaiable
const properityContent = (target) => {
    if(target != undefined && target != ''){
        return  target
    }else {
        return ' info Not available'
    }
}
// Inner html clean
const cleanInnerHtml = (id) => {
   const element =  document.getElementById(id)
   element.innerHTML = ''
   return element
}
// Get others information
const othersInfo =  (dataObject) => {
    if(dataObject != undefined && dataObject != ''){
        let paragraph = ''
        Object.entries(dataObject).forEach(([key, value]) => {
            paragraph += `<p><strong>${key}: </strong> ${dataObject[key]}</p>`
          })
        return paragraph
    }else {
        return 'No Others information found'
    }
}

const spinnerDisplay = ( noneBlock) => {
    document.getElementById('spinner').style.display = noneBlock;
}