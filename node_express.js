let express = require('express');
let path = require('path');
let app = express();
let port = 9999

let webroot = path.join(__dirname , 'build')

//setting middleware
app.use(express.static(webroot)); //Serves resources from public folder

app.get('/', function (req, res) {
    res.sendFile(path.join(webroot, 'index.html'));
});

app.get('*', function (req, res) {
    res.redirect('/');
});

app.listen(port, ()=>{
    console.log('api server is up on port '+port)
})
