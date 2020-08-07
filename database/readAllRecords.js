const readAllRecords = db => {
  const p = new Promise((resolve, reject) => {
    db.collection(process.env.COL_NAME)
      .find({})
      .toArray((error, results) => {
        if (error) {
          reject({ origin: "readAllRecords", error });
          return;
        }

        resolve(results);
      });
  });

  p.catch(error => console.log("Error in readAllRecords:", error));
  return p;
};

export default readAllRecords;
