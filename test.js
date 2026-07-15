let title=document.getElementById('title')
let price=document.getElementById('price')
let taxes=document.getElementById('taxes')
let ads=document.getElementById('ads')
let discount=document.getElementById('discount')
let total=document.getElementById('total')
let count=document.getElementById('count')
let category=document.getElementById('category');
let submit=document.getElementById('submit');
 let mood='create';
 let tmp;
//  console.log(title,price,taxes,ads,category,discount,total,submit,count,)


// gettotal
function gettotal(){
    if(price.value !=''){
    let result=(+price.value + +taxes.value +  +ads.value)-+discount.value;
     total.innerHTML=result;
     total.style.background='#040'
    }else{
        total.innerHTML="0";
        total.style.backgroundColor='#a00d02';
    }

}
// create product

let datapro;

if(localStorage.product != null){
    datapro = JSON.parse(localStorage.getItem('product'))||[];
}
else{
    datapro=[];

}
 submit.addEventListener('click',()=>{
    let newpro = {
    title:title.value,
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value,
    }

     if(title.value!=""&& price.value!=''&&newpro.count<100 && category.value!=''){
    if(mood==='create'){
    if(newpro.count>1){
        for(let i=0;i<newpro.count;i++){
            datapro.push(newpro)
        }
    }else{
       datapro.push(newpro)
    }
    }
   else{
    datapro[tmp]=newpro;
    mood='create';
    submit.innerHTML='create';
    count.style.display='block';
   }
    cleardata();
   }
   
    // save local starage
    localStorage.setItem('product', JSON.stringify(datapro));
 showdata();
   
 })



// clear on click submit input
  function cleardata(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
 }



// create datapro  table
 function showdata(){
   gettotal()
    let table='';
    for(let i = 0 ; i<datapro.length;i++){
        table+=`
        
         <tr>
                      <td>${i+1}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updatedata(${i})" id="update">update</button></td>
                    <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                </tr>
        
        
        `
       
    }
     document.getElementById('tbody').innerHTML=table;
     let btnAll=document.getElementById('deleteAll')
     if(datapro.length > 0){
        btnAll.innerHTML=`
        <button onclick="deleteall()" > Delete All    (${datapro.length})</button>
        `
     }else{
        // btnAll.innerHTML='';
        
        showdata()
     }
 
 }
showdata()



// delete
document.getElementById('delete')
function deletedata(i){
    datapro.splice(i,1)
    localStorage.product=JSON.stringify(datapro)
    showdata()
}


// deleteAll
function deleteall(){
    localStorage.clear()
    datapro.splice(0)
    showdata()
}


// update
document.getElementById('update')
function updatedata(i){
    title.value=datapro[i].title;
    taxes.value=datapro[i].taxes;
    price.value=datapro[i].price;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    gettotal()
    count.style.display='none';
    category.value=datapro[i].category;
    submit.innerHTML='update';
    mood='update';
    tmp=i;
    scroll({
        top:0,
        behavior:"smooth"
    })


}


//  search
let searchMood ='title';
let search=document.getElementById('search')
 function  getSearchMood(id){
    if(id=='searchtitle'){
       searchMood='title'
    }else{
    searchMood='category';
    }
    search.placeholder='search By'+searchMood;
    search.focus()
    search.value='';
 }

 function searchdata(value){
    let table='';
    for(let i=0;i<datapro.length;i++){
        if(searchMood=='title'&& datapro[i].title.includes(value)||searchMood=='category' && datapro[i].category.includes(value)){
               table+=`
        
         <tr>
                    <td>${i+1}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updatedata(${i})" id="update">update</button></td>
                    <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                </tr>
        
        
        `
        }
    }

    document.getElementById('tbody').innerHTML=table;
 }