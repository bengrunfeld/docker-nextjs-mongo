const createRecord = (db, id) => {
  const p = new Promise((resolve, reject) => {
    const filter = { id };

    db.collection(process.env.COL_NAME).deleteOne(filter, (error, results) => {
      if (error) {
        reject({ origin: "createRecord", error });
        return;
      }

      resolve(true);
    });
  });

  p.catch(error => console.log("Error in createRecord:", error));
  return p;
};

export default createRecord;
