let bucketListContainer = [];
const moneyWasted = document.getElementById("MoneyWasted");

const totalBudget = 12 * 2000;

const handleOnSubmit = (e) => {
  const newForm = new FormData(e);
  const bucketList = newForm.get("bucketList");
  const money = +newForm.get("money");
  const obj = {
    bucketList,
    money,
    id: randomIdGenerator(),
    type: "entry",
    isSelected: false,
  };

  //checking if enough money left
  const existingTtlBudget = totalMoneyCalculation();
  if (existingTtlBudget + money > totalBudget) {
    return alert("Not enough Budget Time to save More");
  }

  bucketListContainer.push(obj);
  displayList();

  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  const toastSound = document.getElementById("toastifySound");

  toastBootstrap.show();
  toastSound.play();

  e.reset();
};

const handleSelectAll = (event, type) => {
  const isChecked = event.checked;

  // Update selection for the correct list
  bucketListContainer.forEach((bucket) => {
    if (bucket.type === type) {
      bucket.isSelected = isChecked;
    }
  });

  displayList();
};

const handleOnSelect = (checkbox) => {
  const id = checkbox.value;
  const isChecked = checkbox.checked;

  console.log(id, isChecked);

  selectedTaskEntry = bucketListContainer.find(
    (bucket) => bucket.id == id && bucket.type == "allEntry"
  );
  selectedTaskBad = bucketListContainer.find((bucket) => {
    bucket?.id == id && bucket.type == "badEntry";
  });

  selectedTask.isSelected = isChecked;
};

const displayList = () => {
  displayElmList();
  displayBadList();

  localStorage.setItem(
    "bucketListContainer",
    JSON.stringify(bucketListContainer)
  );

  console.log(localStorage.getItem("bucketListContainer"));
};

const displayElmList = () => {
  let str = "";
  const bucketListEntry = document.getElementById("bucketListEntry");

  const entryList = bucketListContainer.filter((item) => item.type === "entry");

  entryList.map((item, i) => {
    str += `<tr class="" style="border: 2px solid red">
                  <td>${1 + i}</td>
                  <td><input class="form-check-input" type="checkbox" value="${
                    item?.id
                  }" id="" onchange="handleOnSelect(this)" ${
      item?.isSelected ? "checked" : ""
    }>
                  
                  ${item.bucketList}</td>
                  <td>$${item.money}</td>
                  <td class="text-end">
                    <button onClick="handleOnDelete('${
                      item.id
                    }')" class="btn btn-danger">
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                    <button onClick="handleOnSwitch('${
                      item.id
                    }','bad')" class="btn btn-success">
                      <i class="fa-solid fa-arrow-right"></i>
                    </button>
                  </td>
                </tr>`;
  });
  bucketListEntry.innerHTML = str;
  totalMoneyCalculation();
};
const displayBadList = () => {
  let str = "";
  const badElm = document.getElementById("badList");

  const badList = bucketListContainer.filter((item) => item.type === "bad");

  badList.map((item, i) => {
    str += `<tr class="" style="border: 2px solid red">
                  <td>${1 + i}</td>
                  <td><input class="form-check-input" type="checkbox" value="${
                    item?.id
                  }" id="" onchange="handleOnSelect(this)" ${
      item?.isSelected ? "checked" : ""
    } >
                  
                  ${item.bucketList}</td>
                  <td>$${item.money}</td>
                  <td class="text-end">
                    <button onClick="handleOnDelete('${
                      item.id
                    }')" class="btn btn-danger">
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                    <button onClick="handleOnSwitch('${
                      item.id
                    }','entry')" class="btn btn-warning">
                      <i class="fa-solid fa-arrow-left"></i>
                    </button>
                  </td>
                </tr>`;
  });

  badElm.innerHTML = str;
  document.getElementById("moneyWasted").innerText = badList.reduce(
    (acc, item) => {
      return acc + item.money;
    },
    0
  );
};
const randomIdGenerator = () => {
  const str = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

  let id = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * str.length);

    id += str[randomIndex];
  }
  return id;
};

const handleSelectedDelete = () => {
  bucketListContainer = bucketListContainer.filter((bucket) => {
    return (
      !(bucket.isSelected && bucket.type === "entry") &&
      !(bucket.isSelected && bucket.type === "bad")
    );
  });
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  const toastSound = document.getElementById("deleteSound");

  toastBootstrap.show();
  toastSound.play();

  displayList();
};

const handleOnDelete = (id) => {
  if (window.confirm("Are you sure you want to Delete the bucket list??")) {
    const filteredArg = bucketListContainer.filter((item) => item.id !== id);
    bucketListContainer = filteredArg;
    displayList();
  }

  const toastLiveExample = document.getElementById("liveToastDelete");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  const toastSound = document.getElementById("deleteSound");

  toastBootstrap.show();
  toastSound.play();
};

const handleOnSwitch = (id, type) => {
  bucketListContainer = bucketListContainer.map((item) => {
    if (item.id === id) {
      item.type = type;
    }
    return item;
  });
  displayList();

  const toastLiveExample = document.getElementById("liveToastToSwitch");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  const toastSound = document.getElementById("soundToSwitch");

  toastBootstrap.show();
  toastSound.play();
};

const totalMoneyCalculation = () => {
  const ttlBudget = bucketListContainer.reduce((acc, item) => {
    return acc + item.money;
  }, 0);

  document.getElementById("totalBudget").innerText = ttlBudget;
  return ttlBudget;
};
const displayDataFromLocalStorage = () => {
  bucketListContainer = JSON.parse(localStorage.getItem("bucketListContainer"));
  displayList();
};
displayDataFromLocalStorage();
