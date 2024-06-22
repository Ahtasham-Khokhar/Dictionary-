const btn= document.getElementById("btn");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result= document.getElementById("result");
const sound = document.getElementById("Sound");
 btn.addEventListener("click",()=>
 { 
    result.classList.remove("fade");
    const inputdata= document.getElementById("inputt").value
    fetch(`${url}${inputdata}`)
    .then((store)=>
    store.json()).then((data)=>{
    console.log(data)
    result.innerHTML=` 
     <div id="sample">
     <h3>${inputdata}</h3>
     <p id="Sound" onclick="play_sound()"><i class="fa-solid fa-volume-high"></i></p>   
 </div>
<div id="below_Sample"> 
<p>${data[0].meanings[0].partOfSpeech}</p> 
<p> ${data[0].phonetic}</p>
</div>
<div id="details">  ${data[0].meanings[0].definitions[0].definition}</div>
<div id="more_Details"><p> ${data[0].meanings[0].definitions[0].example ||" "}</p></div>
     `}).catch(()=>{
        result.innerHTML=`<h3 class="error" >The word that you <br> have<br>search is not Found</h3>`
    })
    result.classList.add("fade");
     sound.setAttribute("src",`https: ${data[0].phonetics[0].audio}`);
        })

function play_sound(){
    sound.play();
}