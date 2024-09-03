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
  console.log(bucketListContainer);
};
