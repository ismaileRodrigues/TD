const fromText = document.querySelector(".front-text"),
toText = document.querySelector(".to-text"),
selectTag = document.querySelectorAll("select"),
exchangeIcon = document.querySelector(".exchange"),
translateBtn = document.querySelector("button");
icons = document.querySelectorAll(".row i");

selectTag.forEach((tag,id) => {
    for (const country_code in countries) {
       let selected;
       if (id==0 && country_code=="en-GB"){
        selected = "selected";
       } else if(id==1 && country_code=="pt-BR"){
        selected = "selected";
       }
        let option = `  <option value="${country_code}" ${selected}>${countries [country_code]}</option>`
        tag.insertAdjacentHTML("beforeend",option);
    }
});

exchangeIcon.addEventListener("click", () =>{
    //trocando texarea e seleciona valores de tag
    let tempText  = fromText.value;
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempLang;
})

translateBtn.addEventListener("click", ()=>{
    let text= fromText.value;
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    if(!text)return;
    toText.setAttribute("placeholde", "Translating...");
    let apiURL =`https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`
    fetch(apiURL).then(res =>res.json()).then(data => {
        console.log(data)
        toText.value = data.responseData.translatedText
        toText.setAttribute("placeholde", "Translation");
    })
    if(toText){
        toText.style.background='#bdc6e9'
    }
  
})

icons.forEach(icon =>{
    icon.addEventListener("click", ({target}) => {
        if (target.classList.contains("fa-copy")) {
            if(target.id =="from") {
             navigator.clipboard.writeText(fromText.value)
            } else{
                navigator.clipboard.writeText(toText.value)
            }
        } else{
            let  utterance;
            // se o ícone clicado tiver id, falar o valor fromtexarea se nao falar o valor toTexarea
            if(target.id =="from") {
               utterance = new SpeechSynthesisUtterance(fromText.value);
               utterance.lang = selectTag[0].value;
              } else{
                 utterance = new SpeechSynthesisUtterance(toText.value);
                 utterance.lang = selectTag[1].value;
              }
              speechSynthesis.speak(utterance);
        }
    })
})

fromText.addEventListener('keypress',(e)=>{
    if(e.keyCode ==13){
        translateBtn.click()
    }
})