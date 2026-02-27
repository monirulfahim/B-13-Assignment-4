let interviewList = []
let rejectedList =[]

let currentTab = "all";
const tabActive = ["text-[#FFFFFF]", "bg-[#3B82F6]"];
const tabInactive = ["bg-[#FFFFFF]", "text-gray-500"];

const allCards = document.getElementById('allCards');
// const interview = document.getElementById('interview');
// const rejected = document.getElementById('rejected');

let total = document.getElementById('total')
let interviewCount = document.getElementById('interview')
let rejectedCount = document.getElementById('rejected')

const mainContainer = document.getElementById('main-container')

function calculateCount(){
    total.innerText = allCards.children.length;
    interviewCount.innerText = interviewList.length
    rejectedCount.innerText = rejectedList.length
}
calculateCount()


function switchTab(tab){
    // console.log(tab)
    const tabs = ["all", "interview", "rejected"];
    for (const t of tabs) {
            const tabName = document.getElementById("tab-" + t)
        if(t === tab){
            tabName.classList.remove(...tabInactive);
            tabName.classList.add(...tabActive)
        }
        else{
            tabName.classList.add(...tabInactive)
        }
    }

}
switchTab(currentTab);

mainContainer.addEventListener('click', function(event){
    if(event.target.classList.contains('interview-btn')){
        const parentNode = event.target.parentNode.parentNode;
        const companyName = parentNode.querySelector('.company-name').innerText;
        const jobPosition = parentNode.querySelector('.position').innerText;
        const aboutJob = parentNode.querySelector('.job-about').innerText;
        const deleteBtn = parentNode.querySelector('.delete-btn').innerText;
        const status = parentNode.querySelector('.job-status').innerText;
        const jobDetails = parentNode.querySelector('.job-details').innerText;


         const cardInfo = {
            companyName,
            jobPosition,
            deleteBtn,
            aboutJob,
            status : 'Rejected',
            jobDetails,
        }
         
    }
})