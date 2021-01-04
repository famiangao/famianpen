let tableButton=document.querySelector("#tableButton");
let save=document.querySelector("#save");
let claerLocalstorage=document.querySelector("#clearLocalStoragr");
claerLocalstorage.onclick=function(){
    localStorage.clear();
    prepare(thisE);
}
save.onclick=function () {
    localStorage.setItem("save","true");
    let allInput=document.querySelectorAll("td input");
    for(let i=0;i<allInput.length;i++){
        let inputName=allInput[i].parentNode.parentNode.getAttribute("under")+allInput[i].parentNode.getAttribute("moon");
        localStorage.setItem(inputName,allInput[i].value);
    }
    // for (let i=0;i<sourceData.length;i++){
    //     if(localStorage.getItem(sourceData[i].region+" "+sourceData[i].product+"0")){
    //         let saleMoon=Array;
    //         for(let j=0;j<12;j++){
    //             saleMoon[i]=localStorage.getItem(sourceData[i].region+" "+sourceData[i].product+j);
    //
    //         }
    //         sourceData[i].sale=saleMoon;
    //     }
    // }
}
function setinput(){
    let allInput=document.querySelectorAll("td input");
    tableButton.style="display:block;";
    for(let i=0;i<allInput.length;i++){
        allInput[i].addEventListener("blur",inputJudge);
    }
}
function inputJudge(e) {
    if(e.target.nodeName=="INPUT"){
        let thisInput=e.target.value;
        if(isNaN(Number(thisInput))){
            alert("请输入一个数字");
            e.target.value=0;
        }

    }

}