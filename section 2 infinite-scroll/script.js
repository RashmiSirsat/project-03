const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];





// Unsplash API
const count = 30;
const apiKey = 'zyCQAg0H502Jpj9XkQP7sMnvbs-EZai24i0iz6ZxjkE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// CHECK IF ALL IMAGE   WERE LOADED
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready=',ready);
    }

}


// HELPER FUNCTION O SET ATTRIBUTES ON DOM ELEMENTS
function setAttributes(element,attributes){
    for (const key in attributes) {
        element.setAttribute(key,attributes[key]);
    }
}


// CREATE ELEMENTS FOR LINKS AND PHOTOS,ADD TO DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images',totalImages);
    // RUN FUNCTION FOR EACH OBJECT IN PHOTOSARRAY
    photosArray.forEach((photo) => {
        // CREATE <A> TO LINK TO UNSPLASH

        const item = document.createElement('a');
        
        setAttributes(item, {
            href:photo.links.html,
            target:'_blank',
        });

        // CREATE <img> FOR PHOTO
        const img = document.createElement('img');
        setAttributes(img, {
            src:photo.urls.regular,
            alt:photo.alt_discription,
            tittle:photo.alt_discription,
        });

        // EVENT LISTNER ,CHECK WHEN EACH IS FINISHED LOADING 
        img.addEventListener('load',imageLoaded);

        // PUT <IMG> INSIDE <A>,THN PUT INSIDE IMAGECONTAINER ELEMENT
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get Photos From Unsplash API

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        

    } catch (error) {
        // Catch Error Here
    }
}

// CHECK TO SEE IF SCROLLING NEAR BOTTOM OF PAGE,LOAD MORE PHOTOS
window.addEventListener('scroll',()=>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready ) {
        ready = false;
        getPhotos();
        
    }
});


// On Load
getPhotos();