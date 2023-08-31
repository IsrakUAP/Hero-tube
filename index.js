const handleCategory=async()=>{
const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
const data = await response.json();

const tabList = document.getElementById('tab-list');
data.data.forEach(category=> {
    const tab= document.createElement("div");
    tab.innerHTML=`<a class="tab ">${category.category}</a> `;
    tabList.appendChild(tab);
    console.log(data.data);
});
}

handleCategory();