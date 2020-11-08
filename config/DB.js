module.exports.connectDB = async (mongoose, hostname, dbport, dbname) => {
  try {
    await mongoose
      .connect(`mongodb://${hostname}:${dbport}/${dbname}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then(() => {
        console.log('          Connected to DB...');
      });
  } catch (error) {
    console.log('Can not connect to DB');
    process.exit();
  }
};
