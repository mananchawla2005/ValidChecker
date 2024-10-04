const form = document.getElementById("repo-checker-form");
const saveURLToLocalStorage = (URL) => {
  let arr = localStorage.getItem("last-searched")
    ? JSON.parse(localStorage.getItem("last-searched"))
    : new Array();
  if (arr.length == 2) arr.shift();
  arr.push(URL);
  localStorage.setItem("last-searched", JSON.stringify(arr));
};
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const URL = document.querySelector(".custom-search-input").value;
  // Save Searched URL to LocalStorage
  saveURLToLocalStorage(URL);
  buildURLList();
  fetchDataFromApi(URL);
  customInput.value = "";
});

const fetchDataFromApi = (URL) => {
  const checkButton = document.querySelector(".custom-search-button");
  const checkButtonLabel = document.querySelector(".check-button-label");
  const dotsContainer = document.querySelector(".dots-container");
  checkButton.setAttribute("disabled", "true");
  checkButtonLabel.classList.toggle("d-block");
  checkButtonLabel.classList.toggle("d-none");
  dotsContainer.classList.toggle("d-none");
  dotsContainer.classList.toggle("d-block");
  const finalURL = `/api?url=${URL}`;
  fetch(finalURL)
    .then((res) => res.json())
    .then((res) => {
      modalDetails(res);
      toggleModal();
      checkButton.removeAttribute("disabled");
      checkButtonLabel.classList.toggle("d-block");
      checkButtonLabel.classList.toggle("d-none");
      dotsContainer.classList.toggle("d-none");
      dotsContainer.classList.toggle("d-block");
    })
    .catch((err) => console.log(err));
};
const toggleModal = () => {
  const modal = document.getElementById("custom-modal");
  modal.classList.toggle("d-block");
};

const openOrNot = (data) => {
  if (data.isOpen != undefined) {
    if (data.isOpen) {
      return " and is opened";
    } else {
      return " and is closed";
    }
  } else {
    return "";
  }
};
const eligibleOrNot = (data) => {
  if (data.isEligible != undefined) {
    if (data.isEligible) {
      return "eligible";
    } else {
      return "not eligible";
    }
  } else {
    return "";
  }
};
const modalDetails = (data) => {
  const result = document.querySelector("#modal-result > span");
  if (data.status == 200 && data.valid) {
    if(data.isEligible){
      result.innerHTML = `${eligibleOrNot(data)} ${openOrNot(data)}`;
      result.style.color = "var(--theme-primary-bg-light)";
    } else {
      result.innerHTML = `${eligibleOrNot(data)} ${openOrNot(data)}`;
      result.style.color = "#ff0000";
    }

  } else if (data.status == 15) {
    result.innerHTML = `banned`;
    result.style.color = "#ff0000";
  }
};
document.querySelector(".button-close").addEventListener("click", toggleModal);
