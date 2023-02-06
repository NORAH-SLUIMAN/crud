let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount =document.getElementById('discount')
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category')
let submit = document.getElementById('submit');// Create== button

let mood = 'create';
let tmp; // متغير وهمي لحل مشكلة 

// 1- get total

//function  pricr , taxe, ads, discountتحسب لي ,وتطلع لي  tptal 
function getTotal(){
if(price.value !=''){
    let result =( +price.value + +taxes.value + +ads.value ) 
    - +discount.value;
total.innerHTML= result;
// نغير لون الtotal من الاحمر الى الاخضر اذا عرض لي القيمة
total.style.background= '#040';
}else{
    total.innerHTML = '';
    total.style.background= ' #880000'; 
}
}



//2- create product - function create المنتج 
//اسهل طريقة تستدعي فيها الdata هي array  بما اننا نستخدم data 
let dataPro;
if(localStorage.product !=null){
    dataPro= JSON.parse(localStorage.product)
   
}else{
    dataPro=[];
}

//3- امكانية حفظ data 
//3- save localstorage


// لما اضغط على submit= create اخذ الداتا واحفظها بالer

submit.onclick = function(){
// لان البيانات  منتج الواحد مرتبطه بعض راح اطلب منه يجمع لي يلها با opj
let newPro ={
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML, // هنا لاني احتاج المخرج small
    count:count.value,
    category:category.value.toLowerCase(),
}
//opject اذا ماضفته ب arry راح ينحذف اذا اضفت opj القديم وينضاف الجديد 
// الحل تضيف opject = arraay  dataPro.push(newPro)عشان نقدر نحفظها ونعدل عليها 
if(title.value !=''&& price.value !=''&& category.value != ''&& newPro.count < 100){
    if(mood === 'create'){
        if(newPro.count > 1){
            for(let i = 0; i < newPro.count;i++){
                dataPro.push(newPro);
            }
        }else{
            dataPro.push(newPro);
        }
        claerData()
}

    
}else{
dataPro[  tmp  ] = newPro;
mood ='create';
submit.innerHTML ='create';
count.style.display= 'block';

}






if(newPro.count > 1){
    for(let i = 0; i < newPro.count;i++){
        dataPro.push(newPro);
    }
}else{
    dataPro.push(newPro);
}


//save localStorage
localStorage.setItem('Product',   JSON.stringify(dataPro)  )
// لتخزين  data ماتروح بعد updait ونحفظها نروح للlocalStorage
claerData()
showData()
}

//4-claer inputs

function claerData(){
title.value ='';
price.value='';
ads.value= '';
discount.value='';
total.innerHTML='';
count.value='';
category.value='';
}

//5- reed وهي بعد ما نضغط علىcreate ,   تعرض لي منتجات في تيبل 
//count وهو اذا حطيت عدد المنتجات 200 يعرض لي 200 منتج 

function showData()
{
    getTotal()
    let table ='';

// اي array فيه data راح استخدم lop 
for(let i= 0; i < dataPro.length;i++){
    table += `
    <tr>
    <td>${i+1}</td>
    <td>${dataPro[i].title}</td>
<td>${dataPro[i].price}</td>
<td>${dataPro[i].taxes}</td>
<td>${dataPro[i].ads}</td>
<td>${dataPro[i].discount}</td>
<td>${dataPro[i].total}</td>
<td>${dataPro[i].category}</td>
<td><button onclic="updateData(${i})" id="update">update</button></td>
<td><button onclick="daleteData(${i})" id="delete">dalete</button></td>
</tr>
`;
}
 document.getElementById('tbody').innerHTML = table;
 let btnDelete =document.getElementById('deleteAll');
if(dataPro.length > 0){
btnDelete.innerHTML= `
<button onclick="deleteAll()">dalete All (${dataPro.length}) </button>
` 
}else{
    btnDelete.innerHTML='';
}
}
showData();



//delete
function daleteData(i){
dataPro.splice(i,1);
localStorage.product= JSON.stringify(dataPro);
showData();
}

function deleteAll(){
    // بيانات موجوده بلوكل و الarry لازم تنحذف من المكانين
    localStorage.clear()
    dataPro.splice(0)
    showData();
}
//count 


// update

function updateData(i){
    title.value = dataPro[i].title;
    price.value =dataPro[i].price;
    taxes.value =dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
getTotal()
count.style.display='none'
    category.value = dataPro[i].category;
submit.innerHTML = 'Update'
mood = 'Update'
tmp=i;
scroll({
    top: 0,
    behavior: 'smooth',
})
}
//search
// mood +  الحل بخطوتين بناء على المود ببحثث      البحث باسم منتج ونوع
let searchMood = 'title';

function getsearchMood (id){
    let search =document.getElementById('srarch');
if(id == 'searchtitel'){
    searchMood = 'title';


}else{
    searchMood = 'category';
    
}
search.Placeholder ='srarch By '+ searchMood;
    search.focus()
    search.value='';
    showData()
}

    function searchData(value){
    let table='';
    for(let i=0;i < dataPro.length; i++){
        if(searchMood === 'title'){

    {
        // انا ببحث عن string جوا الاري بستخدم الدالة includes()
        if(dataPro[i].title.toLowerCase().includes(value.toLowerCase())){
            table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclic="updateData(${i})" id="update">update</button></td>
    <td><button onclick="daleteData(${i})" id="delete">dalete</button></td>
    </tr>
    `;
        }
    }


    }else{
    {
            // انا ببحث عن string جوا الاري بستخدم الدالة includes()
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += `
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclic="updateData(${i})" id="update">update</button></td>
        <td><button onclick="daleteData(${i})" id="delete">dalete</button></td>
        </tr>
        `;
            }
    }
    document.getElementById('tbody').innerHTML = table;
    }

    }
    }

    //clean data
