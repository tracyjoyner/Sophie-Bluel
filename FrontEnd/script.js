/* fetch jobs - create figures for gallery */
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
    data.forEach((category) => {
      const figure = createJobFigure(category);
      galleryContainer.appendChild(figure);
    });
  });

/* fetch categories - create filter buttons */
const filterButtons = document.querySelector(".filter-buttons");

function createFilterButton(category) {
  const button = document.createElement("button");

  button.setAttribute("class", "button");
  button.setAttribute("filter-type", category.id);
  button.textContent = category.name;

  return button;
}

fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((job) => {
      const button = createFilterButton(job);
      filterButtons.appendChild(button);
    });
  });

/* filter event listeners */
const filterButton = document.querySelectorAll("button");
filterButton.addEventListener("click", () => {
  const figures = document.querySelectorAll(".figure");
  const buttonId = element.getAttribute("filter-type");
  const figureId = element.getAttribute("category-id");
  figures.forEach((figure) => {
    if (buttonId === figureId) {
      figure.style.display = "block";
    } else {
      figure.style.display = "none";
    }
  });
});

const allButton = document.getElementById("all-button");
allButton.addEventListener("click", () => {
  const figures = document.querySelectorAll(".figure");
  figures.forEach((figure) => {
    figure.style.display = "block";
  });
});

/*  */
