const API_URL = 'https://www.google.com/complete/search?client=firefox&q='

const suggestions = document.querySelector('.suggestions')
const inputSearch = document.querySelector('.search-input')

const setSuggestItems = (totalItems) =>{
    console.log(totalItems)
    const fragment = document.createDocumentFragment()
   totalItems.forEach(itemData=>{
        // const item = `li class="suggest-item">${itemData}</li>` 
        // fragment.innerHtml = item
        const li = document.createElement('li')
        li.setAttribute('class','suggest-item')
        li.textContent = itemData
        fragment.append(li)
   })

   return fragment
}


const setSuggestions = (allSuggestions) =>{
    suggestions.innerHTML = '' 
   const fragmentContainer = setSuggestItems(allSuggestions);         
   suggestions.append(fragmentContainer);                
}

const fetchSuggestions = async(query) =>{
    // console.log(query.target.value)
    let searchQuery = query.target.value
   try{
       const data = await fetch('https://www.google.com/complete/search?client=firefox&q=' + searchQuery);
       const json = await data.json();   
       setSuggestions(json[1]);
   }catch(error){
       console.error("your error :", error) 
   }
}


function debounce(callback, delay){
    let timerId;
    return function(...args){
        console.log(args)
         let context = this 
        clearTimeout(timerId)
        timerId = setTimeout(()=>{
            callback.apply(this, args); 
        }, delay)
    }
}


const betterFetch = debounce(fetchSuggestions, 1000);


inputSearch.addEventListener('input',betterFetch)





