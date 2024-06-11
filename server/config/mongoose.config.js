const mongoose = require('mongoose');

const username = encodeURIComponent('<username>');
const password = encodeURIComponent('<password>');
const clusterUrl = 'cluster0.ilezabu.mongodb.net';
const dbname = '<dbname>';
const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log(`Successfully connected to the ${dbname} database`))
.catch((err) => console.error("Something went wrong when connecting to the database", err));
