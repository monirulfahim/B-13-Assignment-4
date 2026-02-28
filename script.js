let interviewList = []
let rejectedList =[]
let currentStatus = 'tab-all'

// let currentTab = "all";
// const tabActive = ["text-[#FFFFFF]", "bg-[#3B82F6]"];
// const tabInactive = ["bg-[#FFFFFF]", "text-gray-500"];

const allCards = document.getElementById('all-cards');
// const interview = document.getElementById('interview');
// const rejected = document.getElementById('rejected');

let totalCount = document.getElementById('total')
let interviewCount = document.getElementById('interview')
let rejectedCount = document.getElementById('rejected')

const allFilterBtn = document.getElementById('tab-all')
const interviewFilterBtn = document.getElementById('tab-interview')
const rejectedFilterBtn = document.getElementById('tab-rejected')
const emptyStatus = document.getElementById('empty-status')
let availableCount = document.getElementById('available');


const mainContainer = document.getElementById('main-container')
const filterSection = document.getElementById('filtered-section')

function calculateCount(){
    totalCount.innerText = allCards.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
    jobsAvailable()
}
calculateCount()

// available count 
function jobsAvailable(){
    if(currentStatus === 'tab-all'){
        availableCount.innerText = allCards.children.length;
    }else if(currentStatus === 'tab-interview'){
        availableCount.innerText = interviewList.length;
    }if(currentStatus === 'tab-rejected'){
        availableCount.innerText = rejectedList.length;
    }
}

// empty status check
function emptyStatusCheck(){
    if(currentStatus === 'tab-all'){
        if(allCards.children.length<1){
            emptyStatus.classList.remove('hidden')
        }else(
            emptyStatus.classList.add('hidden')
        )
    }else if(currentStatus === 'tab-interview'){
         if(interviewList.length<1){
            emptyStatus.classList.remove('hidden')
        }else{
            emptyStatus.classList.add('hidden')
        }
    }else if(currentStatus === 'tab-rejected'){
        if(rejectedList.length<1){
            emptyStatus.classList.remove('hidden')
        }else{
            emptyStatus.classList.add('hidden')
        }
    }
}

function toggleStyle(id){

    // adding base bg for all
    allFilterBtn.classList.add('bg-base-100', 'text-gray-500')
    interviewFilterBtn.classList.add('bg-base-100', 'text-gray-500')
    rejectedFilterBtn.classList.add('bg-base-100', 'text-gray-500')

    // if any button has black then remove
    allFilterBtn.classList.remove('bg-blue-500', 'text-white')
    interviewFilterBtn.classList.remove('bg-blue-500', 'text-white')
    rejectedFilterBtn.classList.remove('bg-blue-500', 'text-white')

    const selected = document.getElementById(id);
    currentStatus = id

    // adding black for selected button
    selected.classList.remove('bg-base-100', 'text-gray-500');
    selected.classList.add('bg-blue-500', 'text-white');

    // filtering
    if(id == 'tab-interview'){
        allCards.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterview()
    }else if(id == 'tab-all'){
        allCards.classList.remove('hidden');
        filterSection.classList.add('hidden');
        jobsAvailable()
    }else if(id == 'tab-rejected'){
        allCards.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderRejected()
    }

    emptyStatusCheck()
}
jobsAvailable()


mainContainer.addEventListener('click', function(event){
    if(event.target.classList.contains('interview-btn')){
        if(currentStatus === 'tab-interview')
        return;
        const parentNode = event.target.parentNode.parentNode;
        const companyName = parentNode.querySelector('.company-name').innerText;
        const jobPosition = parentNode.querySelector('.position').innerText;
        const aboutJob = parentNode.querySelector('.job-about').innerText;
        const deleteBtn = parentNode.querySelector('.delete-btn').innerText;
        const status = parentNode.querySelector('.job-status').innerText;
        const jobDetails = parentNode.querySelector('.job-details').innerText;
        parentNode.remove()
        parentNode.querySelector('.job-status').innerText ='Interviewed'

         const cardInfo = {
            companyName,
            jobPosition,
            deleteBtn,
            aboutJob,
            status:'Interviewed',
            jobDetails
        }
         const companyExist = interviewList.find(item => item.companyName == cardInfo.companyName);
        
        if(!companyExist){
            interviewList.push(cardInfo)
            // renderInterview()
        }
          rejectedList = rejectedList.filter(item => item.companyName != cardInfo.companyName)
        calculateCount()
        if(currentStatus == 'tab-rejected') {
            renderRejected()
        }
        emptyStatusCheck()
    }
    else if(event.target.classList.contains('rejected-btn')){
        if(currentStatus === 'tab-rejected')
        return;
        const parentNode = event.target.parentNode.parentNode;
        const companyName = parentNode.querySelector('.company-name').innerText;
        const jobPosition = parentNode.querySelector('.position').innerText;
        const aboutJob = parentNode.querySelector('.job-about').innerText;
        const deleteBtn = parentNode.querySelector('.delete-btn').innerText;
        const status = parentNode.querySelector('.job-status').innerText;
        const jobDetails = parentNode.querySelector('.job-details').innerText;
        parentNode.remove();
        parentNode.querySelector('.job-status').innerText = 'Rejected'

         const cardInfo = {
            companyName,
            jobPosition,
            deleteBtn,
            aboutJob,
            status: 'Rejected',
            jobDetails,
        }
         const companyExist = rejectedList.find(item => item.companyName == cardInfo.companyName);

        if(!companyExist){
            rejectedList.push(cardInfo)
            // renderRejected()
        }
        interviewList = interviewList.filter(item => item.companyName != cardInfo.companyName)

    if(currentStatus == "tab-interview"){
        // parentNode.remove();
        renderInterview();
    }
    emptyStatusCheck()
    calculateCount();
} 
else if(event.target.closest('.delete-btn')){
        const deleteButton = event.target.closest('.delete-btn');
        const card = deleteButton.closest('.card');
        card.remove();

        const companyName = card.querySelector('.company-name').innerText;

        // Remove from interview list
        interviewList = interviewList.filter(item => item.companyName !== companyName);

        // Remove from rejected list
        rejectedList = rejectedList.filter(item => item.companyName !== companyName);

        calculateCount();

        if (currentStatus === 'tab-interview') {
            renderInterview();
        } else if (currentStatus === 'tab-rejected') {
            renderRejected();
        }
        emptyStatusCheck()
    }


})

function renderInterview(){
    filterSection.innerHTML = ''

    for(let interview of interviewList){
        let div = document.createElement('div');
        div.className = 'card flex flex-row justify-between bg-[#FFFFFF] p-6 mb-4 rounded'
        div.innerHTML = `
            <div> 
                <h6 class="company-name text-[black] font-semibold text-2xl mb-1">${interview.companyName}</h6>
                <p class="position text-[#64748B]">${interview.jobPosition}</p>
                <p class="job-about text-[#64748B] mt-5 mb-5">${interview.aboutJob}</p>
                <button class="job-status bg-[#EEF4FF] px-3 py-2 rounded text-black">${interview.status}</button>
                <p class="job-details text-[#323B49] mt-2 mb-5">${interview.jobDetails}</p>
                <button id="interview-btn" class="interview-btn  text-[#10B981] px-3 py-2 border rounded mr-2 cursor-pointer">INTERVIEW</button>
                <button id="rejected-btn" class="rejected-btn text-[#EF4444] px-3 py-2 border rounded cursor-pointer">REJECTED</button>
            </div>
            <div> 
                    <img src="./delete.png" class="delete-btn cursor-pointer w-12 md:w-12 lg:w-12 max-[576px]:w-28" alt="">
             </div>
        `
        filterSection.appendChild(div);
    }
    jobsAvailable()
}
function renderRejected(){
    filterSection.innerHTML = ''

    for(let rejected of rejectedList ){
        let div = document.createElement('div');
        div.className = 'card flex flex-row justify-between bg-[#FFFFFF] p-6 mb-4 rounded'
        div.innerHTML = `
            <div> 
                <h6 class="company-name text-[black] font-semibold text-2xl mb-1">${rejected.companyName}</h6>
                <p class="position text-[#64748B]">${rejected.jobPosition}</p>
                <p class="job-about text-[#64748B] mt-5 mb-5">${rejected.aboutJob}</p>
                <button class="job-status bg-[#EEF4FF] px-3 py-2 rounded text-black">${rejected.status}</button>
                <p class="job-details text-[#323B49] mt-2 mb-5">${rejected.jobDetails}</p>
                <button id="interview-btn" class="interview-btn  text-[#10B981] px-3 py-2 border rounded mr-2 cursor-pointer">INTERVIEW</button>
                <button id="rejected-btn" class="rejected-btn text-[#EF4444] px-3 py-2 border rounded cursor-pointer">REJECTED</button>
            </div>
            <div> 
                    <img src="./delete.png" class="delete-btn cursor-pointer w-12 md:w-12 lg:w-12 max-[576px]:w-28" alt="">
             </div>
             `
        filterSection.appendChild(div)
    }
   jobsAvailable()
}