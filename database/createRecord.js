const createRecord = (db, id, value, timestamp) => {
  const p = new Promise((resolve, reject) => {
    const newRecord = { id, value, timestamp };

    db.collection(process.env.COL_NAME).insertOne(
      newRecord,
      (error, results) => {
        if (error) {
          reject({ origin: "createRecord", error });
          return;
        }

        resolve(true);
      }
    );
  });

  p.catch(error => console.log("Error in createRecord:", error));
  return p;
};

export default createRecord;
