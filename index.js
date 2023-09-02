const handleCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();

    const tabList = document.getElementById('tab-list');
    data.data.forEach(category => {
        const tab = document.createElement("div");
        tab.innerHTML = `<button id="tabs"  onclick="categoryLoad('${category.category_id}')" class="tab hover:bg-red-700 rounded-lg">${category.category}</button> `;
        tabList.appendChild(tab);
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
        const isVerified = video.authors[0]?.verified === true;
        const postDate = video.others.posted_date;
        const hr = `${postDate / 3600}`;
        const hrs = parseInt(hr);
        const min = `${postDate % 3600 / 60}`;
        const mins = parseInt(min);
        const totalTime = `${hrs}hrs ${mins}min ago`;
        cardList.innerHTML = `
                <div  class="card w-30 bg-base-100 shadow-xl">
                <figure><img class="w-[100%] h-[200px]" src="${video.thumbnail}"/></figure>
                <div class="card-actions justify-end">
                    <p class="time-tag bg-black text-white -mt-6 px-3 rounded-lg">${totalTime}</p>
                </div>
                <div class="card-body">
                    <div class="flex items-center gap-4">
                        <img class="w-[40px] h-[40px] rounded-full" src="${video.authors[0].profile_picture}">
                        <p class="font-bold text-[20px]">${video.title}</p>
                    </div>
                    <div class="inline-flex space-x-4 items-center">${video.authors[0].profile_name}${isVerified ? `<img class="ml-2 w-[20px] h-[20px]" src="./verified.png">` : ""}</div>
                    <p>${video.others.views} views</p>
                </div>
                </div>
            `;


        cardContainer.appendChild(cardList);
        if (postDate === "") {
            const timeTag = cardList.querySelector(".time-tag");
            timeTag.style.display = "none";
        }

    });
    const checkCategory = "1005";
    const dataCheck = data.data.find(item => item.category_id === checkCategory);
    if (categoryId === checkCategory && !dataCheck) {
        const emptyTab = document.createElement("div");
        emptyTab.innerHTML = `<div class="flex justify-center items-center h-[700px] mx-auto ml-0 w-full md:ml-[200px] lg:ml-[700px] lg:w-[500px]">
        <div></div>
        <div class="text-center">
            <img class="ml-16 mb-4" src="./Icon.png" alt="">
            <p class="font-bold text-[25px]">Oops!! Sorry, There is no<br> content here</p>
        </div>
    </div>
    `
        cardContainer.appendChild(emptyTab);
    }
    console.log(data.data);
};
document.getElementById("sort-by-view").addEventListener("click", function () {

    const categoryLd = async (categoryId) => {
        const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
        const data = await response.json();
        const cardContainer = document.getElementById("card-container");
        cardContainer.innerHTML = "";
        data.data.forEach(video => {
            video.others.views = parseInt(video.others.views);
        });

        data.data.sort((a, b) => b.others.views - a.others.views);

        data.data.forEach(video => {
            const cardList = document.createElement("div");
            cardList.className = "card";
            const isVerified = video.authors[0]?.verified === true;
            const postDate = video.others.posted_date;
            const hr = `${postDate / 3600}`;
            const hrs = parseInt(hr);
            const min = `${postDate % 3600 / 60}`;
            const mins = parseInt(min);
            const totalTime = `${hrs}hrs ${mins}min ago`;
            cardList.innerHTML = `
                    <div  class="card w-30 bg-base-100 shadow-xl">
                    <figure><img class="w-[100%] h-[200px]" src="${video.thumbnail}"/></figure>
                    <div class="card-actions justify-end">
                        <p class="time-tag bg-black text-white -mt-6 px-3 rounded-lg">${totalTime}</p>
                    </div>
                    <div class="card-body">
                        <div class="flex items-center gap-4">
                            <img class="w-[40px] h-[40px] rounded-full" src="${video.authors[0].profile_picture}">
                            <p class="font-bold text-[20px]">${video.title}</p>
                        </div>
                        <div class="inline-flex space-x-4 items-center">${video.authors[0].profile_name}${isVerified ? `<img class="ml-2 w-[20px] h-[20px]" src="./verified.png">` : ""}</div>
                        <p>${video.others.views}K views</p>
                    </div>
                    </div>
                `;


            cardContainer.appendChild(cardList);
            if (postDate === "") {
                const timeTag = cardList.querySelector(".time-tag");
                timeTag.style.display = "none";
            }

        });
        const checkCategory = "1005";
        const dataCheck = data.data.find(item => item.category_id === checkCategory);
        if (categoryId === checkCategory && !dataCheck) {
            const emptyTab = document.createElement("div");
            emptyTab.innerHTML = `<div class="flex justify-center items-center h-[700px] mx-auto ml-0 w-full md:ml-[200px] lg:ml-[700px] lg:w-[500px]">
            <div></div>
            <div class="text-center">
                <img class="ml-16 mb-4" src="./Icon.png" alt="">
                <p class="font-bold text-[25px]">Oops!! Sorry, There is no<br> content here</p>
            </div>
        </div>`
            cardContainer.appendChild(emptyTab);
        }
        console.log(data.data);
    };
    categoryLd("1000");
    categoryLd("1001");
    categoryLd("1003");
});


categoryLoad("1000");

handleCategory();
