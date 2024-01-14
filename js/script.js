import Home from "./home.js";

// default url
const BASE_URL = '/12a/12A_The_Phantom_Menace';
// oldalak helye:
const rootDiv = document.querySelector('#root');
// nav-ok:
const navs = document.querySelectorAll('a[data-href]');
// console.log(navs);

//route-ok
const routes = {
    '/'         : {html : './pages/home.html', code : Home},
    '/404' : {html : './pages/404.html', code : null}
}

// oldalak betöltése
const loadPage = async (page)=>{
    const response = await fetch(page.html);
    const resHTML = response.text(); // szöveggé konvertálás
    return resHTML;
}

// dinamikus osztály példányosítás
const dynamicClass = (page) => {
    if (page.code != null){
        const dynamicClassName = eval(page.code);
        new dynamicClassName();
    }
}

// function onNavClick(){
// }
const onNavClick = async (event)=>{
    event.preventDefault(); // megakadályozza az oldal újratöltését
    // console.log(event.target.dataset.href);
    const pathName = event.target.dataset.href;
    const data = await loadPage(routes[pathName]);
    rootDiv.innerHTML = data;
    window.history.pushState({},'',window.location.origin + BASE_URL + pathName);
    //console.log(window.location);
    dynamicClass(routes[pathName]);
}

// windows.history alapján frissítés
window.addEventListener('popstate',async ()=>{
    // console.log(window.location.pathname);
    const routePath = window.location.pathname.slice(BASE_URL.length,window.location.pathname.length);
    // console.log(routePath);
    let data;
    if (routePath in routes){
        data = await loadPage(routes[routePath]);
    } else {
        // nem létező oldal
        data = await loadPage(routes['/404']);
    }
    rootDiv.innerHTML = data;
    
    dynamicClass(routes[routePath]);
});

// F5 frissítés
window.addEventListener('load', async ()=>{
    const routePath = window.location.pathname.slice(BASE_URL.length,window.location.pathname.length);
    let data;
    if (routePath in routes){
        data = await loadPage(routes[routePath]);
    } else {
        // nem létező oldal
        data = await loadPage(routes['/404']);
    }
    rootDiv.innerHTML = data;

    dynamicClass(routes[routePath]);
})

// eseménykezelés
navs.forEach(nav =>{
    nav.addEventListener('click',onNavClick);
})