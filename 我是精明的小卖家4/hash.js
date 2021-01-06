function showHash() {
    let hash=nowHash();
    let region=chooseRegion.querySelectorAll("input");
    let product=chooseProduct.querySelectorAll("input");
    for (let i=0;i<4;i++){
        if(hash.charAt(i)=="1"){
            region[i].checked=true;
        }else {
            region[i].checked=false;
        }
        if(hash.charAt(i+4)=="1"){
            product[i].checked=true;
        }
        else {
            product[i].checked=false;
        }
    }
    let oneAt=hash.indexOf("1");
    if(oneAt!==-1){
        if(oneAt<4){
            prepare(region[oneAt]);
        }else {
            prepare(product[oneAt-4]);
        }
    }
}
function changeHash(e) {
    let num=0;
    let newHash=Array(8);
    for(let i=0;i<chooseRegion.childNodes.length-1;i++){
        if(chooseRegion.childNodes[i].type == "checkbox"){
            if(chooseRegion.childNodes[i].checked){
                newHash[num]="1";
            }else {
                newHash[num]="0";
            }
            num++;
        }

    }
    for(let i=0;i<chooseProduct.childNodes.length-1;i++){
        if(chooseProduct.childNodes[i].type == "checkbox"){
            if(chooseProduct.childNodes[i].checked){
                newHash[num]="1";
            }else {
                newHash[num]="0";
            }
            num++;
        }

    }
    let hash=newHash.join("");
    // for (let i=0;i<parent.childNodes.length;i++){
    //     if(e==parent.childNodes[i]){
    //         num=i;
    //         break;
    //     }
    // }
    // let oldHash=nowHash().split("");
    // let atNum=parent.id==="chooseRegion"?0:4;
    // atNum+=num;
    // oldHash[atNum]="1";
    // let newHash=oldHash.join("");
    history.pushState(null,null,window.location.href.split("#")[0]+"#"+hash);
}
function nowHash() {
    let hash=window.location.hash.substring(1);
    return hash;

}
window.onpopstate=showHash;