const total = document.getElementById('totalCount');
// const open = document.getElementById('openbtn');
let allData;
const removePrimaryBtn = ()=>{
    const btns = document.querySelectorAll('.tab-btn-section .btn');
    btns.forEach((btn)=>{
        btn.classList.remove('btn-primary')
    })
}

const loadAllIssues = async () => {

    const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues`);
    const jsonData = await response.json();
    allData = jsonData.data;
    displayAllIssues(jsonData.data);


}

const displayAllIssues = (items,btn) => {
    total.innerText = `${items.length}`
   if(btn){
     removePrimaryBtn();
    btn.classList.add('btn-primary')
   }
     displayIssues(items)
}

const displayOpenIssues = (items,btn) => {


     if(btn){
     removePrimaryBtn();
    btn.classList.add('btn-primary')
   }
    const openFilteredItems = items.filter(item => item.status == 'open');
    total.innerText = `${openFilteredItems.length}`
    displayIssues(openFilteredItems)

}

const displayCloseIssues = (items,btn) =>{
 if(btn){
     removePrimaryBtn();
    btn.classList.add('btn-primary')
   }
     const closeFilteredItems = items.filter(item => item.status == 'closed');
    total.innerText = `${closeFilteredItems.length}`
 displayIssues(closeFilteredItems)

}

const displayIssues = (Items)=>{
     const cardSection = document.querySelector('.card-section-div');
    cardSection.innerHTML = ''
    Items.forEach((item) => {
        const cardDiv = document.createElement('div');

        cardDiv.innerHTML = `
        <div class="card shadow-lg w-70 ${item.status == 'open' ? 'open-border' : 'closed-border'} h-full">
                <div class="p-5  ">

                    <div class="flex justify-between py-2">
                    <img class="w-[24px]" src=${item.status == 'open' ? 'assets/Open-Status.png' : 'assets/closedStatus.png'} alt="">
                    <p class="bg-[#FEECEC] text-red-500 px-8 py-1 rounded-full text-[12px]">${item.priority}</p>
                </div>
                <div class="py-2">
                    <h4 class="font-semibold">${item.title}</h4>
                    <p class="text-gray-400 text-[12px]">${item.description}</p>
                    <div class="flex gap-2 pt-2">
                        <p class="px-1  border-[#c03b3b] border-2 rounded-full bg-[#FECACA] text-[#EF4444] text-[12px]"><i class="fa-solid fa-bug"></i> ${item.labels[0]}</p>
                        <p class="px-1  border-[#b19423] border-2  rounded-full bg-[#FDE68A] text-[#D97706] text-[12px]"><i class="fa-solid fa-life-ring"></i> ${item.labels[1]}</p>
                    </div>
                </div>
                </div>
                
                <div class=" border-t-2 border-t-gray-200 p-5 ">
                
                    <p class="text-gray-500 text-[13px]">#${item.id} by ${item.author}</p>
                    <p class="text-gray-500 text-[13px]">${item.createdAt.split('T')[0]}</p>
                </div>
                </div>
    `

        cardSection.appendChild(cardDiv)
    })

}
loadAllIssues()