const updateRecord = (db, id, value, timestamp) => {
  const p = new Promise((resolve, reject) => {
    const newRecord = { $set: { id, value, timestamp } };
    const query = { id: id };

    db.collection(process.env.COL_NAME).updateOne(
      query,
      newRecord,
      (error, results) => {
        if (error) {
          reject({ origin: "updateRecord", error });
          return;
        }

        resolve(true);
      }
    );
  });

  p.catch(error => console.log("Error in updateRecord:", error));
  return p;
};

export default updateRecord;
