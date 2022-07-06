const locationTopBtn = document.querySelector(".top-header .location-select__btn");
const locationBottomBtn = document.querySelector(".mobile-header .location-select__btn");
const locationMobile = document.querySelector(".mobile-header__select-location");
const locationMobileBtn = document.querySelector(".mobile-header .location-select__list");
const locationList = document.querySelector(".top-header .location-select__list");
const locationListItems = document.querySelectorAll(".top-header .location-select__list .list-location__item");

const phoneNumber = document.querySelector(".phone-call__info");
const menuTopHeader = document.querySelector(".top-header__inner");
const menuBottomHeader = document.querySelector(".bottom-header__inner");
const menuMobileBtn = document.querySelectorAll(".bottom-header__menu")[0];
const menuMobileBtnActive = document.querySelector(".bottom-header__menu--active");
const menuMobileDropDownList = document.querySelector(".header__menu-mobile");
const menuMobileManager = document.querySelector(".mobile-header__manager");
const menuMobileManagerInner = document.querySelector(".mobile-header__manager-inner");
const menuMobileHeaderServicesAll = document.querySelectorAll(".mobile-header-services");

const menuMobileManagerBackBtn = document.querySelector(".manager-btn-back");

const serviceBtn = document.querySelector(".list-bottom-menu__item-service");
const serviceList = document.querySelector(".drop-down-menu-header");
const serviceMobileBtn = document.querySelector(".services-mobile-header__btn");
const serviceMobileSubList = document.querySelector(".services-mobile-header");
const serviceMobileHeaderItems = document.querySelectorAll(".services-mobile-header__item");

let currentOpenPageIndex = 0;

function hideElement(el1, el2, time, endFinished) {
  menuMobileBtnActive.style.pointerEvents = "none";
  menuMobileBtn.style.pointerEvents = "none";
  menuMobileManagerBackBtn.style.pointerEvents = "none";

  setTimeout(() => {
    el1.style.display = "none";
    endFinished();
    el2.style.display = "block";
    menuMobileBtnActive.style.pointerEvents = null;
    menuMobileBtn.style.pointerEvents = null;
    menuMobileManagerBackBtn.style.pointerEvents = null;
  }, time);
}
function clickToMobileHeaderSubList(e){
  serviceMobileBtn.classList.toggle("services-mobile-header__btn--active");
  serviceMobileSubList.classList.toggle("services-mobile-header--active");

  if (serviceMobileSubList.style.maxHeight) serviceMobileSubList.style.maxHeight = null;
  else serviceMobileSubList.style.maxHeight = document.documentElement.clientHeight * 0.5 + 'px';

  if (serviceMobileSubList.style.overflow) serviceMobileSubList.style.overflow = null;
  else serviceMobileSubList.style.overflow = "auto";

}

let clickFunc = e => {
  locationTopBtn.querySelector("span").innerText = locationBottomBtn.querySelector("span").innerText = locationMobileBtn.value = e.target.innerText;
  locationListItems.forEach(item => { item.classList.remove("list-drop-down__item--active") });
  e.target.parentNode.classList.add('list-drop-down__item--active');
  locationTopBtn.classList.toggle("location-select__btn--active");
  locationList.style.maxHeight = null;
  locationList.style.overflow = null;
  locationList.classList.toggle("list-location--active");
}
function changePositionPhoneNumber(){
  if (menuBottomHeader)
  if (document.documentElement.clientWidth <= 767) menuBottomHeader.children[0].after(phoneNumber);
  else  menuTopHeader.append(phoneNumber);
}

window.onresize = changePositionPhoneNumber;

locationListItems.forEach(item => {
  item.addEventListener('click', clickFunc);
})

if (locationTopBtn && locationList || locationBottomBtn && locationMobileBtn) {
    locationTopBtn.addEventListener('click', e => {
      locationTopBtn.classList.toggle("location-select__btn--active");
        if (locationList.style.maxHeight) locationList.style.maxHeight = null;
        else locationList.style.maxHeight = document.documentElement.clientHeight * 0.3 + 'px';
        if (locationList.style.overflow) locationList.style.overflow = null;
        else if (locationList.scrollHeight >= document.documentElement.clientHeight * 0.3) locationList.style.overflow = "auto";
        locationList.classList.toggle("list-location--active");
      });
    locationMobileBtn.addEventListener('click', e => {
      locationBottomBtn.classList.toggle("location-select__btn--active");
    });  
  }
if (locationMobileBtn)
  locationMobileBtn.addEventListener('change', e => {
    locationTopBtn.querySelector("span").innerText = locationBottomBtn.querySelector("span").innerText = locationMobileBtn.value;
    let index = locationMobileBtn.selectedIndex;
    locationListItems.forEach(item => { item.classList.remove("list-drop-down__item--active") });
    locationListItems[index].classList.add('list-drop-down__item--active');  
  })
if (serviceBtn && serviceList)
  serviceBtn.addEventListener('click', e => {
    serviceBtn.classList.toggle("list-bottom-menu__item-service--active");
    if (serviceList.style.maxHeight) serviceList.style.maxHeight = null;
    else serviceList.style.maxHeight = '430px';
    if (serviceList.style.overflow) serviceList.style.overflow = null;
    else if (serviceList.scrollHeight > 430) serviceList.style.overflow = "auto";

  });
changePositionPhoneNumber();

if (menuMobileBtn && menuMobileDropDownList && menuMobileManager)
  if (document.documentElement.clientWidth <= 767) {
    menuMobileBtn.addEventListener('click', e => {
        menuMobileDropDownList.style.left = 0;
    })
    menuMobileBtnActive.addEventListener('click', e => {
      menuMobileBtnActive.style.pointerEvents = "none";
      menuMobileBtn.style.pointerEvents = "none";
      if (menuMobileDropDownList.style.left) menuMobileDropDownList.style.left = null;
      locationBottomBtn.classList.remove("location-select__btn--active");

      setTimeout(() => {
        serviceMobileBtn.classList.remove("services-mobile-header__btn--active");
        serviceMobileSubList.classList.remove("services-mobile-header--active");
        serviceMobileSubList.style.maxHeight = serviceMobileSubList.style.overflow= null;
        menuMobileHeaderServicesAll[currentOpenPageIndex].style.transitionDelay = "0s";
        menuMobileHeaderServicesAll[currentOpenPageIndex].style.left = null;
        menuMobileManagerBackBtn.style.display = "none";
        menuMobileManagerBackBtn.classList.remove("mobile-header__manager-btn--show");  
        menuMobileManagerBackBtn.classList.add("mobile-header__manager-btn--hide");
        locationMobile.classList.remove("mobile-header__select-location--hide");  
        locationMobile.classList.add("mobile-header__select-location--show");
        locationMobile.style.animationDuration = "0s";
        locationMobile.style.display = "block";
        menuMobileBtnActive.style.pointerEvents = null;
        menuMobileBtn.style.pointerEvents = null;
        }, 200);
    })
}
if (serviceMobileBtn && serviceMobileSubList)
  serviceMobileBtn.addEventListener('click', clickToMobileHeaderSubList);

if (serviceMobileHeaderItems)
  serviceMobileHeaderItems.forEach((el, index) => {
    el.addEventListener('click', element => {
      currentOpenPageIndex = index;
      menuMobileHeaderServicesAll[index].style.transitionDelay = null;
      menuMobileHeaderServicesAll[index].style.left = "0";

      if (locationMobile.style.animationDuration) locationMobile.style.animationDuration = null;
      locationMobile.classList.remove("mobile-header__select-location--show");  
      locationMobile.classList.add("mobile-header__select-location--hide");  
      hideElement(locationMobile, menuMobileManagerBackBtn, 200, () => {
        menuMobileManagerBackBtn.classList.remove("mobile-header__manager-btn--hide");  
        menuMobileManagerBackBtn.classList.add("mobile-header__manager-btn--show");  
      });
    })
  })

if (menuMobileManagerBackBtn)
  menuMobileManagerBackBtn.addEventListener('click', e => {
    menuMobileHeaderServicesAll[currentOpenPageIndex].style.transitionDelay = null;
    menuMobileHeaderServicesAll[currentOpenPageIndex].style.left = null;
    menuMobileManagerBackBtn.classList.remove("mobile-header__manager-btn--show");  
    menuMobileManagerBackBtn.classList.add("mobile-header__manager-btn--hide");  
  hideElement(menuMobileManagerBackBtn, locationMobile, 200, () => {
      locationMobile.classList.remove("mobile-header__select-location--hide");  
      locationMobile.classList.add("mobile-header__select-location--show"); 
    });
})
