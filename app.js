const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const ejs = require("ejs");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('views', __dirname + '/frontend');
app.use(express.static(__dirname + '/frontend'));

app.get("/",(req,res)=>{
    //testing the api call
    
});
var evid_total = [];

app.get('/test',(req,res)=>{
    // console.log(evid_curr);
    url1 = 'https://api.infermedica.com/covid19/diagnosis'
    url2 = 'https://api.infermedica.com/covid19/triage'
    
    getdata(url1,evid_total)
    .then(val=>{
        if(val.should_stop==true){
            getdata(url2,evid_total)
            .then(val=>{
                console.log(val);
                evid_total = [];
                res.render("done.ejs",{data:val});
            })
        }
        else{
            evid_curr = [];
            use_curr = false;
            res.render("questions.ejs",{data:val});
        }
        
    })
    .catch(err=>{
        console.log(err);
    })
    
});

async function getdata(link,evid){
    var options = {
        url : link,
        method : "POST",
        headers : {
            'App-Id' : 'fe3d67d4',
            'App-Key' : 'c48db66aa757f489705cf03bc754f1fc',
            'Content-Type' : 'application/json'
        },
        body: { 
            sex: 'female',
            age: 25,
            evidence: evid
        },
        json: true
    }

    return new Promise(function(resolve, reject) {
        // Do async job
        request(options, function(err, resp, body) {
          if (err) {
            reject(err);
          } else {
            resolve(body);
          }
        })
      })
}

app.post("/update_evids",(req,res)=>{
    // console.log(req.body.h);
    // if(req.body.h){
    req.body.h.forEach(element => {
        var k = {
            id: element.id.trim(),
            choice_id: element.choice_id.trim()
        } 
        evid_total.push(k);
    });
    // use_curr = req.body.k;
    res.send("received");
    

})

app.listen(3000,(req,res)=>{
    console.log("server running");
})

