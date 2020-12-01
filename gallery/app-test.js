function getElement(selector) {
    const element = document.querySelector(selector);

    if (element) {
        return element;
    } else {
        throw new Error(`Please, check ${selector}, there is no such element in the document`);
    }
}


// *********    SELECTIONS    *********
const modal = getElement('.modal');
const mainImg = getElement('.modal__main-img');
const mainImgTitle = getElement('.modal__img-title');
const imgContainer = getElement('.modal__img-container');
const closeBtn = getElement('.close-btn');
const prevBtn = getElement('.prev-btn');
const nextBtn = getElement('.next-btn');


// *********    OBJECT INSTANCIES    *********
const nature = new Gallery(getElement('.nature'));
const city = new Gallery(getElement('.city'));


// *********    EVENT LISTENERS    *********
closeBtn.addEventListener('click', closeModal);
// event listener for click on image from section is within CONSTRUCTOR FUNCTION


// *********    CONSTRUCTOR FUNCTION    *********
function Gallery(section) {
    this.container = section;
    this.imgList = section.querySelectorAll('.img');
    this.imgList = Array.from(this.imgList);
    console.log(this);

    this.container.addEventListener('click', function (e) {
        if (e.target.classList.contains('img')) {
            openModal(e.target, this.imgList);
        }
    }.bind(this));
}


// *********    FUNCTIONS    *********
function openModal(selectedImage, list) {
    setMainImg(selectedImage);
    imgContainer.innerHTML = list.map(function (image) {
        return `<img src="${image.src}" title="${image.title}" class="${image.dataset.id === selectedImage.dataset.id ? 'modal__img selected' : 'modal__img'}" data-id="${image.dataset.id}">`
    }).join('');
    modal.classList.add('open');
}

function setMainImg(selectedImage) {
    mainImg.src = selectedImage.src;
    mainImgTitle.textContent = selectedImage.title;
}

function closeModal() {
    modal.classList.remove('open');
}