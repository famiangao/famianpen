

function findCheck(e) {
    let beChoose=e.target;
    let allChoose=Array();
    let allCheckbox=document.getElementsByName(beChoose.name);
    let situation=Array();
    let checkedNum=0;
    for(let i=0;i<allCheckbox.length;i++){
        if(allCheckbox[i].checked==true){
            situation[checkedNum]=allCheckbox[i].value;
            checkedNum++;
        }
    }
    if(situation.indexOf("all")!=-1){
        //选择了全选
        if(checkedNum==allCheckbox.length-1&&situation.indexOf(beChoose.value)==-1){
            allCheckbox[allCheckbox.length-1].checked=false;
        }
        else {
            for(let i=0;i<allCheckbox.length;i++){
                allCheckbox[i].checked=true;
            }
        }

    }else if(checkedNum==0){
        //一个也没选
        beChoose.checked=true;

    }else if(checkedNum==allCheckbox.length-1) {
        allCheckbox[allCheckbox.length - 1].checked = true;
    }
    checkedNum=0;
    for(let i=0;i<allCheckbox.length-1;i++){
        if(allCheckbox[i].checked==true){
            allChoose[checkedNum++]=allCheckbox[i].value;
        }
    }
    return allChoose;
}
function check(e) {
    let situation=Array();
    let checkedNum=0;
    for(let i=0;i<e.length-1;i++){
        if(e[i].checked==true){
            situation[checkedNum]=e[i].value;
            checkedNum++;
        }
    }
    return situation;
}