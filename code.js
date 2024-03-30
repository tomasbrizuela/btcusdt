// VARIABLES

let url = "https://criptoya.com/api/lemoncash/"
let coin = "btc";
let coin1 = "usdt";
let finalizador = "/ars/1"
let satoshis = document.getElementById("satoshis")
let change = document.getElementById('changeToUsd');
let button = document.getElementById('usd');
let usd = document.getElementById("dolar");
let body = document.body;
let title = document.getElementById('title');
let header = document.getElementById('header');
let bar = document.getElementById('bar');
let favicon = document.querySelector("link[rel='shortcut icon']");
let documentTitle = document.querySelector("title");
let sats = document.getElementById('sats');
let totalidad = document.getElementById('totalidad');
let sell = document.getElementById("precioVenta");
let btc;
let usdt;
let total;

function load(){
    let mode = localStorage.getItem("tipo");
    console.log(mode);
}

load();

//  FUNCIONES
async function getPrecios() {
    const response = await fetch(`${url}${coin}${finalizador}`);
    const data = await response.json();
    const price = data.ask;
    btc = price;

    const response1 = await fetch(`${url}${coin1}${finalizador}`)
    const data1 = await response1.json();
    const price1 = data1.ask;
    usdt = price1;

    total = Math.floor(btc / usdt);
    document.querySelector(".precioBtc").innerHTML = "$" + total;
    let st = Math.floor(total * satoshis.value);
    document.querySelector("#preciofinal").innerHTML = "$" + st;
}

getPrecios();

async function getUsd() {
    let response2 = await fetch(`${url}${coin1}${finalizador}`)
    let data2 = await response2.json();
    let price2 = data2.ask;
    console.log(price2);

    let response3 = await fetch(`${url}${coin1}${finalizador}`)
    let data3 = await response3.json()
    let price3 = data3.bid
    console.log("Price 3 es: " + price3);

    document.querySelector(".precioBtc").innerHTML = "$" + price2;
    document.querySelector(".preciobUsdSell").innerHTML = "$" + price3;
    document.querySelector(".totalidad").innerHTML = "$"+Math.floor(satoshis.value/price3*100)/100;
}


satoshis.addEventListener('input', function () {
    console.log("El tìtulo es: "+title.textContent);
    // if( localStorage.getItem("tipo") == "USDT"){
        if(title.textContent == "USDT"){
        getUsd();
    } else {
    getPrecios();
    }
})


change.addEventListener('click', function () {
    getUsd();
    sell.style.height = "40px";
    change.style.transform = "translate(39px, 0)";
    button.style.transform = "translate(0px, 0)"
    change.style.opacity = "0";
    usd.style.opacity = "100";
    usd.style.visibility = "visible";
    usd.style.transform = "translate(19px, 0)";
    body.style.background = "#85bb65";
    title.textContent = "USDT";
    let titleContent = title.textContent;
    console.log(titleContent);
    title.style.textShadow = "1px 1px 10px #105a37";
    header.style.background = "#1a652a";
    bar.style.background = "#85bb65"
    documentTitle.textContent = "USDT";
    // totalidad.style.opacity = "0"
    sats.style.margin = "80px 0px 0px 0px"
    satoshis.placeholder = "ARS"
    favicon.href = 'usd-modified.png';
    localStorage.setItem("tipo",titleContent);
    satoshis.value = "";
})

button.addEventListener('click', function () {
    getPrecios();
    sell.style.opacity = "hidden";
    sell.style.height = "20px";
    button.style.transform = "translate(-39px, 0)";
    change.style.transform = "translate(0px, 0)"
    change.style.opacity = "100";
    usd.style.opacity = "0";
    usd.style.visibility = "hidden";
    usd.style.transform = "translate(19px, 0)";
    body.style.background = "#fd9a0493";
    title.textContent = "BITCOIN";
    let titleContent = title.textContent;
    console.log(titleContent);
    title.style.textShadow = "1px 1px 10px #f98d00";
    header.style.background = "#ffa500";
    bar.style.background = "#fedba8"
    documentTitle.textContent = "BTC";
    totalidad.style.opacity = "100"
    sats.style.margin = "0px 0px 0px 0px"
    satoshis.placeholder = "Satoshis"
    favicon.href = 'bitcoin-btc-logo.png';
    localStorage.setItem("tipo",titleContent);
    satoshis.value = "";

})
