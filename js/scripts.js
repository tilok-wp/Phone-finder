// Get search value
const getSearchText = () => {
    const searchText = document.getElementById('search-text')
    let searchValue = searchText.value
    loadPhoneData(searchValue)
    searchText.value = ''
}

const loadPhoneData = searchText => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(request => request.json())
    .then(dataObject => displaySearchResult(dataObject.data))
}

const displaySearchResult = (phoneList) =>{
    const searchResult = document.getElementById('search-result')
    searchResult.innerHTML = ''
    const findPhoneCount = document.getElementById('find-phone-count')
    findPhoneCount.innerText = `Search result: ${phoneList.length} Phones found`

    let count = 1
    phoneList.forEach(phone => {
        if(count <=20){
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
    console.log(url)
    fetch(url)
    .then(request => request.json())
    .then(dataObject => displayPhoneDetails(dataObject.data))

}

const displayPhoneDetails = (data) => {
    const phoneDetails = document.getElementById('phone-details')
    const div = document.createElement('div')
    div.classList.add('col-12')
    div.classList.add('my-3')
    div.innerHTML = `
        <div class="card p-3 text-center">
            <img src="${data.image}" class="card-img-top" alt="${data.phone_name}">
            <div class="card-body">
            <h5 class="card-title">${data.name}</h5>
            <p class="card-text">Brand: ${data.brand}</p>
            </div>
        </div>
    `
    phoneDetails.appendChild(div)
}


