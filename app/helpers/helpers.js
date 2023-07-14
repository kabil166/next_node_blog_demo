export default function removeObjectWithId(arr, id) {
    const objWithIdIndex = arr.findIndex((obj) => obj._id === id);
  
    if (objWithIdIndex > -1) {
      arr.splice(objWithIdIndex, 1);
    }
  
    return arr;
  }