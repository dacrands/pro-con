const proBtn = document.getElementById("proBtn");
const proInput = document.getElementById("proInput");
const proList = document.getElementById("proList");

const conBtn = document.getElementById("conBtn");
const conInput = document.getElementById("conInput");
const conList = document.getElementById("conList");

const BASE_BTN_CLASS = `
  text-white 
  font-bold 
  py-2 
  px-4 
  rounded
  w-full
`;

const PRO_BTN_CLASS = `
  bg-teal-500 
  hover:bg-teal-700 
`;

const CON_BTN_CLASS = `
  bg-red-500 
  hover:bg-red-700   
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

const LIST_ITEM_CLASS = `  
  my-1
`;

proBtn.className = BASE_BTN_CLASS + " " + PRO_BTN_CLASS;
conBtn.className = BASE_BTN_CLASS + " " + CON_BTN_CLASS;

function createList(listEl, inputEl) {
  try {
    const newItem = createNewItem(inputEl);
    const newBtn = createNewItemBtn();
    newItem.appendChild(newBtn);
    listEl.appendChild(newItem);
  } catch (err) {
    console.error(err.message);
  }
}

function createNewItem(inputEl) {
  if (inputEl.value === "") {
    alert(`Please enter a ${inputEl.name}`);
    throw new Error("Empty input");
  }
  const newItem = document.createElement("li");
  newItem.className = LIST_ITEM_CLASS;
  newItem.innerHTML = inputEl.value;
  inputEl.value = "";
  return newItem;
}

function createNewItemBtn() {
  const newBtn = document.createElement("button");
  newBtn.innerHTML = "X";
  newBtn.className = REMOVE_BTN_CLASS;
  newBtn.onclick = e => {
    e.target.parentElement.remove();
  };
  return newBtn;
}

proBtn.onclick = () => createList(proList, proInput);
conBtn.onclick = () => createList(conList, conInput);
