let bucketListContainer = [];

const handleOnSubmit = (e) => {
  const newForm = new FormData(e);
  const bucketList = newForm.get("bucketList");
  const money = newForm.get("money");
  const obj = {
    bucketList,
    money,
  };
  bucketListContainer.push(obj);
  displayElmList();
};

const displayElmList = () => {
  let str = "";
  const bucketListEntry = document.getElementById("bucketListEntry");
  bucketListContainer.map((item, i) => {
    str += `<tr class="">
                  <td>${1 + i}</td>
                  <td>${item.bucketList}</td>
                  <td>$${item.money}</td>
                  <td class="text-end">
                    <button class="btn btn-danger">
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                    <button class="btn btn-success">
                      <i class="fa-solid fa-arrow-right"></i>
                    </button>
                  </td>
                </tr>`;
  });
  bucketListEntry.innerHTML = str;
};
