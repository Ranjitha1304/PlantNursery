const qaModal=document.getElementById("qaModal");
const session=document.querySelector(".session");
const qaClose=document.querySelector(".qaClose");

// Open  Modal
session.addEventListener("click",function(){
qaModal.style.display="block";
});

// Close  Modal
qaClose.addEventListener("click",function(){
    qaModal.style.display="none";
})

    // Close Modal When Clicking Outside the Modal Content

window.addEventListener("click",function(event){
    if(event.target==qaModal){
        qaModal.style.display="none";
    }
});