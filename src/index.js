const proBtn = document.getElementById("proBtn");
const proInput = document.getElementById("proInput");
const proList = document.getElementById("proList");

const conBtn = document.getElementById("conBtn");
const conInput = document.getElementById("conInput");
const conList = document.getElementById("conList");

const PRO_BTN_CLASS = `
  bg-teal-500 
  hover:bg-teal-700 
  text-white 
  font-bold 
  py-2 
  px-4 
  rounded
`;

const CON_BTN_CLASS = `
  bg-red-500 
  hover:bg-red-700 
  text-white 
  font-bold 
  py-2 
  px-4 
  rounded
`;

const REMOVE_BTN_CLASS = `
  bg-gray-300 
  hover:bg-gray-400 
  text-gray-800 
  font-bold 
  py-1 
  px-2 
  ml-1
  rounded-l
`;

const LIST_ITEM_CLASS = `
  py-1
  my-3
`;

proBtn.className = PRO_BTN_CLASS;
conBtn.className = CON_BTN_CLASS;

function createList(listEl, inputEl) {
  const newPro = document.createElement("li");
  const newBtn = document.createElement("button");
  newPro.className = LIST_ITEM_CLASS;
  newPro.innerHTML = inputEl.value;
  newBtn.innerHTML = "X";
  newBtn.className = REMOVE_BTN_CLASS;
  newBtn.onclick = e => {
    e.target.parentElement.remove();
  };
  newPro.appendChild(newBtn);
  listEl.appendChild(newPro);
  inputEl.value = "";
}

proBtn.onclick = () => createList(proList, proInput);
conBtn.onclick = () => createList(conList, conInput);
