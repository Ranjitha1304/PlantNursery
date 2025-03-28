const rmModal=document.getElementById("rmModal");
const remainder=document.querySelector(".remainder");
const rmClose=document.querySelector(".rmClose");

// Open  Modal
remainder.addEventListener("click",function(){
    rmModal.style.display="block";
});

// Close  Modal
rmClose.addEventListener("click",function(){
    rmModal.style.display="none";
})

    // Close Modal When Clicking Outside the Modal Content

window.addEventListener("click",function(event){
    if(event.target==rmModal){
        rmModal.style.display="none";
    }
});