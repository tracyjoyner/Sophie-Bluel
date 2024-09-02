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
  figure.dataset.id = job.id;

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

function insertJobCards() {
  galleryContainer.innerHTML = "";
  jobCache.forEach((job) => {
    const figure = createJobFigure(job);
    galleryContainer.appendChild(figure);
  });
}

/* fetch categories - create filter buttons */
const filterButtons = document.querySelector(".filter-buttons");

/**
 * creates category buttons
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
  const modalFigure = document.createElement("figure");
  const modalFigureImg = document.createElement("img");
  const trashIcon = document.createElement("i");
  modalFigureImg.setAttribute("src", job.imageUrl);
  modalFigureImg.setAttribute("alt", job.title);
  trashIcon.classList.add("fa-solid", "fa-trash-can", "trash");

  trashIcon.addEventListener("click", ($event) => {
    $event.preventDefault();
    // const jobId = $event.target.dataset.id;
    deleteJobById($event.target);
  });

  modalFigure.appendChild(modalFigureImg);
  modalFigure.appendChild(trashIcon);
  modalFigure.dataset.id = job.id;
  trashIcon.dataset.id = job.id;

  return modalFigure;
}

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((jobs) => {
      jobCache = jobs;
      jobCache.forEach((job) => {
        const modalFigure = createModalJobFigure(job);
        modalGalleryContainer.appendChild(modalFigure);
      });
    });
};

openEdit.addEventListener("click", openModal);

// delete job
function deleteJobById(trashIconElement) {
  const jobId = trashIconElement.dataset.id;
  const figureElement = trashIconElement.closest("figure");
  // const confirm = confirm("Are you sure you want to delete this job?");
  // if (confirm) {
  fetch(`http://localhost:5678/api/works/${jobId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  }).then((response) => response.json());

  figureElement.remove();
  // }
}

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

// function that appends categories to .category-choice
fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categories) => {
    categories.forEach((category) => {
      let categoryOption = document.createElement("option");
      categoryOption.setAttribute("value", category.id);
      categoryOption.textContent = category.name;
      document.querySelector(".category-choice").appendChild(categoryOption);
    });
  });

// add image preview
const addPhoto = document.getElementById("add-photo");

addPhoto.addEventListener("change", () => {
  const chosenPhoto = addPhoto.files[0];
  const photoPreview = document.createElement("img");
  photoPreview.src = URL.createObjectURL(chosenPhoto);
  photoPreview.style.maxHeight = "100%";
  photoPreview.style.width = "auto";
  document.querySelector(".add-photo-button").style.display = "none";
  document.querySelector(".photo-icon").style.display = "none";
  document.querySelector(".new-photo > p").style.display = "none";
  document.querySelector(".new-photo").appendChild(photoPreview);
});

// check if form is filled
const imageCheck = document.getElementById("add-photo");
const titleCheck = document.getElementById("title");
const categoryCheck = document.getElementById("category");
const confirmYes = document.getElementById("modal-confirm");

const checkForm = function () {
  if (
    imageCheck.value === "" ||
    titleCheck.value === "" ||
    categoryCheck.value === "0"
  ) {
    confirmYes.style.backgroundColor = "#a7a7a7";
  } else {
    confirmYes.style.backgroundColor = "#1d6154";
  }
};

imageCheck.addEventListener("input", checkForm);
titleCheck.addEventListener("input", checkForm);
categoryCheck.addEventListener("input", checkForm);

// TODO capture Add photo form input Malt & Juniper - New York
const addJob = document.getElementById("modal-confirm");
const newTitle = document.getElementById("title").value;
const newPhoto = document.getElementById("add-photo").files[0];
const newCategory = document.getElementById("category").value;

addJob.addEventListener("click", ($event) => {
  $event.preventDefault();

  if (
    imageCheck.value === "" ||
    titleCheck.value === "" ||
    categoryCheck.value === "0"
  ) {
    alert("Form not complete");
  }

  const newJob = new FormData();
  newJob.append("title", newTitle);
  newJob.append("image", newPhoto);
  newJob.append("category", newCategory);

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: newJob,
  })
    .then((response) => response.json())
    .then((job) => {
      const figure = createJobFigure(job);
      galleryContainer.appendChild(figure);

      const modalFigure = createModalJobFigure(job);
      modalGalleryContainer.appendChild(modalFigure);

      alert("Success - new job added!");
    });
});

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
