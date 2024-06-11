const mongoose = require('mongoose');

const username = encodeURIComponent('<username>');     /*Replace it with your username*/
const password = encodeURIComponent('<password>');     /*Replace it with your password*/
const clusterUrl = '<clusterurl>';                     /*Replace it with your clusterurl*/
const dbname = '<dbname>';                             /*Replace it with your database name*/
const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log(`Successfully connected to the ${dbname} database`))
.catch((err) => console.error("Something went wrong when connecting to the database", err));
