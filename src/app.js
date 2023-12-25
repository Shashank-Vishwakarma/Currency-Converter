
const updateImage = (element)=>{
    for(country of countryList) {
        if(country["code"] === element.value) {
            let image = element.parentElement.querySelector("img")
            image.src = country["flag"]
        }
    }
}

const selects = document.querySelectorAll(".country-box select");

for(const select of selects) {
    for(country of countryList) {
        const newOption = document.createElement("option");
        newOption.innerText = `${country["countryCode"]}: ${country["country"]}`;
        newOption.value = country["code"];
        select.append(newOption);

        if(select.name==="fromCountry" && country["code"]==="USD") {
            newOption.selected = true
            let image = select.parentElement.querySelector("img")
            image.src = country["flag"]
        } else if(select.name==="toCountry" && country["code"]==="INR") {
            newOption.selected = true
            let image = select.parentElement.querySelector("img")
            image.src = country["flag"]
        }
    }

    select.addEventListener("change", (event)=>{
        updateImage(event.target)
    })
}

const calculate = async ()=>{
    const from = document.querySelector(".country-box #from");
    const to = document.querySelector(".country-box #to");
    const amount = document.querySelector(".amount-container input");

    if(!amount.value || amount.value<1) {
        amount.value = 1;
    }

    const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`
    const response = await fetch(url);
    const amt = await response.json();
    
    const para = document.querySelector(".result p");
    para.innerText = `${amount.value} ${from.value} = ${amount.value * amt[`${to.value.toLowerCase()}`]} ${to.value}`
}

const btn = document.querySelector("button")
btn.addEventListener("click", (event)=>{
    calculate();
})

window.addEventListener("load", ()=>{
    calculate();
})
