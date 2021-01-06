let tableButton=document.querySelector("#tableButton");
let save=document.querySelector("#save");
let claerLocalstorage=document.querySelector("#clearLocalStoragr");
claerLocalstorage.onclick=function(){
    localStorage.clear();
    prepare(thisE);
}
save.onclick=function () {
    localStorage.setItem("save","true");
    let allTd=document.querySelectorAll("td");
    for(let i=0;i<allTd.length;i++){
        let inputName=allTd[i].parentNode.getAttribute("under")+allTd[i].getAttribute("moon");
        localStorage.setItem(inputName,allTd[i].textContent);
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
    tableButton.style="display:block;";
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