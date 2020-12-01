function getElement(selector) {
    const element = document.querySelector(selector);

    if (element) {
        return element;
    } else {
        throw new Error(`Please, check ${selector}, there is no such element in the document`);
    }
}

function Gallery(section) {
    this.container = section;
    this.imgList = section.querySelectorAll('.img');
    this.imgList = Array.from(this.imgList);
    this.modal = getElement('.modal');
    this.mainImg = getElement('.modal__main-img');
    this.mainImgTitle = getElement('.modal__img-title');
    this.imgContainer = getElement('.modal__img-container');
    this.closeBtn = getElement('.close-btn');
    this.prevBtn = getElement('.prev-btn');
    this.nextBtn = getElement('.next-btn');
    console.log(this);

    this.container.addEventListener('click', function (e) {
        if (e.target.classList.contains('img')) {
            this.openModal(e.target, this.imgList);
        }
    }.bind(this));

    this.closeModal = this.closeModal.bind(this);
    this.prevImage = this.prevImage.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.chooseImage = this.chooseImage.bind(this);
}


Gallery.prototype.openModal = function (selectedImage, list) {
    this.setMainImg(selectedImage);
    this.imgContainer.innerHTML = list.map(function (image) {
        return `<img src="${image.src}" title="${image.title}" class="${image.dataset.id === selectedImage.dataset.id ? 'modal__img selected' : 'modal__img'}" data-id="${image.dataset.id}">`
    }).join('');
    this.modal.classList.add('open');

    this.modal.addEventListener('click', this.closeModal);
    this.prevBtn.addEventListener('click', this.prevImage);
    this.nextBtn.addEventListener('click', this.nextImage);
    this.imgContainer.addEventListener('click', this.chooseImage);

}

Gallery.prototype.setMainImg = function (selectedImage) {
    this.mainImg.src = selectedImage.src;
    this.mainImgTitle.textContent = selectedImage.title;
}

Gallery.prototype.closeModal = function (e) {
    if (e.target === this.modal) {
        this.modal.classList.remove('open');

        this.closeBtn.removeEventListener('click', this.closeModal);
        this.prevBtn.removeEventListener('click', this.prevImage);
        this.nextBtn.removeEventListener('click', this.nextImage);
        this.imgContainer.removeEventListener('click', this.chooseImage);
    }

}

Gallery.prototype.prevImage = function () {
    const selected = this.imgContainer.querySelector('.selected');
    const prev = selected.previousElementSibling || this.imgContainer.lastElementChild;
    selected.classList.remove('selected');
    prev.classList.add('selected');
    this.setMainImg(prev);
}

Gallery.prototype.nextImage = function () {
    const selected = this.imgContainer.querySelector('.selected');
    const next = selected.nextElementSibling ||
        this.imgContainer.firstElementChild;
    selected.classList.remove('selected');
    next.classList.add('selected');
    this.setMainImg(next);
}

Gallery.prototype.chooseImage = function (e) {
    if (e.target.classList.contains('modal__img')) {
        this.setMainImg(e.target);
        const selected = this.imgContainer.querySelector('.selected');
        selected.classList.remove('selected');
        e.target.classList.add('selected');

        console.log(e.target.offsetLeft);
        console.log(this.imgContainer.offsetWidth / 2);
        console.log(this.imgContainer.scrollWidth / 2);

        // if (e.target.offsetLeft > (this.imgContainer.scrollWidth / 2) && (this.imgContainer.scrollLeft !== Infinity)) {
        //     this.imgContainer.scrollLeft += e.target.offsetWidth;
        // } else if (e.target.offsetLeft < (this.imgContainer.scrollWidth / 2) && (this.imgContainer.scrollLeft !== 0)) {
        //     this.imgContainer.scrollLeft -= e.target.offsetWidth;
        // }
    }
}

const nature = new Gallery(getElement('.nature'));
const city = new Gallery(getElement('.city'));


// if scrollWidth > offsetWidth тогда нужно двигать элементы