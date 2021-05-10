addEventListener("load",()=>{
    
    setTimeout(()=>{
        document.querySelector(".preloader").classList.add("opacity-0");
    },500);
    setTimeout(()=>{  
        document.querySelector(".preloader").style.display="none";
    },1000);
})

//NAV
const nav=document.getElementById('nav');
const navItems=document.querySelectorAll('.nav-item');

for(const navItem of navItems){
    navItem.addEventListener('click',()=>{
        nav.querySelector('.active').classList.remove('active');
        navItem.classList.add('active');
        showSection(navItem);
        asideSectionTogglerBtn();
    });
}


/*SECTIONS*/
const sections=document.querySelectorAll('.section');

const showSection=(e)=>{
    for(section of sections){
        if(section.classList.contains('active'))
            section.classList.add('back-section');
        else
        section.classList.remove('back-section');
        section.classList.remove('active');
    }
    const target=e.getAttribute("href");
    document.querySelector(target).classList.add("active");
}


const updateNav=(e)=>{
    for(const navItem of navItems){
        navItem.classList.remove('active');
        const target=e.getAttribute("href");
        if(target===navItem.getAttribute("href")){
            navItem.classList.add('active');
        }
    }
}

const hireMe=document.getElementById('hire-me');
const contactNav=document.getElementById('contact');
hireMe.addEventListener('click',()=>{
    const sectionIndex=hireMe.getAttribute("data-section-index");
    showSection(hireMe);
    updateNav(hireMe);
});

/*ASIDE*/
const navTogglerButton=document.getElementById('nav-toggler');
const aside=document.getElementById('aside');

navTogglerButton.addEventListener('click',()=>{
    asideSectionTogglerBtn();
});

const asideSectionTogglerBtn=()=>{
    for(const section of sections){
        section.classList.toggle("open");
    }
    aside.classList.toggle("open");
    navTogglerButton.classList.toggle("open");
}



//PORTFOLIO FILTER

const filterContainer=document.getElementById('portfolio-filter');
const filterBtns=filterContainer.children;
const portfolioItems=document.querySelectorAll('.portfolio-item');

console.log(portfolioItems.length);

for(let i=0; i<filterBtns.length;i++){
    filterBtns[i].addEventListener("click",()=>{
        filterContainer.querySelector(".active").classList.remove("active");
        filterBtns[i].classList.add('active');

        const filterValue=filterBtns[i].getAttribute("data-filter");
        
        for(let k=0;k<portfolioItems.length;k++){
            if(filterValue===portfolioItems[k].getAttribute("data-category")){
                portfolioItems[k].classList.remove("hide");
                portfolioItems[k].classList.add("show");
            }
            else{
                portfolioItems[k].classList.remove("show");
                portfolioItems[k].classList.add("hide");
            }  
            if(filterValue==="all"){
                portfolioItems[k].classList.remove("hide");
                portfolioItems[k].classList.add("show");
            }
        }
    })
}

//LIGHTBOX

const lightbox=document.getElementById('lightbox');
const lightboxImg=lightbox.querySelector('.lightbox-img');
const lightboxText=lightbox.querySelector('.caption-text');
const lightboxCounter=lightbox.querySelector('.caption-counter');
const lightboxClose=lightbox.querySelector('.lightbox-close');
const lightboxLink=document.getElementById('lightbox-link');

let itemIndex=0;

for(let i=0;i<portfolioItems.length;i++){
    portfolioItems[i].addEventListener("click",()=>{
        itemIndex=i;
        
        changeItem();
        toggleLightbox();
        link();
    })
}

const prevItem=document.getElementById('prev-item');
const nextItem=document.getElementById('next-item');

nextItem.addEventListener("click",()=>{
    if(itemIndex==portfolioItems.length-1)
        itemIndex=0;
    else
        itemIndex++;
    changeItem();
    link();
})

prevItem.addEventListener("click",()=>{
    if(itemIndex==0)
        itemIndex=portfolioItems.length-1;
    else
        itemIndex--;
    changeItem();
    link();
})

const toggleLightbox=()=>{
    lightbox.classList.toggle("open");
}

const changeItem=()=>{
    imgSrc=portfolioItems[itemIndex].querySelector(".portfolio-img img").getAttribute("src");
    lightboxImg.src=imgSrc;
    
    lightboxText.innerHTML=portfolioItems[itemIndex].querySelector("p").innerHTML;
    lightboxCounter.textContent=`${itemIndex+1} / ${portfolioItems.length}`;
    link();
}

lightbox.addEventListener('click',(e)=>{
    if(e.target===lightboxClose || e.target===lightbox)
        toggleLightbox();
})

const link=()=>{
    lightboxLinkSrc=portfolioItems[itemIndex].getAttribute("data-url");
    console.log(lightboxLinkSrc);
    if(lightboxLinkSrc==null){
        lightboxLink.removeAttribute("href");
        lightboxImg.style.cursor="auto";
        lightboxImg.addEventListener('mouseover',()=>{
            lightboxImg.style.transform="scale(1)";
        })
    }
    else{
        lightboxLink.setAttribute("href",lightboxLinkSrc);
        lightboxImg.style.cursor="pointer";
        lightboxImg.style.transition="0.5s all ease";
        lightboxImg.addEventListener('mouseover',()=>{
            lightboxImg.style.transform="scale(1.05)";
        })
        lightboxImg.addEventListener('mouseleave',()=>{
            lightboxImg.style.transform="scale(1)";
        })
    }
    
}



/* Style Switcher */

/*Toggle Button*/
const toggleStyleSwitcher=document.getElementById('toggle-style-switcher');
const styleSwitcher=document.getElementById('style-switcher');

toggleStyleSwitcher.addEventListener('click',()=>{
    styleSwitcher.classList.toggle('open');
    toggleStyleSwitcher.firstElementChild.classList.toggle('fa-spin');
})

/*Colors*/
const links=document.querySelectorAll(".alternate-style");
const colors=document.querySelectorAll(".style-switcher-item");

for(const color of colors){
    color.addEventListener('click',(e)=>{
        e.preventDefault();
        const setActiveStyle=()=>{
            for(let i=0;i<links.length;i++){
                if(e.target.id==links[i].getAttribute("title")){
                    links[i].removeAttribute("disabled");
                }
                else{
                    links[i].setAttribute("disabled","true");
                }

            }
        }
        setActiveStyle();
    })   
}

/*BODY SKIN*/
const bodySkin=document.querySelectorAll('.body-skin');

for(const bodySkinItem of bodySkin){
    bodySkinItem.addEventListener('change',()=>{
        if(bodySkinItem.value==="dark")
            document.body.classList.add("dark");
        else
            document.body.classList.remove("dark");
    })
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../sw.js')
      .then(reg => console.log('Registro de SW exitoso', reg))
      .catch(err => console.warn('Error al tratar de registrar el sw', err))
  }


