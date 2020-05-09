const proBtn = document.getElementById("proBtn");
const proInput = document.getElementById("proInput");
const proList = document.getElementById("proList");

const conBtn = document.getElementById("conBtn");
const conInput = document.getElementById("conInput");
const conList = document.getElementById("conList");

function createList(listEl, inputEl) {
  const newPro = document.createElement("li");
  const newBtn = document.createElement("button");
  newPro.innerHTML = inputEl.value;
  newBtn.innerHTML = "X";
  newBtn.onclick = e => {
    e.target.parentElement.remove();
  };
  newPro.appendChild(newBtn);
  listEl.appendChild(newPro);
  inputEl.value = "";
}

proBtn.onclick = () => createList(proList, proInput);
conBtn.onclick = () => createList(conList, conInput);
