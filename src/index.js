const proBtn = document.getElementById("proBtn");
const proInput = document.getElementById("proInput");
const proList = document.getElementById("proList");

const conBtn = document.getElementById("conBtn");
const conInput = document.getElementById("conInput");
const conList = document.getElementById("conList");

const clearListsBtn = document.getElementById("clearListsBtn");

const BASE_BTN_CLASS = `
  text-white 
  font-bold 
  py-2 
  px-4 
  rounded
`;

const PRO_BTN_CLASS = `
  bg-teal-500 
  hover:bg-teal-700 
  w-full
`;

const CON_BTN_CLASS = `
  bg-red-500 
  hover:bg-red-700   
  w-full
`;

const REMOVE_BTN_CLASS = `
  bg-gray-300 
  hover:bg-gray-400 
  text-gray-800 
  font-bold 
  text-xs
  p-1
  ml-3
  rounded-full
`;

const CLEAR_BTN_CLASS = `
  bg-orange-400
  hover:bg-orange-500
  mt-8
  m-auto
`;

const LIST_ITEM_CLASS = `  
  my-1
`;

proBtn.className = BASE_BTN_CLASS + " " + PRO_BTN_CLASS;
conBtn.className = BASE_BTN_CLASS + " " + CON_BTN_CLASS;
clearListsBtn.className = BASE_BTN_CLASS + " " + CLEAR_BTN_CLASS;

//init local storage
function initLocalStorage() {
  localStorage.setItem("pro", "[]");
  localStorage.setItem("con", "[]");
}


// Check if local storage exists
// if not init self storage
if (!localStorage.getItem("pro")) {
  console.log("Initializing local storage")
  initLocalStorage();
} else {
  buildListsFromLocalStorage();
}

function buildListsFromLocalStorage() {
  const pros = JSON.parse(localStorage.getItem("pro")); 
  const cons = JSON.parse(localStorage.getItem("con")); 
  pros.forEach((pro) => {
    proInput.value = pro;
    let newItem = createListItem(proInput);
    proList.appendChild(newItem);
  })
  cons.forEach((con) => {
    conInput.value = con;
    let newItem = createListItem(conInput);
    conList.appendChild(newItem);
  })
}

function addItemToLocalStorage(text, type) {
  let items = JSON.parse(localStorage.getItem(type));
  if (items.includes(text)) {
    alert(`You already have that in your ${type} list.`);
    return;
  }
  items.push(text);
  localStorage.setItem(type, JSON.stringify(items));
}

function removeItemFromLocalStorage(text, type) {
  let items = JSON.parse(localStorage.getItem(type));
  const index = items.indexOf(text);
  if (!(index > -1)) {
    console.error(`${text} is not in the ${pro} list.`);
    return;
  }
  items.splice(index, 1);
  localStorage.setItem(type, JSON.stringify(items));
}

function createList(listEl, inputEl) {
  try {
    const newItem = createNewItem(inputEl);
    listEl.appendChild(newItem);
  } catch (err) {
    console.error(err.message);
  }
}

function createListItem(inputEl) {
  const newItem = document.createElement("li");
  const newBtn = createNewItemBtn();
  newItem.className = LIST_ITEM_CLASS;
  newItem.dataset.text = newItem.innerHTML = inputEl.value;
  newItem.dataset.type = inputEl.name;
  newItem.appendChild(newBtn);
  inputEl.value = "";
  return newItem;
}

function createNewItem(inputEl) {
  if (inputEl.value === "") {
    alert(`Please enter a ${inputEl.name}`);
    throw new Error("Empty input");
  }
  addItemToLocalStorage(inputEl.value, inputEl.name);
  // Move to local storage call to prevent
  // creating list item if it exists
  return createListItem(inputEl);
}

function createNewItemBtn() {
  const newBtn = document.createElement("button");
  newBtn.innerHTML = "X";
  newBtn.className = REMOVE_BTN_CLASS;
  newBtn.onclick = e => {
    const parent = e.target.parentElement;
    removeItemFromLocalStorage(parent.dataset.text, parent.dataset.type);
    parent.remove();
  };
  return newBtn;
}

proBtn.onclick = () => createList(proList, proInput);
conBtn.onclick = () => createList(conList, conInput);
clearListsBtn.onclick = () => {
  const confirmClear = confirm("Are you sure you want to clear your lists?")
  if (!confirmClear) {
    return;
  }
  localStorage.clear();
  initLocalStorage()
  proList.innerHTML = conList.innerHTML = "";
}