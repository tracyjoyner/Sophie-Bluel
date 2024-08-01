/* fetch jobs - create figures for gallery */
const galleryContainer = document.querySelector(".gallery");
let jobCache;

/**
 * inserts job cards in page
 *
 * @param {object} job - gallery projects
 * @returns a job card
 */
function createJobFigure(job) {
  const figure = document.createElement("figure");
  const figureImg = document.createElement("img");
  const figureCaption = document.createElement("figcaption");
  figureImg.setAttribute("src", job.imageUrl);
  figureImg.setAttribute("alt", job.title);
  figureCaption.textContent = job.title;

  figure.appendChild(figureImg);
  figure.appendChild(figureCaption);

  return figure;
}

/** fetch jobs */
fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((jobs) => {
    // TODO cache the jobs
    jobs.forEach((job) => {
      const figure = createJobFigure(job);
      galleryContainer.appendChild(figure);
    });
  });

/* fetch categories - create filter buttons */
const filterButtons = document.querySelector(".filter-buttons");

/**
 * inserts category buttons in page
 *
 * @param {object} category - gallery job categories
 * @returns a category button
 */
function createFilterButton(category) {
  const button = document.createElement("button");

  button.setAttribute("class", "button");
  button.setAttribute("id", "filter-button");
  // FIXME use data- prefix attribute for categor.id
  button.setAttribute("data-filter-type", category.id);
  button.textContent = category.name;

  return button;
}

/** fetch categories and event listeners for filters */
fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categories) => {
    // FIXME insert all button here not in HTML(also add event listener for all button)
    categories.forEach((category) => {
      const button = createFilterButton(category);
      filterButtons.appendChild(button);
      // FIXME add event listener to button variable
    });
  });

// TODO move this to fixme above
const allButton = document.getElementById("all-button");
allButton.addEventListener("click", () => {
  console.log("all button clicked");
  // FIXME see filter button event listener fixmes
  const figures = document.querySelectorAll(".job");
  figures.forEach((figure) => {
    figure.style.display = "block";
  });
});
// TODO move this to fixme above
const filterButton = document.getElementById("filter-button");
filterButton.addEventListener("click", (event) => {
  console.log("filter button clicked");
  // FIXME get jobs (using cache)
  // FIXME filter jobCache by category clicked (get category.id from event target)
  // FIXME re-insert job cards after removing old ones
  event.preventDefault();
  const figures = document.querySelectorAll(".job");
  const buttonId = document.querySelectorAll("button.filter-type");
  const figureId = document.querySelectorAll("figure.category-id");
  figures.forEach((figure) => {
    if (buttonId === figureId) {
      figure.style.display = "block";
    } else {
      figure.style.display = "none";
    }
  });
});

/*  */
