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
    jobCache = jobs;
    jobCache.forEach((job) => {
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
  button.setAttribute("value", category.id);
  button.setAttribute("category", category.name);
  button.textContent = category.name;

  return button;
}

/**
 * inserts All button
 *
 * @param {object} category - all button
 * @returns All button
 */
function createAllButton() {
  const allButton = document.createElement("button");

  allButton.setAttribute("class", "button");
  allButton.setAttribute("id", "all-button");
  allButton.textContent = "All";

  return allButton;
}

const allButton = createAllButton();
filterButtons.appendChild(allButton);
allButton.addEventListener("click", () => {
  galleryContainer.innerHTML = "";
  jobCache.forEach((job) => {
    const figure = createJobFigure(job);
    galleryContainer.appendChild(figure);
  });
  console.log("all button clicked");
});

/** fetch categories and event listeners for filters */
fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categories) => {
    categories.forEach((category) => {
      const filterButton = createFilterButton(category);
      filterButtons.appendChild(filterButton);
      filterButton.addEventListener("click", ($event) => {
        galleryContainer.innerHTML = "";
        
        console.log($event.target.value);

        function categoryValue(job) {
          if ($event.target.value == jobCache.categoryId) {
            return job;
          }
        }
        const filteredJobs = jobCache.filter(categoryValue);
        filteredJobs.forEach((job) => {
          const figure = createJobFigure(job);
          galleryContainer.appendChild(figure);
          console.log("filter button clicked");
        });
      });
    });
  });

// FIXME get jobs (using cache)
// FIXME filter jobCache by category clicked (get category.id from event target)
// FIXME re-insert job cards after removing old ones

/* login */

/*window.location.assign("index.html");*/
