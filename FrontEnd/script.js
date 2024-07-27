/* fetch jobs */
const galleryContainer = document.querySelector(".gallery");

function createJobFigure(job) {
  const figure = document.createElement("figure");
  const figureImg = document.createElement("img");
  const figureCaption = document.createElement("figcaption");

  figure.setAttribute("id", job.id);
  figure.setAttribute("category-id", job.categoryId);
  figureImg.setAttribute("src", job.imageUrl);
  figureCaption.textContent = job.title;

  figure.appendChild(figureImg);
  figure.appendChild(figureCaption);

  return figure;
}

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((job) => {
      const figure = createJobFigure(job);
      galleryContainer.appendChild(figure);
    });
  });

/* fetch categories */

/*const filterButtons = document.querySelector(."filter-buttons");

/*fetch("http://localhost:5678/api/categories")
	.then((response) => response.json());*/
