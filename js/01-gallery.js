import { galleryItems } from './gallery-items.js';
// Change code below this line

const modalParams = {
    closable: true,
};
    
const galleryList = document.querySelector(".gallery");

function createMarkup(arr) {
    return arr.map(({ preview, original, description }) => `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
</li>
`).join("");
}

galleryList.insertAdjacentHTML("beforeend", createMarkup(galleryItems));

galleryList.addEventListener("click", handleClick);

function handleClick(event) {
    event.preventDefault();
    
    if (event.target === event.currentTarget) {
        return;
    }

    const bigImage = event.target.closest(".gallery__link").getAttribute("href");

    const popUp = basicLightbox.create(`
    <div class="modal">
    <img width="1400" height="900" src="${bigImage}">
    </div>
    `,
        modalParams
    );

    popUp.show();
    document.addEventListener("keyup", handleClose);
} 

function handleClose(event) {
    const modal = document.querySelector(".basicLightbox");
    
    if (event.code === "Escape") {
        event.currentTarget.removeEventListener("keyup", handleClose);
        modal.remove();
    }
}