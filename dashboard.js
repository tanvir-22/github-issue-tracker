const total = document.getElementById('totalCount');
// const open = document.getElementById('openbtn');
const cardInfoSection = document.getElementById('card-stat');
const cardSection = document.getElementById('allCardContainer');
const loader = document.getElementById('loader-section');
let allData;
let issueDetails;
const removePrimaryBtn = ()=>{
    const btns = document.querySelectorAll('.tab-btn-section .btn');
    btns.forEach((btn)=>{
        btn.classList.remove('btn-primary')
    })
}
const showLoader = (value)=>{
    if(value){
        cardInfoSection.classList.add('hidden')
        cardSection.classList.add('hidden')
        loader.classList.remove('hidden')
    }else{
         cardInfoSection.classList.remove('hidden')
        cardSection.classList.remove('hidden')
        loader.classList.add('hidden')
    }
}
const loadAllIssues = async () => {
    showLoader(true)
    const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues`);
    const jsonData = await response.json();
    allData = jsonData.data;
    displayAllIssues(jsonData.data);
    showLoader(false)

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
        <div onclick='loadIssueDetails(${item.id})' class="card cursor-pointer  shadow-lg w-70 ${item.status == 'open' ? 'open-border' : 'closed-border'} h-full">
                <div class="p-5  ">

                    <div class="flex justify-between py-2">
                    <img class="w-[24px]" src=${item.status == 'open' ? 'assets/Open-Status.png' : 'assets/closedStatus.png'} alt="">
                    <p class="bg-[#FEECEC] text-red-500 px-8 py-1 rounded-full text-[12px]">${item.priority}</p>
                </div>
                <div class="py-2">
                    <h4 class="font-semibold">${item.title}</h4>
                    <p class="text-gray-400 text-[12px]">${item.description}</p>
                    <div class="flex gap-2 pt-2">
                        <p class="px-1   border-2 rounded-full ${item.labels[0]=='bug'? 'bg-[#FECACA] border-[#c03b3b] text-[#EF4444]' : 'bg-[#DEFCE8] text-[#00A96E]' }  text-[12px]"><i class="fa-solid ${item.labels[0]=='bug'? 'fa-bug': 'fa-wand-magic-sparkles'}"></i> ${item.labels[0]}</p>
                       
<p class="px-1 border-[#b19423] border-2 rounded-full bg-[#FDE68A] text-[#D97706] text-[12px]">
<i class="fa-solid fa-life-ring"></i> ${item.labels[1]? item.labels[1]: 'not applicable'}</p>

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


const loadIssueDetails = async(id)=>{
    const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const results = await response.json();
    issueDetails = results.data;
    displayModal(issueDetails);
}

const displayModal = (item)=>{
    const container = document.querySelector('.box-container');
    container.innerHTML = `
             <div >
        <h2 class="font-bold text-[24px]">${item.title}</h2>
        <div class="flex text-[12px] gap-3">
            <p class="px-2  ${item.status=='open'? 'bg-[#00A96E]': 'bg-[#A855F7]'}  text-white rounded-full">${item.status}</p>
            <p class="flex items-center gap-2"> <i class="text-[5px] fa-solid fa-circle"></i> ${item.status=='open'? 'opened': 'closed'}  by ${item.author}</p>
            <p class="flex items-center gap-2"> <i class="text-[5px] fa-solid fa-circle"></i> ${item.createdAt.split('T')[0]}</p>
        </div>
    </div>
    <div class="flex gap-2 pt-2">
                        <p class="px-2  border-[#c03b3b] border-2 rounded-full bg-[#FECACA] text-[#EF4444] text-[12px]"><i class="fa-solid fa-bug"></i>  ${item.labels[0]}</p>
                       <p class="px-1 border-[#b19423] border-2 rounded-full bg-[#FDE68A] text-[#D97706] text-[12px]">
<i class="fa-solid fa-life-ring"></i> ${item.labels[1]? item.labels[1]: 'not applicable'}</p>
                    </div>
                    <p class="text-[14px] text-gray-500">${item.description}</p>
    <div class="grid grid-cols-2 bg-[#64748b10] p-2 text-[13px]">
        <div>
        <p>Assignee:    </p>
        <p class="font-bold">${item.assignee==""?'not given': item.assignee}</p>
    </div>
        <div>
            <p>Priority:</p>
            <p class="px-2 w-fit  bg-[#EF4444] rounded-full text-white ">${item.priority}</p>
        </div>
    </div>
    
    `
    document.getElementById('my_modal_5').showModal()

}

const searchIssues = async()=>{
    const input = document.getElementById('searchInput');
    const value = input.value.trim().toLowerCase().replace('/\s+/g','')
  
    const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${value}`);
    const result = await response.json();
    total.innerText = `${result.data.length}`
   removePrimaryBtn()
    displayIssues(result.data)
    input.value = ''
}
loadAllIssues()