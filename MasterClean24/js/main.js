const squareCostCalculationItemInput = document.querySelector(".square-form-calculation__item-input");
const typesCostCalculationBtn = document.querySelector(".types-form-calculation-individal__btn");
const typesCostCalculationList = document.querySelector(".types-form-calculation-individal__list");
const typesCostCalculationItems = document.querySelectorAll(".types-form-calculation-individal__list-item");
const typesCostCalculationSelect = document.querySelector(".types-form-calculation-individal__select");
const squareCostCalculationItemRadioInputs = document.querySelectorAll(".square-form-calculation__item-input-radio");

const popularServicesTabs = document.querySelectorAll(".popular-services__tabs.tabs>.tab");
const popularServicesTabBlocks = document.querySelectorAll(".content-popular-services>.tab-block");
const popularServicesTitle = document.querySelector(".popular-services__title");

const contentServicesDetails = document.querySelector(".content-services-details");
const popularServicesPopUpWrapper = document.querySelector(".popular-services__pop-up-wrapper");
const popupBackground = document.querySelector(".pop-up-background");
const popularServicesPopUpDetails = document.querySelector(".popular-services__pop-up-details");
const popularServicesPopUpOrdering = document.querySelector(".popular-services__pop-up-ordering");

const bottomBoxBervicesBtnLinks = document.querySelectorAll(".bottom-box-services__btn-link");
const bottomDescBtn = document.querySelector(".bottom-description__btn");

const bottomBoxBervicesBtnAll = document.querySelectorAll(".bottom-box-services__btn-order");
const controlServicesDetailsBtn = document.querySelector(".control-services-details__btn");
const optionsFormCalculatorItemInputAll = document.querySelectorAll(".options-form-calculator__item-input");
const optionsFormCalculatorItemInputCheckboxAll = document.querySelectorAll(".options-form-calculator__item input[type=checkbox]");

const optionsFormCalculatorItemAll = document.querySelectorAll(".options-form-calculator__item");

const popularServicesBtnPopUpCloseAll = document.querySelectorAll(".popular-services__pop-up-wrapper .btn-close");

const formServicesOrdering = document.querySelector(".form-services-ordering");
const formServicesOrderingInputDate = document.querySelector("input.form-services-ordering__input[type=date]");
const listOrderCalculator = document.querySelector(".list-order-calculator");

const blockQuestionsHeadAll = document.querySelectorAll(".block-questions__head");

const ratingAll = document.querySelectorAll(".rating-content-head-review");
const starStr = '<span class="rating-content-head-review__star"></span>';

const newsTitle = document.querySelector(".news__title");
const newsLink = document.querySelector(".news__link");


let currentDate = new Date();

function addStars(el){
    let count = +el.dataset.count;
    if (count)
        for (let i = 0; i < count; i++) {
            el.innerHTML += starStr;
        }
}

if (typesCostCalculationList) new SimpleBar(typesCostCalculationList);
if (contentServicesDetails) new SimpleBar(contentServicesDetails);
if (formServicesOrdering) new SimpleBar(formServicesOrdering);
if (listOrderCalculator) new SimpleBar(listOrderCalculator);

const slider1 = new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false
    },
    spaceBetween: 0,
    effect: "fade",
    pagination: {
        el: '.swiper-pagination',
        clickable: 'true'
      },
});

let toggleTypesCostCalculationList = () => {
    typesCostCalculationBtn.classList.toggle("types-form-calculation-individal__btn--active");
    typesCostCalculationList.classList.toggle("types-form-calculation-individal__list--active");

    if (typesCostCalculationList.style.maxHeight) typesCostCalculationList.style.maxHeight = null;
    else typesCostCalculationList.style.maxHeight = document.documentElement.clientHeight * 0.4 + 'px';
    if (typesCostCalculationList.style.overflow) typesCostCalculationList.style.overflow = null;
    else typesCostCalculationList.style.overflow = "auto";
}
if (typesCostCalculationBtn) typesCostCalculationBtn.addEventListener('click', toggleTypesCostCalculationList);

if (typesCostCalculationItems)
    typesCostCalculationItems.forEach((item, index) => {
        item.addEventListener('click', e => {
            typesCostCalculationItems.forEach(item => { item.classList.remove('list-drop-down__item--active') });
            item.classList.add('list-drop-down__item--active');
            typesCostCalculationBtn.innerText = item.innerText;
            typesCostCalculationSelect.selectedIndex = index;
            toggleTypesCostCalculationList();
        });
    });
if (squareCostCalculationItemInput && squareCostCalculationItemRadioInputs)
    squareCostCalculationItemInput.addEventListener('focus', e => {
        squareCostCalculationItemRadioInputs.forEach(input => {
            input.checked = false;
        });
    });

if (popularServicesTabs && popularServicesTabBlocks)
    if (popularServicesTabs.length === popularServicesTabBlocks.length)
        popularServicesTabs.forEach((el, index) => {
            el.addEventListener('click', e => {
                for(let i = 0; i < popularServicesTabs.length; i++){
                    if (popularServicesTabs[i].classList.contains('popular-services__tab--active')){
                        popularServicesTabs[i].classList.remove('popular-services__tab--active');
                        popularServicesTabBlocks[i].classList.remove('tab-block--active');
                    }
                }
                el.classList.add('popular-services__tab--active');
                popularServicesTabBlocks[index].classList.add('tab-block--active');
            });
        });

if (popularServicesTitle)
    if (document.documentElement.clientWidth <= 950)
        popularServicesTitle.innerText = "Виды услуг";
    else popularServicesTitle.innerText = "Популярные услуги";

if (controlServicesDetailsBtn && popularServicesBtnPopUpCloseAll) {
    controlServicesDetailsBtn.addEventListener('click', e => {
        popularServicesPopUpDetails.classList.toggle("popular-services__pop-up-details--open");
        popularServicesPopUpOrdering.classList.toggle("popular-services__pop-up-ordering--open");
    });
    popularServicesBtnPopUpCloseAll.forEach(el => {
        el.addEventListener('click', e => {
            if (document.body.style.overflow) document.body.style.overflow = null;
            popularServicesPopUpWrapper.classList.remove("popular-services__pop-up-wrapper--open");
            popularServicesPopUpDetails.classList.remove("popular-services__pop-up-details--open");
            popularServicesPopUpOrdering.classList.remove("popular-services__pop-up-ordering--open");

        });
    });
}
if (popupBackground){
    popupBackground.addEventListener('click', e => {
        if (document.body.style.overflow) document.body.style.overflow = null;
        popularServicesPopUpWrapper.classList.remove("popular-services__pop-up-wrapper--open");
        popularServicesPopUpDetails.classList.remove("popular-services__pop-up-details--open");
        popularServicesPopUpOrdering.classList.remove("popular-services__pop-up-ordering--open");
    });
}
if (popularServicesPopUpWrapper && popularServicesPopUpDetails && bottomBoxBervicesBtnAll && bottomBoxBervicesBtnLinks) {
    if (bottomBoxBervicesBtnLinks.length){
        bottomBoxBervicesBtnLinks.forEach((el, index)=>{
            el.addEventListener('click', e => {
                if (document.body.style.overflow) document.body.style.overflow = null;
                else document.body.style.overflow = "hidden";
                popularServicesPopUpWrapper.classList.toggle("popular-services__pop-up-wrapper--open");
                popularServicesPopUpDetails.classList.toggle("popular-services__pop-up-details--open");
            });
        });
        bottomBoxBervicesBtnAll.forEach((el, index)=>{
            el.addEventListener('click', e => {
                if (document.body.style.overflow) document.body.style.overflow = null;
                else document.body.style.overflow = "hidden";
                popularServicesPopUpWrapper.classList.toggle("popular-services__pop-up-wrapper--open");
                popularServicesPopUpOrdering.classList.toggle("popular-services__pop-up-ordering--open");
            });
        });
    }
}

if (popularServicesPopUpWrapper && popularServicesPopUpDetails && bottomDescBtn) {
    bottomDescBtn.addEventListener('click', e => {
        if (document.body.style.overflow) document.body.style.overflow = null;
        else document.body.style.overflow = "hidden";
        popularServicesPopUpWrapper.classList.toggle("popular-services__pop-up-wrapper--open");
        popularServicesPopUpDetails.classList.toggle("popular-services__pop-up-details--open");
    });
}


if (formServicesOrderingInputDate){
    let newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1);
    formServicesOrderingInputDate.min = newDate.toISOString().substring(0,10);
}

if (blockQuestionsHeadAll)
    blockQuestionsHeadAll.forEach(el => {
        el.addEventListener('click', e => {
            if (el.nextElementSibling.style.maxHeight) {
                el.nextElementSibling.style.maxHeight = null;
                el.parentElement.classList.remove('block-questions--active');
            }
            else {
                if (el.nextElementSibling.style.overflow) el.nextElementSibling.style.overflow = null;
                else if (el.nextElementSibling.scrollHeight >= document.documentElement.clientHeight / 2) {
                    el.nextElementSibling.style.overflow = "auto";
                    el.nextElementSibling.style.maxHeight = document.documentElement.clientHeight / 2 + "px";
                    el.parentElement.classList.add('block-questions--active');
                }
                else {
                    el.nextElementSibling.style.maxHeight = el.nextElementSibling.scrollHeight++ + "px";
                    el.parentElement.classList.add('block-questions--active');
                }
            }
        });
    });

if (ratingAll) ratingAll.forEach(el => addStars(el));

if (newsTitle && newsLink)
    if (document.documentElement.clientWidth <= 950) {
        newsTitle.innerText = "Новости";
        newsLink.innerText = "Все новости";
    }
    else {
        newsTitle.innerText = "Интересно";
        newsLink.innerText = "еще";
    } 

function changeNumber(el){
    let currentValue = el.value;
    let parentItem = el.parentElement.parentElement;
    if (currentValue > 0){
        if (parentItem) parentItem.classList.add('options-form-calculator__item--active');
    } else if (parentItem) parentItem.classList.remove('options-form-calculator__item--active');
}
if (optionsFormCalculatorItemInputAll)
    optionsFormCalculatorItemInputAll.forEach(el => {
        el.addEventListener('input', e => {
            changeNumber(el);
        });
    });

if (optionsFormCalculatorItemInputCheckboxAll)
    optionsFormCalculatorItemInputCheckboxAll.forEach(el => {
        el.addEventListener('click', e => {
            let labelCheckbox = el.nextElementSibling;
            let parentItem = el.parentElement;
            if (labelCheckbox && parentItem) {
                if (el.checked){
                    parentItem.classList.add('options-form-calculator__item--active');
                    labelCheckbox.classList.remove('add');
                    labelCheckbox.classList.add('sub');
                } else {
                    parentItem.classList.remove('options-form-calculator__item--active');
                    labelCheckbox.classList.remove('sub');
                    labelCheckbox.classList.add('add');
                }
            }
        });
    });

if (optionsFormCalculatorItemAll)
    if (optionsFormCalculatorItemAll.length){
        let height = 0;
        for (let i = 0; i < optionsFormCalculatorItemAll.length; i++) {
            if (optionsFormCalculatorItemAll[i].clientHeight > height) height = optionsFormCalculatorItemAll[i].clientHeight;
        }
        for (let i = 0; i < optionsFormCalculatorItemAll.length; i++) {
            optionsFormCalculatorItemAll[i].style.height = height + 'px';
        }
    }
