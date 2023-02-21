//Install express server
const express = require('express');
const app = express();
// const path = require('path');
const port = 3558;

// Serve only the static files form the build directory
// app.use(express.static(__dirname + '/build'));

const http = require('http');

// app.get('/*', function (req, res) {
//     return res.sendFile(path.join(__dirname + '/build', 'index.html'));
// })

const root = require('path').join(__dirname, 'build')
app.use(express.static(root));
app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
})

const server = http.createServer(app);


// Start the app by listening on the default Heroku port
server.listen(port, (err, succ) => {
    if (err) {
        console.log('Error : ', err);
    } else {
        console.log('Express server listening on port ' + port);
    }
});

