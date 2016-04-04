/**
 * Created by Administrator on 2016/4/4.
 */
//参考示例图，在页面中展现一颗二叉树的结构
//提供一个按钮，显示开始遍历，点击后，以动画的形式呈现遍历的过程
//二叉树的遍历算法和方式自定，前序中序后序皆可，但推荐可以提供多种算法的展示（增加多个按钮，每个按钮对应不同的算法）
//当前被遍历到的节点做一个特殊显示（比如不同的颜色）
//每隔一段时间（500ms，1s等时间自定）再遍历下一个节点



function treeNode(value){
    this.value=value;
    this.left=null;
    this.right=null;
}
//树根
var head;
//树的最大层数
var MAXLAYER=3;
//遍历数组
var data=[];
function $(id){
    return document.getElementById(id);
}
$('front-eth').onclick = function () {
    data=[];
    frontEth(head);
    console.log(data);
    renderColor();
}
$('mid-eth').onclick = function () {
    data=[];
    midEth(head);
    console.log(data);
    renderColor();

}
$('last-eth').onclick = function () {

    data=[];
    lastEth(head);
    console.log(data);
    renderColor();

}
//创建树
function createTree(){
    var head=new treeNode(0);
    head.left= createNode(1,0);
    head.right=createNode(2,0);
    return head;
}
/**
 *
 * @param value 节点的值
 * @param flag 子节点的最大个数  当前在几层
 * @returns {treeNode}
 */
function createNode(value,flag){
    flag++;
    if(flag>=MAXLAYER)return ;
    var node=new treeNode(value);
    node.left= createNode(value*2+1,flag);
    node.right=createNode(value*2+2,flag);

    return node;
}
//渲染树
function render(head,id){
    $('container').innerHTML=renderTreeNode(head,id);
}
//渲染树节点
function renderTreeNode(node,id){
    var res="";
    var q="";
    if(id!=null&&(node.value==id)){
        q="style='background-color:#d45d5c'";
    }
    console.log(id,node.value,q);
    if(node.left!=null){
        if(node.right!=null){
            res+="<div class='box'"+q+" id=data-"+node.value.toString()+">"+renderTreeNode(node.left,id)+renderTreeNode(node.right,id)+"</div>";
        }else {
            res+="<div class='box' "+q+" id=data-"+node.value.toString()+">"+renderTreeNode(node.left,id)+"</div>";
        }
    }else{
        res+="<div class='box'  "+q+" id=data-"+node.value.toString()+"></div>";
    }

    return res;

}

//前序遍历 递归
function frontEth(node){
    data.push(node.value);
    if(node.left){
        frontEth(node.left);
    }
    if(node.right){
        frontEth(node.right);
    }

}
//递归的中序遍历
function midEth(node){

    if(node.left){
        midEth(node.left);
    }
    data.push(node.value);
    if(node.right){
        midEth(node.right);
    }
}

//递归的后序遍历
function lastEth(node){

    if(node.left){
        lastEth(node.left);
    }
    if(node.right){
        lastEth(node.right);
    }
    data.push(node.value);
}
//计时器渲染叶子
function renderColor(){
    var res=setInterval(run,1000);
    var i=0;
    function run(){
        render(head,data[i]);
        i++;
        if(i==data.length+1)render(head,null);
        if(i>data.length+1)clearInterval(res);
    }
}

head=createTree();
render(head,null);
