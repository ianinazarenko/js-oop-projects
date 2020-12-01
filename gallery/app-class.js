function getElement(selector) {
    const element = document.querySelector(selector);

    if (element) {
        return element;
    } else {
        throw new Error(`Please, check ${selector}, there is no such element in the document`);
    }
}

class Gallery {
    constructor(section) {
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

    openModal(selectedImage, list) {
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

    setMainImg(selectedImage) {
        this.mainImg.src = selectedImage.src;
        this.mainImgTitle.textContent = selectedImage.title;
    }

    closeModal(e) {
        if (e.target === this.modal) {
            this.modal.classList.remove('open');

            this.closeBtn.removeEventListener('click', this.closeModal);
            this.prevBtn.removeEventListener('click', this.prevImage);
            this.nextBtn.removeEventListener('click', this.nextImage);
            this.imgContainer.removeEventListener('click', this.chooseImage);
        }

    }

    prevImage() {
        const selected = this.imgContainer.querySelector('.selected');
        const prev = selected.previousElementSibling || this.imgContainer.lastElementChild;
        selected.classList.remove('selected');
        prev.classList.add('selected');
        this.setMainImg(prev);
    }

    nextImage() {
        const selected = this.imgContainer.querySelector('.selected');
        const next = selected.nextElementSibling ||
            this.imgContainer.firstElementChild;
        selected.classList.remove('selected');
        next.classList.add('selected');
        this.setMainImg(next);
    }

    chooseImage(e) {
        if (e.target.classList.contains('modal__img')) {
            this.setMainImg(e.target);
            const selected = this.imgContainer.querySelector('.selected');
            selected.classList.remove('selected');
            e.target.classList.add('selected');
        }
    }
}




const nature = new Gallery(getElement('.nature'));
const city = new Gallery(getElement('.city'));


// if scrollWidth > offsetWidth тогда нужно двигать элементы