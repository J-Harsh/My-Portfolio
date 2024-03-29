const sections = document.querySelectorAll(".section");
const secBtns = document.querySelectorAll(".controls");
const secBtn = document.querySelectorAll(".control");
const allSections = document.querySelector(".main-content");
const btn = document.querySelector("#btn");
const btnText = document.querySelector("#btnText");
const portfolioItem=document.querySelectorAll(".portfolio-item");

console.log("hi");

function PageTransition() {
  //Button click active class
  for (let i = 0; i < secBtn.length; i++) {
    secBtn[i].addEventListener("click", function () {
      let currentBtn = document.querySelectorAll(".active-btn");
      currentBtn[0].classList = currentBtn[0].className.replace(
        "active-btn",
        ""
      );
      this.className += " active-btn";
    });
  }

  //sections active class
  allSections.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (id) {
      //remove selected from the other
      secBtns.forEach((btn) => {
        btn.classList.remove("active");
      });
      e.target.classList.add("active");

      //hide other sections
      sections.forEach((section) => {
        section.classList.remove("current");
      });

      window.scrollTo(0, 0);
      const element = document.getElementById(id);
      element.classList.add("current");
    }
  });
}

//FORM submission
window.addEventListener("DOMContentLoaded", function () {
  // get the form elements defined in your form HTML above
  var form = document.getElementById("my-form");

  // Success and Error functions for after the form is submitted
  function success() {
    btnText.innerHTML = "Success";
    btn.classList.add("active");
    form.reset();
  }

  function error() {
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
const themeBtn = document.querySelector(".toggle");
themeBtn.addEventListener("click", () => {
  let elem = document.body;
  elem.classList.toggle("light-mode");
});

//portfolio button
const portfolioBtn = document.querySelectorAll(".language");
var arr=[];
const allBtn = document.getElementById("all");
allBtn.addEventListener("click", () => {
  allBtn.classList.add("selected")
  portfolioBtn.forEach((ele) => {
    ele.classList.remove("selected");
  });
  portfolioItem.forEach((item)=>{
    item.classList.remove("hide")
  })
  arr.splice(0, arr.length)
});

var i=0;
portfolioBtn.forEach((ele) => {
  ele.addEventListener("click", () => {
    ele.classList.toggle("selected");
    if(arr.includes(ele.innerText))
    {
      var i=arr.indexOf(ele.innerText);
      arr.splice(i,1);
    }
    else 
      arr.push(ele.innerText)
    hideItem();
    if (ele.textContent != "All") {
      allBtn.classList.remove("selected");
    }
  });
});

function hideItem()
{
  portfolioItem.forEach((item)=>{
    if(!arr.includes(item.getAttribute("data-id")))
      item.classList.add("hide");
    else 
    item.classList.remove("hide");
  })
}


//quotes api
async function updateQuote() 
{
  // Fetch a random quote from the Quotable API
  const box=document.getElementById("box");
  const response = await fetch("https://api.quotable.io/random?maxLength=50");
  const data = await response.json();
  if (response.ok) {
    // Update DOM elements
    const author=document.createElement("p");
    author.innerText=`\xa0-${data.author}`;
    
    box.innerText='"'+data.content+'"        ';
    box.appendChild(author);

  } else {
    quote.textContent = "An error occured";
    console.log(data);
  }
}

const quoteBtn=document.getElementById("quotes");
quoteBtn.addEventListener("click",()=>
{

  box.classList.toggle("show");
  if(!box.classList.contains("show"))
    updateQuote();
  secBtn.forEach((btn) => {
        btn.classList.remove("active-btn");
        if(btn.classList.contains("control-1"))
          btn.classList.add("active-btn")
      });
      sections.forEach((section) => {
        section.classList.remove("current");
        if(section.classList.contains("sec1"))
        section.classList.add("current");
      });
})

const cursor = document.querySelector(".cursor-inner");
            const cursor2 = document.querySelector(".cursor-outer");
            document.addEventListener("mousemove", e=>{
                cursor.style.top = e.clientY + "px";
                cursor.style.left = e.clientX + "px";
    
                cursor2.style.top = e.clientY + "px";
                cursor2.style.left = e.clientX + "px";
            })

updateQuote();
PageTransition();
