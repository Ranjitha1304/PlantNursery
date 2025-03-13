const modal=document.getElementById("loginModal");
const loginBtn=document.querySelector(".login a");
const closeBtn=document.querySelector(".close");

// Open  Modal
loginBtn.addEventListener("click",function(event){
event.preventDefault();
modal.style.display="block";
});

  // Close Modal
closeBtn.addEventListener("click",function(){
    modal.style.display="none";
})

    // Close Modal When Clicking Outside the Modal Content
    window.addEventListener("click",function(event){
    if(event.target==modal){
        modal.style.display="none";
    }
});