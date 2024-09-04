let bucketListContainer = [];

const handleOnSubmit = (e) => {
  const newForm = new FormData(e);
  const bucketList = newForm.get("bucketList");
  const money = newForm.get("money");
  const obj = {
    bucketList,
    money,
    id: randomIdGenerator(),
    type: "entry",
  };

  bucketListContainer.push(obj);
  displayElmList();
};

const displayElmList = () => {
  let str = "";
  const bucketListEntry = document.getElementById("bucketListEntry");

  const entryList = bucketListContainer.filter((item) => item.type === "entry");

  entryList.map((item, i) => {
    str += `<tr class="" style="border: 2px solid red">
                  <td>${1 + i}</td>
                  <td>${item.bucketList}</td>
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
};
const displayBadList = () => {
  let str = "";
  const badElm = document.getElementById("badList");

  const badList = bucketListContainer.filter((item) => item.type === "bad");

  badList.map((item, i) => {
    str += `<tr class="" style="border: 2px solid red">
                  <td>${1 + i}</td>
                  <td>${item.bucketList}</td>
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

const handleOnDelete = (id) => {
  if (window.confirm("Are you sure you want to Delete the bucket list??")) {
    const filteredArg = bucketListContainer.filter((item) => item.id !== id);
    bucketListContainer = filteredArg;
    displayElmList();
    displayBadList();
  }
};

const handleOnSwitch = (id, type) => {
  bucketListContainer = bucketListContainer.map((item) => {
    if (item.id === id) {
      item.type = type;
    }
    return item;
  });
  displayElmList();
  displayBadList();
};
