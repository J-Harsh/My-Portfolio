const sections= document.querySelectorAll('.section');
const secBtns=document.querySelectorAll('.controls');
const secBtn=document.querySelectorAll('.control');
const allSections=document.querySelector(".main-content");
const btn = document.querySelector("#btn");
const btnText = document.querySelector("#btnText");

console.log("hi");

function PageTransition()
{
    //Button click active class
    for(let i=0;i<secBtn.length;i++)
    {
        secBtn[i].addEventListener("click",function()
        {
            let currentBtn=document.querySelectorAll(".active-btn");
            currentBtn[0].classList=currentBtn[0].className.replace("active-btn",'');
            this.className+=" active-btn";
        });
    }

    //sections active class
    allSections.addEventListener("click",(e)=>
    {
       const id=e.target.dataset.id;
       if(id)
       {
           //remove selected from the other
           secBtns.forEach((btn)=>
           {
                btn.classList.remove('active');
           });
           e.target.classList.add('active');

           //hide other sections
           sections.forEach((section)=>
           {
               section.classList.remove("current")
           });

           window.scrollTo(0,0);
           const element=document.getElementById(id);
           element.classList.add("current");
       }
       console.log(id); 
    });

}

//FORM submission
window.addEventListener("DOMContentLoaded", function () {
  // get the form elements defined in your form HTML above

  var form = document.getElementById("my-form");
  //var status = document.getElementById("status");

  // Success and Error functions for after the form is submitted

  function success() 
  {
    btnText.innerHTML = "Success";
    btn.classList.add("active");
    form.reset();
    
  }

  function error() 
  {
    btnText.innerHTML = "Fill Captcha";
  }

  // handle the form submission event

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}



//theme toggle
const themeBtn= document.querySelector('.toggle');
themeBtn.addEventListener('click',()=>
{
    let elem=document.body;
    elem.classList.toggle('light-mode');
})

PageTransition();