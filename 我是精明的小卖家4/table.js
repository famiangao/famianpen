
function putTable(region,product) {
    let regionSize=region.length;
    let productSize=product.length;
    let productMax=productSize>=regionSize?true:false;
    //准备
    let div=document.createElement("table");
    div.setAttribute("border",1);
    div.setAttribute("cellspacing",0);
    //渲染表头
    let tr2=document.createElement("tr");
    let th=document.createElement("th");
    th.textContent=region+"地区"+product+"售卖情况";
    th.colSpan=14;
    tr2.appendChild(th);
    div.appendChild(tr2);

    //渲染表格标题
    let tr=document.createElement("tr");
    if(productMax){
        let tda=document.createElement("td");
        tda.textContent="商品";
        tr.appendChild(tda);
        let tdb=document.createElement("td");
        tdb.textContent="产地";
        tr.appendChild(tdb);
    }else {
        let tdb=document.createElement("td");
        tdb.textContent="产地";
        tr.appendChild(tdb);
        let tda=document.createElement("td");
        tda.textContent="商品";
        tr.appendChild(tda);
    }
    let tdc=document.createElement("td");
    tdc.textContent="一月";
    tr.appendChild(tdc);
    let tdd=document.createElement("td");
    tdd.textContent="二月";
    tr.appendChild(tdd);
    let tde=document.createElement("td");
    tde.textContent="三月";
    tr.appendChild(tde);let
        tdf=document.createElement("td");
    tdf.textContent="四月";
    tr.appendChild(tdf);
    let tdg=document.createElement("td");
    tdg.textContent="五月";
    tr.appendChild(tdg);
    let tdh=document.createElement("td");
    tdh.textContent="六月";
    tr.appendChild(tdh);
    let tdi=document.createElement("td");
    tdi.textContent="七月";
    tr.appendChild(tdi);
    let tdj=document.createElement("td");
    tdj.textContent="八月";
    tr.appendChild(tdj);
    let tdk=document.createElement("td");
    tdk.textContent="九月";
    tr.appendChild(tdk);
    let tdl=document.createElement("td");
    tdl.textContent="十月";
    tr.appendChild(tdl);
    let tdm=document.createElement("td");
    tdm.textContent="十一月";
    tr.appendChild(tdm);
    let tdn=document.createElement("td");
    tdn.textContent="十二月";
    tr.appendChild(tdn);

    div.appendChild(tr);

    if(productMax){
        productMaxX(region,product,div);
    }else {
        regionMaxX(region,product,div);
    }

    showTable.appendChild(div);
    showTable.style.display="block";

}
function productMaxX(region,product,div) {
    for(let j=0;j<product.length;j++){
        let putProduct=true;
        for (let k=0;k<region.length;k++){
            for(let i=0;i<sourceData.length;i++){
                if(region[k]==sourceData[i].region&&product[j]==sourceData[i].product){
                    let tr=document.createElement("tr");
                    tr.setAttribute("under",sourceData[i].region+" "+sourceData[i].product);

                    if(putProduct){
                        putProduct=false;
                        let td1=document.createElement("td");
                        td1.textContent=sourceData[i].product;
                        td1.rowSpan=region.length;
                        tr.appendChild(td1)
                    }
                    let td2=document.createElement("td");
                    td2.textContent=sourceData[i].region;
                    tr.appendChild(td2);

                    let sale=Array;
                    if(localStorage.getItem(sourceData[i].region+" "+sourceData[i].product+"1")){
                        for (let jj=0;jj<12;jj++){
                            sale[jj]=Number(localStorage.getItem(sourceData[i].region+" "+sourceData[i].product+jj));
                        }
                    }
                    else {
                        sale=sourceData[i].sale;
                    }
                    for(let l=0;l<12;l++){
                        let td=document.createElement("td");
                        let image=document.createElement("img");
                        image.src="pencil.jpg";
                        image.className="pencilIcon";
                        td.setAttribute("moon",l);
                        td.textContent=sale[l];
                        td.appendChild(image);
                        tr.appendChild(td);
                    }
                    div.appendChild(tr);
                    break;
                }
            }
        }
    }
}
function regionMaxX(region,product,div) {
    for(let j=0;j<region.length;j++){
        let putRegion=true;
        for (let k=0;k<product.length;k++){
            for(let i=0;i<sourceData.length;i++){
                if(region[j]==sourceData[i].region&&product[k]==sourceData[i].product){
                    let tr=document.createElement("tr");
                    tr.setAttribute("under",sourceData[i].region+" "+sourceData[i].product);
                    if(putRegion){
                        putRegion=false;
                        let td1=document.createElement("td");
                        td1.textContent=sourceData[i].region;
                        td1.rowSpan=product.length;
                        tr.appendChild(td1);
                    }
                    let td2=document.createElement("td");
                    td2.textContent=sourceData[i].product;
                    tr.appendChild(td2);
                    for(let l=0;l<12;l++){
                        let td=document.createElement("td");
                        let image=document.createElement("img");
                        image.src="pencil.jpg";
                        image.className="pencilIcon";
                        td.setAttribute("moon",l);
                        td.textContent=sourceData[i].sale[l];
                        td.appendChild(image);
                        tr.appendChild(td);
                    }
                    div.appendChild(tr);
                    break;
                }
            }
        }
    }
}
function aboutTd() {
    let tableDiv=document.querySelector("#show_table");
    tableDiv.addEventListener("mouseover",tdMouseover);
    tableDiv.addEventListener("mouseout",tdMouseout);
    tableDiv.addEventListener("click",tdClick);

}
function tdMouseover(e) {
    if(e.target.nodeName==="TD"&&e.target.querySelector("img")){
        let xxx=e.target.querySelector("img");
        xxx.style="display:block";
    }

}
function tdMouseout(e) {
    if(e.target.nodeName==="TD"&&e.target.querySelector("img")){
        let xxx=e.target.querySelector("img");
        xxx.style="display:none";
    }
}
let oldnum;
let event;
let issue=false;
function tdClick(e) {
    if(e.target.nodeName==="TD"&&e.target.querySelector("img")){
        let inputText=document.createElement("input");
        inputText.type="text";
        let buttonSubmit=document.createElement("button");
        buttonSubmit.textContent="确定";
        let buttonCancle=document.createElement("button");
        buttonCancle.textContent="取消";

        oldnum=e.target.innerText;
        event=e.target;
        e.target.textContent="";
        e.target.appendChild(inputText);
        e.target.appendChild(buttonSubmit);
        e.target.appendChild(buttonCancle);
        buttonSubmit.addEventListener("click",submit);
        buttonCancle.addEventListener("click",cancle);
        inputText.addEventListener("keydown",escAndEnter);
        window.addEventListener("click",clickElse);


        let tableDiv=document.querySelector("#show_table");
        let alllinput=tableDiv.querySelectorAll("input");
        if(alllinput.length>1){
            for(let i=0;i<alllinput.length;i++){
                if(event!==alllinput[i].parentNode){
                    event=alllinput[i].parentNode;
                    break;
                }
            }
            issue=true;
        }


    }
}
function escAndEnter(e) {
    if(e.key==="Escape"){
        cancle(e);
    }
    if(e.key==="Enter"){
        submit(e);
    }
}
function clickElse(e) {
    if(e.target!=event){
        let allEventChildren=event.childNodes;
        let go=true;
        for(let i=0;i<allEventChildren.length;i++){
            if(e.target==allEventChildren[i]){
                go=false;
                break;
            }
        }
        if(go){
            cancle(allEventChildren[0]);
            window.removeEventListener("click",clickElse);
        }
        if(issue){
            let tableDiv=document.querySelector("#show_table");
            let oneinput=tableDiv.querySelector("input")
            event=oneinput.parentNode;
            issue=false;
            window.addEventListener("click",clickElse);
        }
    }
}
function submit(e) {
        let thisInput=e.target.parentNode.querySelector("input");
        if(isNaN(Number(thisInput.value))){
            alert("请输入一个数字");
           thisInput.value=oldnum;
        }else {
            let inputValue=thisInput.value;
            let td=thisInput.parentNode;
            td.textContent="";
            let image=document.createElement("img");
            image.src="pencil.jpg";
            image.className="pencilIcon";
            td.textContent=inputValue;
            td.appendChild(image);
        }


}
function cancle(e) {
    let eve=e.target||e;
    let thisInput=eve.parentNode.querySelector("input");
    let td=thisInput.parentNode;
    td.textContent="";
    let image=document.createElement("img");
    image.src="pencil.jpg";
    image.className="pencilIcon";
    td.textContent=oldnum;
    td.appendChild(image);
}
