//cheak if  There local Storage color Option

let maincolors = localStorage.getItem("color_option");
if (maincolors !== null) {
  document.documentElement.style.setProperty("--maincolor", maincolors);

  //Cheak For Active Class

  //remove Active Class From All Children List Item
  document.querySelectorAll(".colors-list li").forEach((el) => {
    el.classList.remove("active");

    //add Active class on element with data-color===localstorge

    if (el.dataset.color === maincolors) {
      el.classList.add("active");
    }
  });
}
//Random Background Option
let backgroundOption = true;

//Variable To Control The Internal
let backgroundInterval;

//cheak if there local storage Random Background item

let backlocalSto = localStorage.getItem("background_option");
//Check if random background  local storage Is not found
if (backlocalSto !== null) {
  if (backlocalSto === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  //Remove active Class From All Spans
  document.querySelectorAll(".randombackground span").forEach((el) => {
    el.classList.remove("active");
  });
  if (backlocalSto === "true") {
    document.querySelector(".randombackground .Yes").classList.add("active");
  } else {
    document.querySelector(".randombackground .No").classList.add("active");
  }
}
// Toggle Spin Class On Icon
document.querySelector(".fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".setting-box").classList.toggle("open");
};

//switch Colors
const colorsli = document.querySelectorAll(".colors-list li");

colorsli.forEach((g) => {
  //loop On list Items
  g.addEventListener("click", (e) => {
    // console.log(e.target.dataset.color);
    // Set Color On Root
    document.documentElement.style.setProperty(
      "--maincolor",
      e.target.dataset.color
    );
    //Set Color On Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);
    //remove Active Class From All Children
    // console.log( e.target.parentElement); //ul
    e.target.parentElement.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
    });
    // Add Active Class On Self
    e.target.classList.add("active");
  });
});

//switch Random Background  Otion
const randomBackground = document.querySelectorAll(".randombackground span");

//loop On All Span
randomBackground.forEach((span) => {
  span.addEventListener("click", (e) => {
    //remove Active Class From All Children
    e.target.parentElement.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
    });
    // Add Active Class On Self
    e.target.classList.add("active");

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeimg();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

//Select Landing Page Element
let landing_bage = document.querySelector(".landing-page");
//get Array of Images
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

//Function To Randomize img
function randomizeimg() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      //Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      // change Background Image Url
      landing_bage.style.backgroundImage =
        'url("image/' + imgsArray[randomNumber] + ' ")';
    }, 1000);
  }
}

//Select Skills Selector

let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  //Skills Offset Top
  let skillsoffsetTop = ourSkills.offsetTop;
  // console.log(skillsoffsetTop);

  //skills Outer Height
  let skillsOuterheight = ourSkills.offsetHeight;
  // console.log(skillsOuterheight);

  //Window Height
  let windowHeight = this.innerHeight;
  // console.log(windowHeight);

  //Window ScrollTop
  let windowScrollTop = this.pageYOffset;
  // console.log(windowScrollTop);
  
  if (windowScrollTop+5 > skillsoffsetTop + skillsOuterheight - windowHeight) {
    //this.console.log("Skills Section Reached");
   
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  } else {
    
  }
};

//Create Popup With The Image
let ourGallery =document.querySelectorAll(".gallery img");
 ourGallery.forEach(img => {
    img.addEventListener('click',(e)=>{
      
      //create Overlay Element
       let overlay =document.createElement("div");
       //add class to overlay
       overlay.className='popup-overlay';
       //Append Overlay To The Body
       document.body.appendChild(overlay);
       //create The Popup Box
       let popupbox=document.createElement("div");
       //add class to the popupbox
       popupbox.className='popup-box';

       if(img.alt !==null){
        //Creat heading
        let imgHeading=document.createElement("h3");
         //Create Text For Heading
       let imgtext=document.createTextNode(img.alt);
       //Append the text to the Heading
       imgHeading.appendChild(imgtext);
       //Append the heading to the popup box
       popupbox.appendChild(imgHeading);
     }
       //create the Image
       let popupImage=document.createElement("img");
       //set image sourse
       popupImage.src=img.src;
       //Add Image to popup Box
       popupbox.appendChild(popupImage);
       //Append the popup Box to Body
     document.body.appendChild(popupbox);
      //create the close Span
      let closeButton=document.createElement("span");
      let closeButtonText=document.createTextNode("X");
      closeButton.appendChild(closeButtonText);
      closeButton.className ='close-button';
      popupbox.appendChild(closeButton);
     
    });
 });

 //Close Popup
 document.addEventListener('click',(e)=>{
   
  if(e.target.className=='close-button'){
    e.target.parentNode.remove();
    //anoter way remove
    document.querySelector(".popup-overlay").remove();
  }
 });
 