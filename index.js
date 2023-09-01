const handleCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();

    const tabList = document.getElementById('tab-list');
    data.data.forEach(category => {
        const tab = document.createElement("div");
        tab.innerHTML = `<a id="tabs" onclick="categoryLoad('${category.category_id}')" class="tab ">${category.category}</a> `;
        tabList.appendChild(tab);

        // console.log(data.data);

    });
};
const categoryLoad = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    data.data.forEach(video => {
        const cardList = document.createElement("div");
        cardList.className = "card";

        cardList.innerHTML = `
                <div  class="card w-30 bg-base-100 shadow-xl">
                <figure><img class="w-[100%] h-[200px]" src="${video.thumbnail}"/></figure>
                <div class="card-actions justify-end">
                    <p class="bg-black text-white -mt-6 px-3 rounded-lg">${video.duration}</p>
                </div>
                <div class="card-body">
                    <div class="flex items-center gap-4">
                        <img class="w-[40px] h-[40px] rounded-full" src="${video.authors[0].profile_picture}">
                        <p class="font-bold text-[20px]">${video.title}</p>
                    </div>
                    <p>${video.authors[0].profile_name} <img src="${video.authors[0]?.verified}"></p>
                    <p>${video.others.views} views</p>
                </div>
                </div>
            `;
           

        cardContainer.appendChild(cardList);
    });
    const checkCategory = "1005";
    const dataCheck = data.data.find(item => item.category_id === checkCategory);
    if (categoryId === checkCategory && !dataCheck) {
        const emptyTab = document.createElement("div");
        emptyTab.innerHTML=`<div class="flex justify-center items-center h-[700px] ml-[700px] w-[500px]"><div></div>
        <div class="text-center"><img class="ml-14 mb-4" src="./Icon.png" alt="">
        <p>Oops!! Sorry, There is no content here</p></div></div>`
    cardContainer.appendChild(emptyTab);
    }
    console.log(data.data);
};

categoryLoad("1000");

handleCategory();
