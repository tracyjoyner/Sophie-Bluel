/* fetch jobs - create figures for gallery */
const galleryContainer = document.querySelector(".gallery");
let jobCache;

function isLoggedIn() {
  // return true if local storage has a token, otherwise false
  if (localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
}

if (isLoggedIn()) {
  // show black edit bar, small edit button, and logout - Hide login and filter buttons
  document.getElementById("top-bar").classList.remove("hidden");
  document.getElementById("logout").classList.remove("hidden");
  document.querySelector(".modal-open").classList.remove("hidden");
  document.getElementById("login").classList.add("hidden");
  document.querySelector(".filter-buttons").classList.add("hidden");
} else {
  // hide black edit bar, small edit button, and logout - Show login and filter buttons
  document.getElementById("top-bar").classList.add("hidden");
  document.getElementById("logout").classList.add("hidden");
  document.querySelector(".modal-open").classList.add("hidden");
  document.getElementById("login").classList.remove("hidden");
  document.querySelector(".filter-buttons").classList.remove("hidden");
}

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
    insertJobCards();
  });

/* fetch categories - create filter buttons */
const filterButtons = document.querySelector(".filter-buttons");

function insertJobCards() {
  galleryContainer.innerHTML = "";
  jobCache.forEach((job) => {
    const figure = createJobFigure(job);
    galleryContainer.appendChild(figure);
  });
}

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
});

/** fetch categories and event listeners for filters */
fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categories) => {
    categories.forEach((category) => {
      const filterButton = createFilterButton(category);
      filterButtons.appendChild(filterButton);
      filterButton.addEventListener("click", filterJob);
    });
  });

function filterJob($event) {
  const categoryId = parseInt($event.target.value);
  galleryContainer.innerHTML = "";

  function categoryValue(job) {
    return categoryId === job.categoryId;
  }
  const filteredJobs = jobCache.filter(categoryValue);
  filteredJobs.forEach((job) => {
    const figure = createJobFigure(job);
    galleryContainer.appendChild(figure);
  });
}

/* logout */
const logout = document.getElementById("logout");

logout.addEventListener("click", () => {
  localStorage.removeItem("token");
});

/* modal */
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openEdit = document.querySelector(".modal-open");
const closeX = document.querySelector(".close-x");
const closeX2 = document.querySelector(".close-x2");
const modalGalleryContainer = document.querySelector(".photo-gallery");

/**
 * inserts job cards in page
 *
 * @param {object} job - gallery projects - modal
 * @returns a job card
 */
function createModalJobFigure(job) {
  const figure = document.createElement("figure");
  const figureImg = document.createElement("img");
  const trashIcon = document.createElement("i");
  figureImg.setAttribute("src", job.imageUrl);
  figureImg.setAttribute("alt", job.title);
  trashIcon.classList.add("fa-solid", "fa-trash-can", "trash");
  trashIcon.setAttribute("id", "trash");

  figure.appendChild(figureImg);
  figure.appendChild(trashIcon);
  figure.dataset.id = job.id;

  return figure;
}

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((jobs) => {
      jobCache = jobs;
      jobCache.forEach((job) => {
        const figure = createModalJobFigure(job);
        modalGalleryContainer.appendChild(figure);
      });
    });
};

openEdit.addEventListener("click", openModal);

// add event listener for "add a photo button" that opens 2nd modal
const openAddPhoto = document.querySelector(".modal-add-photo-button");
const modalAddPhoto = document.querySelector(".modal-add-photo");
const backArrow = document.querySelector(".back-arrow");

const openAddPhotoModal = function () {
  modal.classList.add("hidden");
  modalAddPhoto.classList.remove("hidden");
};

openAddPhoto.addEventListener("click", openAddPhotoModal);

// return to first modal using back arrow or close second modal using x
const closeAddPhotoModal = function () {
  modalAddPhoto.classList.add("hidden");
  modal.classList.remove("hidden");
};

backArrow.addEventListener("click", closeAddPhotoModal);
closeX2.addEventListener("click", closeAddPhotoModal);

// TODO capture Add photo form input
const addPhoto = document.querySelector(".add-photo-button");
/*addPhoto.addEventListener("click", )*/

const addPhotoText = document.getElementById("title");

const categoryDropdown = document.querySelector(".category-choice");
/*categoryDropdown.addEventListener("change", ($event) => {
  = $event.target.value;
});*/

// TODO change confirm button background-color to #1d6154 after form is filled
const imageCheck = document.getElementById("add-photo");
const titleCheck = document.getElementById("title");
const categoryCheck = document.getElementById("category");
const confirmYes = document.getElementById("modal-confirm");

function checkForm() {
  if (
    imageCheck.value !== "" &&
    titleCheck.value !== "" &&
    categoryCheck.value !== ""
  ) {
    confirmYes.style.backgroundColor = "#1d6154";
  } else {
    submitButton.style.backgroundColor = "#a7a7a7";
  }
}

imageCheck.addEventListener("input", checkForm);
titleCheck.addEventListener("input", checkForm);
categoryCheck.addEventListener("input", checkForm);

const confirm = document.querySelector(".modal-confirm");
/*confirm.addEventListener("click", )*/

// TODO add a function that appends a new category to .category-choice



// TODO delete project
const deleteJob = document.querySelector(".trash");
// deleteJob.addEventListener("click", ($event) => {
//   $event.target.getElementById("trash").parentElement.dataset.id;
//   // jobCache.remove(removeJob);
  console.log(deleteJob);
// });

// close modal
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  modalGalleryContainer.innerHTML = "";
  modalAddPhoto.classList.add("hidden");
  insertJobCards();
};

closeX.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
