const fs = require('fs');
const http = require('http');
const url = require('url');
const querystring = require('query-string');
const PATH = "www/";
let artikli = [
    {
        "id": 1,
        "naziv": "Artikal 1",
        "cena": "2500",
        "imeKompanije": "Kompanija 1"
    },
    {
        "id": 2,
        "naziv": "Artikal 2",
        "cena": "3500",
        "imeKompanije": "Kompanija 2"
    },
    {
        "id": 3,
        "naziv": "Artikal 3",
        "cena": "4500",
        "imeKompanije": "Kompanija 3"
    },
    {
        "id": 4,
        "naziv": "Artikal 4",
        "cena": "5500",
        "imeKompanije": "Kompanija 1"
    },
    {
        "id": 5,
        "naziv": "Artikal 5",
        "cena": "7500",
        "imeKompanije": "Kompanija 5"
    }
];

http.createServer(function (req, res){    
    let urlObj = url.parse(req.url,true,false);
    if (req.method == "GET"){
        if (urlObj.pathname == "/svi-artikli"){ 
            fs.readFile(PATH + "svi-artikli.html", function (err,data){
                if (err){
                    res.writeHead(404);
                    res.end(JSON.stringify(err));
                    return;
                }
                res.writeHead(200);
                res.end(data);
            });
        }
        if (urlObj.pathname == "/api/svi-artikli"){ 
            res.writeHead(200);
            data = JSON.stringify(sviArtikli());
            res.end(data);
        }
        if (urlObj.pathname == "/dodaj-artikal"){
            fs.readFile(PATH + "dodaj-artikal.html", function (err,data){
                if (err){
                    res.writeHead(404);
                    res.end(JSON.stringify(err));
                    return;
                }
                res.writeHead(200);
                res.end(data);
            });
        }
        if (urlObj.pathname == "/izmeni-artikal"){
            fs.readFile(PATH + "izmeni-artikal.html", function (err,data){
                if (err){
                    res.writeHead(404);
                    res.end(JSON.stringify(err));
                    return;
                }
                res.writeHead(200);
                res.end(data);
            });
        }
    }
    else if(req.method == "POST") {
        if (urlObj.pathname == "/izmeni-artikal"){
            var body = '';
                req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                izmeniArtikal(querystring.parse(body).id,querystring.parse(body).naziv,querystring.parse(body).cena,querystring.parse(body).imeKompanije);
                res.writeHead(302, {
                    'Location': '/izmeni-artikal'
                });
                res.end()
            });
        }
        if (urlObj.pathname == "/obrisi-artikal"){
            var body = '';
                req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                obrisiArtikal(querystring.parse(body).id);
                res.writeHead(302, {
                    'Location': '/svi-artikli'
                });
                res.end();
            });
        }
        if (urlObj.pathname == "/dodaj-artikal"){
            var body = '';
                req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                dodajArtikal(querystring.parse(body).id,querystring.parse(body).naziv,querystring.parse(body).cena,querystring.parse(body).imeKompanije);
                res.writeHead(302, {
                    'Location': '/dodaj-artikal'
                });
                res.end();
            });
        }
    }
}).listen(5000);

function sviArtikli(imeKompanije){
    let pomocni = [];
    for(let i=0;i<artikli.length;i++){
        if(artikli[i].imeKompanije == imeKompanije){
            pomocni.push(artikli[i]);
        }
    }
    return pomocni;
}
function izmeniArtikal(id,naziv,cena,imeKompanije){
    for(let i=0;i<artikli.length;i++){
        if(artikli[i].id == id){
            artikli[i].naziv = naziv;
            artikli[i].cena = cena;
            artikli[i].imeKompanije = imeKompanije;
        }
    }
}
function obrisiArtikal(id){
    let pomocni = [];
    for(let i=0;i<artikli.length;i++){
        if(artikli[i].id != id){
            pomocni.push(artikli[i]);
        }
    }
    artikli = pomocni;
    return artikli;
}
function dodajArtikal(id,naziv,cena,imeKompanije){
    let artikal = {
        'id': id,
        'naziv': naziv,
        'cena': cena,
        'imeKompanije': imeKompanije
    };
    artikli.push(artikal);
}