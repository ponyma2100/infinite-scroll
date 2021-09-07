const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photosArray = []
let ready = false
let imagesLoaded = 0
let totlaImages = 0


const apiKey = 'jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek'
const count = '20'
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`

function imageLoaded() {
  // console.log('image loaded')
  imagesLoaded++
  // console.log("🚀 ~ file: script.js ~ line 22 ~ imageLoaded ~ imagesLoaded", imagesLoaded)
  if (imagesLoaded === totlaImages) {
    ready = true
    loader.hidden = true
    // console.log('ready', ready)
  }
}


function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

function displayPhotos() {
  imagesLoaded = 0
  totlaImages = photosArray.length

  photosArray.forEach(photo => {
    const item = document.createElement('a')
    const img = document.createElement('img')
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    })

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    })

    //check each img is finished loading
    img.addEventListener('load', imageLoaded)

    item.appendChild(img)
    imageContainer.appendChild(item)
  })
}


const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl)
    photosArray = await response.json()
    displayPhotos()
  } catch (error) {
    console.log(error)
  }
}

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    // console.log('load more')
    ready = false
    // console.log("🚀 ~ file: script.js ~ line 70 ~ window.addEventListener ~ ready", ready)
    getPhotos()
  }
})

getPhotos()