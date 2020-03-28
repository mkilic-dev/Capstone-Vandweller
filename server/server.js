const express = require('express');
// Enable req.body have all the data user enter in the ajax request.
const bodyParser = require('body-parser');
const app = express();
const locationRoute = require("./routes/locationRoute");
const externalRoute = require("./routes/externalRoute");


// cross origin resource sharing
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

// express.urlencoded alows posting form data
app.use(express.urlencoded({ extended: true }));
// in order to access req.body you need to use express.json() middleware
app.use(express.json());
// serve public files e.g. index.html
app.use(express.static('public'));

// routes
app.use("/api/locations", locationRoute);
app.use("/api/external", externalRoute);

// start the server and listen on port 5000
app.listen(5000, () => {
  console.log(`server is running at: http://localhost:5000`);
});
