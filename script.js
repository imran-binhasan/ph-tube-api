// Date & TIme
function getTime(second){
    return parseInt(second/3600)+' hrs '+ parseInt((second%3600)/60) + ' min '+ 'ago'
    };


// Fetch Categories
const loadCategories = async()=>{
    try{
        const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
        const data = await res.json();
        displayCategories(data.categories);
    }
    catch(error){
        console.log(error)
 }
}
// Display Categories
const displayCategories = (categories)=>{
    categories.forEach(element =>{
        const btnContainer =  document.createElement('div');
        const container = document.getElementById('categories-container');
        btnContainer.innerHTML = `<button class="btn category-btn" id="btn-${element.category_id}" onclick="loadByCategory(${element.category_id})">
                                    ${element.category}
                                  </button>`
        container.appendChild(btnContainer);   
});
}

// Sort By Category
const loadByCategory =async(id) => {
    document.getElementById('video-container').innerHTML = " ";
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
    
    const data = await res.json();
    if(data.category.length === 0){
        document.getElementById('video-container').classList = 'w-11/12 mx-auto gap-6 py-10';
        document.getElementById('video-container').innerHTML = `<div class="flex items-center justify-center flex-col">
            <div class="min-h-vw">
              <img src="assets/Icon.png" alt="">
            </div>
            <h2 class="font-bold text-xl text-center">Oops !! Sorry, there is no content here</h2>
          </div>`

        
    }
    else{
        document.getElementById('video-container').classList = "w-11/12 mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-10";
    }
    // Adding red background for active button
    const buttons = document.getElementsByClassName('category-btn');
    for (btn of buttons){
        btn.classList = 'btn category-btn';
    }
    const activeBtn = document.getElementById(`btn-${id}`);
    activeBtn.classList=('btn category-btn active');
    displayVideos(data.category)

}

// Modal
function handleModal(id){
    fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${id}`)
    .then(res=>res.json())
    .then(data=>displayModal(data.video))
    .catch(error => console.error('error occured'))
}

const displayModal =(data)=>{
    console.log(data.description)
    document.getElementById('modal').click()
    document.getElementById('modal-content').innerHTML=`
    <div>
    <img class="rounded-lg w-full object-cover mx-auto" src="${data.thumbnail}">
    </div>
    <p class="text-gray-600 text-justify text-sm">${data.description}</p>`
}

// Fetch Videos

const loadVideos = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
    const data = await res.json();
    displayVideos(data.videos)
}
// Display Videos
const displayVideos =(videos) =>{
    videos.forEach((element)=>{
      
        console.log(element);
        const div = document.createElement('div');
        const vidContainer = document.getElementById('video-container');
        div.classList = 'card card-compact';
        const time = getTime(element.others.posted_date);
        div.innerHTML = `
        <figure class="h-[200px] relative">
        <img class="h-full w-full object-cover" src=${element.thumbnail} alt="Shoes"/>
        <span class="absolute right-2 text-white text-sm p-1 rounded-lg bg-black bottom-2">
        ${element.others.posted_date == 0?' ':time}
        </span>
        </figure>
        <div class="py-2 px-0 flex">
        <div class="w-[15%]">
        <img class="h-8 w-8 object-cover rounded-full" src=${element.authors[0].profile_picture}>
        </div>
        <div class="w-[85%]">
        <h4 class="font-bold">${element.title}</h4>
        <div class="flex items-center gap-2">
        <p class="text-gray-600">${element.authors[0].profile_name}</p>
        ${element.authors[0].verified===true ? `<img class="h-[20px]" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png">`:''}
        </div>
        <p class="text-gray-600">${element.others.views} Views</p>
        <button class="btn bg-pink-600 text-white btn-sm" onclick="handleModal('${element.video_id}')">Details</button>
        </div>
        </div>`;
       
        
        vidContainer.appendChild(div)
        
    })
}

// Load Specific Categories






loadCategories()
loadVideos()


