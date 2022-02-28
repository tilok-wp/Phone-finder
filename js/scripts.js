// Get search value
const getSearchText = () => {
    const searchText = document.getElementById('search-text')
    let searchValue = searchText.value
    loadPhoneData(searchValue)
    searchValue = ''
}

const loadPhoneData = searchText => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(request => request.json())
    .then(dataObject => displaySearchResult(dataObject.data))
}

const displaySearchResult = (phoneList) =>{
    const searchResult = document.getElementById('search-result')
    console.log(phoneList.length)
    let count = 1
    phoneList.forEach(phone => {
        // console.log(phone)
        if(count <=20){
            const div = document.createElement('div')
            div.classList.add('col-12')
            div.classList.add('col-md-4')
            div.classList.add('my-3')
            div.innerHTML = `
                <div class="card">
                    <img src="${phone.image}" class="card-img-top img-fluid" alt="${phone.phone_name}">
                    <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                    <a href="#" class="btn btn-primary">Details</a>
                    </div>
                </div>
            `
            searchResult.appendChild(div)
            count++

        }
    });

}


