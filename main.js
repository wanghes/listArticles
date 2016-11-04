require('./index.css');
window.onload = function(){
    var aNode = document.querySelector('.btn');
    aNode.onclick = function(){
        alert(111);
    }
    console.log(window.getComputedStyle(aNode, null).fontSize);
}