const deleteRecord = (db, id) => {
  const p = new Promise((resolve, reject) => {
    const filter = { id };

    db.collection(process.env.COL_NAME).deleteOne(filter, (error, results) => {
      if (error) {
        reject({ origin: "deleteRecord", error });
        return;
      }

      resolve(true);
    });
  });

  p.catch(error => console.log("Error in deleteRecord:", error));
  return p;
};

export default deleteRecord;
