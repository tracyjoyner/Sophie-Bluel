/* fetch jobs */
const galleryContainer = document.querySelector('.gallery');

fetch('http://localhost:5678/api/works')
.then(response => {
return response.json();
})

gallery.innerHTML = `<figure></figure>`

/* <figure>
				<img src="assets/images/abajour-tahina.png" alt="Tahina Lampshade">
				<figcaption>Tahina Lampshade</figcaption>
			</figure> */


/* fetch categories */
fetch('http://localhost:5678/api/categories')
.then(response => {
return response.json();
})