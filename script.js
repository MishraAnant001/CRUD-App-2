let category_name = document.getElementById("category-name");
let category_desc = document.getElementById("category-desc");
let category_active = document.getElementById("category-active");
let launch_date = document.getElementById("launch-date");
let submitbtn = document.getElementById("submitbtn");
let selectedRow = null;
let table_body = document.getElementById("food-list");
let allData = []
let table = new DataTable("#mytable");
let form = document.getElementsByTagName("form")[0];
let itemtbody = document.getElementById("item-list");
let addrowbtn = document.getElementById("addrow")
let adddatabtn = document.getElementById("adddata");
let closebtn = document.getElementById("closebtn");
let dropdown = document.getElementsByClassName("form-select");
if (localStorage.getItem("localdata") != null) {
    allData = JSON.parse(localStorage.getItem("localdata"));
}
const loadData = () => {
    Array.from(allData).forEach((e) => {
        table.row.add([`<button class="btn btn-info showitem">Show</button>`, e.cname, e.cdesc, e.cactive, e.newcat, `<button class="btn btn-warning edit"  data-bs-toggle="modal" data-bs-target="#examplemodal">edit</button><button class=" ms-2 btn btn-danger delete">delete</button>`]).draw()
    })
}
loadData();
closebtn.onclick = () => {
    count = 1;
    flag = true;
}
adddatabtn.onclick = () => {
    form.reset("");
    clearitemfiels();

}
const clearitemfiels = () => {
    Array.from(document.getElementsByClassName("rowdata")).forEach((item, index) => {
        if (index > 0) {
            item.remove();
        }
        else {
            item.children[1].children[0].value = "";
            item.children[2].children[0].value = "";
            item.children[3].children[0].value = "veg";
            item.children[4].children[0].value = "";
            item.children[5].children[0].value = "";
            item.children[6].children[0].value = "";



        }
        // console.log(itemname, itemdesc,foodtype,price, discount, gst,active)
    })
}
const clearitemfielsnew = () => {
    Array.from(document.getElementsByClassName("rowdata")).forEach((item, index) => {

        item.remove();

        // console.log(itemname, itemdesc,foodtype,price, discount, gst,active)
    })
}
const validate_iname = (item) => {
    // console.log(item)
    let div = item.nextElementSibling;
    let str = item.value;
    let regex = /^[A-Za-z]+[ ]?$/
    if (str == "") {
        div.innerHTML = "This field cannot be empty!"
        return false;
    }
    else {
        if (!regex.test(str)) {
            div.innerHTML = "Alphabets are allowed only!"
            return false;
        } else {
            div.innerHTML = "";
            return true;
        }
    }

    // console.log(div)

}
// const validate_idesc=(item)=>{
//     return true;
// }
const validate_iprice = (item) => {
    let div = item.nextElementSibling;
    let price = item.value;
    if (price == "") {
        div.innerHTML = "This field cannot be empty!"
        return false;
    }
    else {
        if (price <= 0) {
            div.innerHTML = "Price cannot be negative or zero!"
            return false;
        }
        else {
            div.innerHTML = "";
            return true;
        }
    }
}
const validate_idis = (item) => {
    let div = item.nextElementSibling;
    let dis = item.value;
    if (dis == "") {
        div.innerHTML = "This field cannot be empty!"
        return false;
    }
    else {
        if (dis <= 0) {
            div.innerHTML = "Discount cannot be negative or zero!"
            return false;
        }
        else {
            if (dis > 15) {
                div.innerHTML = "Discount cannot be more than 15!"
                return false;
            }
            else {

                div.innerHTML = "";
                return true;
            }
        }
    }
}
const validate_igst = (item) => {
    let div = item.nextElementSibling;
    let gst = item.value;
    if (gst == "") {
        div.innerHTML = "This field cannot be empty!"
        return false;
    }
    else {
        if (gst < 0) {
            div.innerHTML = "GST cannot be negative!"
            return false;
        }
        else {
            div.innerHTML = "";
            return true;
        }
    }
}
const validatefields = () => {
    let boolarray = [];
    Array.from(document.getElementsByClassName("rowdata")).forEach((item) => {
        let v1 = validate_iname(item.children[1].children[0]);
        let v2 = validate_iprice(item.children[4].children[0]);
        let v3 = validate_idis(item.children[5].children[0]);
        let v4 = validate_igst(item.children[6].children[0]);
        // console.log(v1,v2,v3,v4)

        if (v1 == false || v2 == false || v3 == false || v4 == false) {
            // console.log(false)
            boolarray.push(false);
        } else {
            boolarray.push(true)
            // console.log(true)
        }
    })
    // console.log(boolarray)
    if (boolarray.includes(false)) {
        return false;
    }
    else {
        return true;
    }
}
let itemdata = [];
const loaditems = () => {
    // // let boolarray = new Array(Array.from(document.getElementsByClassName("rowdata")).length);
    // let size = Array.from(document.getElementsByClassName("rowdata")).length;
    // // console.log(size)
    // let boolarray=[];
    // console.log(validatefields());
    if (!validatefields()) {
        return false;
    }
    Array.from(document.getElementsByClassName("rowdata")).forEach((item, index) => {
        // console.log(item)
        // console.log(item.children[0])
        // if(validatefields() == false){
        //     return false;
        // }
        // return;
        // boolarray[index] = validatefields();
        // console.log(x)
        // boolarray.push(validatefields());
        let active = false;
        let itemname = item.children[1].children[0].value;
        let itemdesc = item.children[2].children[0].value;
        let foodtype = item.children[3].children[0].value;
        let price = item.children[4].children[0].value;
        let discount = item.children[5].children[0].value;
        let gst = item.children[6].children[0].value;
        if (item.children[7].children[0].checked) {
            active = true;
        }
        itemdata.push({
            iname: itemname,
            idesc: itemdesc,
            ifoodtype: foodtype,
            iprice: price,
            idiscount: discount,
            igst: gst,
            iactive: active
        })
        // console.log(itemname, itemdesc,foodtype,price, discount, gst,active)
    })
    return true;
    // boolarray.forEach((e)=>{
    //     console.log(e)
    // })
    // console.log(boolarray)
    // let flag=true;
    // console.log(boolarray.length)
    // for(let i=0;i<boolarray.length;i++){

    //     console.log(boolarray[i])
    //     // if(boolarray[i]==false){
    //     //     flag=false;
    //     // }
    // }
    // return flag;
}
function dateDifference(startDate, endDate) {
    // Convert both dates to milliseconds
    var startMilliseconds = startDate.getTime();
    var endMilliseconds = endDate.getTime();

    // Calculate the difference in milliseconds
    var millisecondsDifference = endMilliseconds - startMilliseconds;

    // Convert milliseconds to days
    var millisecondsInADay = 1000 * 60 * 60 * 24;
    var daysDifference = Math.floor(millisecondsDifference / millisecondsInADay);

    return daysDifference;
}

let validcname = true;
let validlaunchdate = true;

category_name.onblur = () => {
    Array.from(document.getElementsByClassName("validcname")).forEach((e) => {
        e.remove()
    })
    let str = category_name.value;
    let regex = /^([A-Za-z]+[ ]?)+$/;
    let div = document.createElement("div");
    div.setAttribute("class", "w-25 text-danger validcname");
    if (str == "") {
        // console.log("hi")
        // console.log("inside upper if")
        div.innerHTML = 'This field cannot be empty!'
        category_name.after(div);
        validcname = false;
    } else {
        // console.log("inside  upper else")
        // console.log("hello")
        div.innerHTML = 'Alphabets are allowed only!'
        if (!regex.test(str)) {
            // console.log("inside  if")
            category_name.after(div);
            validcname = false;
        }
        else {
            // console.log("inside  else")
            validcname = true;
            Array.from(document.getElementsByClassName("validcname")).forEach((e) => {
                e.remove()
            })
        }
    }

    //     console.log("🚀 ~ !regex.test(str):", !regex.test(str))

    //     console.log(validcname)
}

launch_date.onblur = () => {
    Array.from(document.getElementsByClassName("validldate")).forEach((e) => {
        e.remove()
    })
    let datediff = dateDifference(new Date(launch_date.value), new Date());
    let div = document.createElement("div");
    div.setAttribute("class", "w-25 text-danger validldate");
    div.innerHTML = "Future dates are not allowed !"
    if (datediff < 0) {
        launch_date.after(div);
        validlaunchdate = false;
    }
    else {
        validlaunchdate = true;
        Array.from(document.getElementsByClassName("validldate")).forEach((e) => {
            e.remove()
        })
    }
}
submitbtn.onclick = () => {
    let newcategory = '';
    // console.log(x)
    // console.log(new Date(launch_date.value).getDate())
    let datediff = dateDifference(new Date(launch_date.value), new Date());
    if (datediff > 7) {
        newcategory = 'Old'
    } else {
        newcategory = "New"
    }
    // if (datediff < 0) {
    //     alert("Do not fill future date")
    //     return;
    // }
    let active = null;
    if (category_active.checked) {
        active = "Yes"
    }
    else {
        active = "No"
    }
    if (category_name.value == "" || launch_date.value == "") {
        alert("Category and launch date cannot be empty!")
        return;
    }
    if (validcname == false || validlaunchdate == false) {
        alert("Please check inputs again!")
        return;
    }
    // // console.log(loaditems())
    if (!loaditems()) {
        setTimeout(() => {

            alert("Please check input fields of food items again ")
        }, 50);
        return;
    }
    if (selectedRow == null) {
        table.row.add([`<button class="btn btn-info showitem">Show</button>`, category_name.value, category_desc.value, active, newcategory, `<button class="btn btn-warning edit"  data-bs-toggle="modal" data-bs-target="#examplemodal">edit</button><button class=" ms-2 btn btn-danger delete">delete</button>`]).draw()
        allData.push({
            cname: category_name.value,
            cdesc: category_desc.value,
            cactive: active,
            ldate: launch_date.value,
            newcat: newcategory,
            items: itemdata
        })
        localStorage.setItem("localdata", JSON.stringify(allData))
        form.reset("");
        $("#examplemodal").modal("hide");
        itemdata = [];
        // console.log(allData)

    }
    else {
        let index = table.row(selectedRow).index();
        // console.log(index);
        let data = allData[index];
        data.cname = category_name.value;
        data.cdesc = category_desc.value;
        data.cactive = active;
        data.ldate = launch_date.value;
        data.newcat = newcategory;
        data.items = itemdata;
        localStorage.setItem("localdata", JSON.stringify(allData))
        itemdata = [];
        let newData = [`<button class="btn btn-info showitem">Show</button>`, category_name.value, category_desc.value, active, newcategory, `<button class="btn btn-warning edit"  data-bs-toggle="modal" data-bs-target="#examplemodal">edit</button><button class=" ms-2 btn btn-danger delete">delete</button>`]
        table.row(index).data(newData).draw();
        form.reset("");
        $("#examplemodal").modal("hide");
        let row = table.row(selectedRow);
        if (row.child.isShown()) {
            row.child.hide()
        }
        selectedRow = null;
    }
    count = 1;
    flag = true;
    // console.log(allData)
    // count=0;


}

const format = (index) => {
    let data = allData[index].items;
    let table = document.createElement("table");
    table.setAttribute("class", "table table-bordered ")
    let thead = document.createElement("thead")
    thead.innerHTML = ` <th>number</th>
    <th>item name</th>
    <th>foodtype</th>
    <th>price</th>
    <th>discount</th>
    <th>discounted price</th>`
    table.appendChild(thead)
    let totalprice = 0;
    let totaldiscountprice = 0;
    let tbody = document.createElement("tbody");
    Array.from(data).forEach((item, index) => {
        let price = Number(item.iprice);
        let dis = (item.idiscount) / 100;
        // console.log(price)
        // console.log(dis)
        let discountedPrice = price - price * dis;
        discountedPrice = Math.round(discountedPrice)
        totalprice += price;
        totaldiscountprice += discountedPrice;
        // console.log(discountedPrice)
        tbody.innerHTML += `<tr>
        <td>${index + 1}</td>
        <td>${item.iname}</td>
        <td>${item.ifoodtype}</td>
        <td>${item.iprice}</td>
        <td>${item.idiscount}%</td>
        <td>${discountedPrice}</td>
    </tr>`
        // console.log(discountedPrice)
    })
    totaldiscountprice = Math.round(totaldiscountprice)
    tbody.innerHTML += `<tr>
        <td><strong>Total</strong></td>
        <td></td>
        <td></td>
        <td><strong>${totalprice}</strong></td>
        <td></td>
        <td><strong>${totaldiscountprice}</strong></td>
    </tr>`
    table.append(tbody)
    return table;
}
// let price = 150;
// let dis = 10/100;
// let discountedPrice = price - price*dis;
// console.log(discountedPrice)
table_body.onclick = (e) => {
    let target = e.target;
    if (target.classList.contains("delete")) {
        let tr = target.parentElement.parentElement;
        let index = table.row(tr).index();
        if (confirm("Are you sure you want to delete ?")) {
            allData.splice(index, 1);
            localStorage.setItem("localdata", JSON.stringify(allData))
            if (allData.length==0) {
                window.location.reload();
            } else {
                table.clear();
                loadData();
            }
            // table.row(index).remove().draw();
        }
    }
    if (target.classList.contains("edit")) {
        // let data = al
        let tr = target.parentElement.parentElement;
        selectedRow = tr;
        let index = table.row(tr).index();
        let data = allData[index];
        category_name.value = data.cname;
        category_desc.value = data.cdesc;
        launch_date.value = data.ldate;
        if (data.cactive == 'Yes') {
            category_active.checked = true;
        }
        else {
            category_active.checked = false;
        }
        clearitemfielsnew()
        let itemdetails = allData[index].items;
        let dropdownvalues = [];
        Array.from(itemdetails).forEach((item, index) => {
            count = index + 1;
            dropdownvalues.push(item.ifoodtype);
            if (index == 0) {

                itemtbody.innerHTML += `<tr class="rowdata">
            <td>${index + 1}</td>
            <td>
                <input type="text" class="form-control "  value="${item.iname}">
                <div class="text-danger"></div>
            </td>
            <td>
                <input type="text" class="form-control "  value="${item.idesc}">
                <div class="text-danger"></div>
            </td>
            <td>
                <select  class="form-select">
                    <option value="dairyfood">dairyfood</option>
                    <option value="seafood">seafood</option>
                    <option value="vegan">vegan</option>
                    <option value="veg">veg</option>
                    <option value="nonveg">nonveg</option>
                </select>
                <div class="text-danger"></div>
            </td>
            <td>
                <input type="number" class="form-control " value="${item.iprice}">
                <div class="text-danger"></div>
            </td>
            <td>
                <input type="number" class="form-control " value="${item.idiscount}">
                <div class="text-danger"></div>
            </td>
            <td>
                <input type="number" class="form-control "  value="${item.igst}">
                <div class="text-danger"></div>
            </td>
            <td>
                <input type="checkbox" checked>
        
            </td>
            <td>
                <button class="btn-danger delete btn" disabled >-</button>
            </td>
        </tr>`
            }
            else {
                itemtbody.innerHTML += `<tr class="rowdata">
            <td>${index + 1}</td>
            <td>
                <input type="text" class="form-control "  value="${item.iname}">
                <div class="text-danger"></div>
            </td>
            <td>
                <input type="text" class="form-control "  value="${item.idesc}">
                <div class="text-danger"></div>
            </td>
            <td>
                <select  class="form-select">
                <option value="dairyfood">dairyfood</option>
                <option value="seafood">seafood</option>
                <option value="vegan">vegan</option>
                <option value="veg">veg</option>
                <option value="nonveg">nonveg</option>
                </select>
                <div class="text-danger"></div>
            </td>
            <td>
                <input type="number" class="form-control " value="${item.iprice}">
                <div class="text-danger"></div>
            </td>
            <td>
                <input type="number" class="form-control " value="${item.idiscount}">
                <div class="text-danger"></div>
            </td>
            <td>
                <input type="number" class="form-control "  value="${item.igst}">
                <div class="text-danger"></div>
            </td>
            <td>
                <input type="checkbox" checked>
        
            </td>
            <td>
                <button class="btn-danger delete btn">-</button>
            </td>
        </tr>`
            }
            // console.log(discountedPrice)
        })
        Array.from(dropdown).forEach((item, index) => {
            item.value = dropdownvalues[index];
        })


    }
    if (target.classList.contains("showitem")) {
        let tr = target.parentElement.parentElement;
        let index = table.row(tr).index();
        let row = table.row(tr);
        if (row.child.isShown()) {
            row.child.hide()
        }
        else {
            row.child(format(index)).show()
        }
    }

}
let count = 1;
let flag = true;
addrowbtn.onclick = () => {
    count++
    // console.log(count);
    if (count > 10) {
        count--;
        setTimeout(() => {

            alert("You have reached the limit");
        }, 50);
        flag = false;
    }
    if (flag == true) {
        let tr = document.createElement("tr");
        tr.setAttribute("class", "rowdata")
        tr.innerHTML = `<td>${count}</td>
        <td>
            <input type="text" class="form-control " >
            <div class="text-danger"></div>
        </td>
        <td>
            <input type="text" class="form-control " >
            <div class="text-danger"></div>
        </td>
        <td>
            <select  class="form-select">
                <option value="dairyfood">dairyfood</option>
                <option value="seafood">seafood</option>
                <option value="vegan">vegan</option>
                <option value="veg" selected>veg</option>
                <option value="nonveg">nonveg</option>
            </select>
            <div class="text-danger"></div>
        </td>
        <td>
            <input type="number" class="form-control ">
            <div class="text-danger"></div>
        </td>
        <td>
            <input type="number" class="form-control ">
            <div class="text-danger"></div>
        </td>
        <td>
            <input type="number" class="form-control ">
            <div class="text-danger"></div>
        </td>
        <td>
            <input type="checkbox" checked>
    
        </td>
        <td>
            <button class="btn-danger delete btn">-</button>
        </td>`
        // console.log(tr);
        itemtbody.append(tr);

    }
    // console.log(count);


}
itemtbody.onclick = (e) => {
    let target = e.target;
    if (target.classList.contains("delete")) {
        let tr = target.parentElement.parentElement;


        // if (confirm("Are you sure you want to delete ?")) {
        let trcount = tr.children[0].textContent;
        // console.log(trcount);
        Array.from(document.getElementsByClassName("rowdata")).forEach((element) => {
            if (parseInt(element.children[0].textContent) > parseInt(trcount)) {
                element.children[0].textContent -= 1;
                // console.log(element.children[0].textContent);
            }
        })
        tr.remove();
        // if(count!=10){

        count--;
        // }
        flag = true;

        // }
    }
}