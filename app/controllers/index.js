function getEle(id) {
  return document.getElementById(id);
}

function getListProduct() {
  //pending
  getEle("loading").style.display = "block";
  axios({
    url: "https://62bc4e966b1401736cf774ef.mockapi.io/api/products",
    method: "GET",
  })
    .then(function (result) {
      getEle("loading").style.display = "none";
      renderProducts(result.data);
    })
    .catch(function (error) {
      getEle("loading").style.display = "none";
      console.log(error);
    });
}

getListProduct();

function renderProducts(data) { // dùng để hiển thị danh sách sản phẩm ra giao diện
  var contentHTML = "";

  for (var i = 0; i < data.length; i++) {
    var productImg = data[i].img.includes("https")
      ? data[i].img
      : `./../../assets/img/${data[i].img}`;

    contentHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${data[i].name}</td>
            <td>${data[i].price} $</td>
            <td>${data[i].screen}</td>
            <td>${data[i].backCamera}</td>
            <td>${data[i].frontCamera}</td>
            <td>
                <img width="50px" src="${productImg}" alt="${data[i].name}" />
            </td>
            <td>${data[i].desc}</td>
            <td>${data[i].type}</td>
            <td>
              <button onclick="deleteProduct('${
                data[i].id
              }')" class="btn btn-danger">Xoá</button>

              <button onclick="getProduct('${
                data[i].id
              }')" class="btn btn-info">Cập nhật</button>
            </td>
      

        </tr>
    `;
  }

  getEle("tblDanhSachSP").innerHTML = contentHTML;
}

function createProduct() {
  var isValid = checkValidation();

if(!isValid) return;
  var prodName = document.getElementById("TenSP").value;
  var prodPrice = document.getElementById("GiaSP").value;
  var prodScreen = document.getElementById("ManHinhSP").value;
  var prodbackCamera = document.getElementById("CameraSauSP").value;
  var prodfrontCamera = document.getElementById("CameraTruocSP").value;
  var prodImage = document.getElementById("HinhSP").value;
  var prodDescription = document.getElementById("MoTa").value;
  var prodType = document.getElementById("PhanLoaiSP").value;

  var product = new Product(prodName, prodPrice, prodScreen, prodbackCamera, prodfrontCamera, prodImage, prodDescription, prodType);

  axios({
    url: "https://62bc4e966b1401736cf774ef.mockapi.io/api/products",
    method: "POST",
    data: product,
  })
    .then(function (res) {
      getListProduct();
      document.getElementById("btnCloseModal").click();
      alert("Thêm sản phẩm thành công !")
    })
    .catch(function (err) {
      console.log(err);
    });

  // GET POST  DELETE PATCH PUT (Restful API)
}

function deleteProduct(id) {
  axios({
    url: "https://62bc4e966b1401736cf774ef.mockapi.io/api/products/" + id,
    method: "DELETE",
  })
    .then(function (res) {
      alert("xoá thành công");
      getListProduct();
    })
    .catch(function (err) {
      console.log(err);
    });
}

function getProduct(id) {
  axios({
    url: "https://62bc4e966b1401736cf774ef.mockapi.io/api/products/" + id,
    method: "GET",
  })
    .then(function (res) {
      document.getElementById("btnThemSP").click();

        document.getElementById("TenSP").value = res.data.name;
   document.getElementById("GiaSP").value = res.data.price;
  document.getElementById("ManHinhSP").value = res.data.screen;
   document.getElementById("CameraSauSP").value = res.data.backCamera;
   document.getElementById("CameraTruocSP").value = res.data.frontCamera;
   document.getElementById("HinhSP").value = res.data.img;
  document.getElementById("MoTa").value = res.data.desc;
  document.getElementById("PhanLoaiSP").value = res.data.type;

      document.getElementById("productId").value = res.data.id;
      document.getElementById("btnSaveInfo").style.display = "none";
      document.getElementById("btnUpdate").style.display = "inline";
    })
    .catch(function (err) {
      console.log(err);
    });
}

function updateProduct() {
  var isValid = checkValidation();

  if(!isValid) return;

  var prodName = document.getElementById("TenSP").value;
  var prodPrice = document.getElementById("GiaSP").value;
  var prodScreen = document.getElementById("ManHinhSP").value;
  var prodbackCamera = document.getElementById("CameraSauSP").value;
  var prodfrontCamera = document.getElementById("CameraTruocSP").value;
  var prodImage = document.getElementById("HinhSP").value;
  var prodDescription = document.getElementById("MoTa").value;
  var prodType = document.getElementById("PhanLoaiSP").value;

  var prodId = document.getElementById("productId").value;

  var product = new Product(prodName, prodPrice, prodScreen, prodbackCamera, prodfrontCamera, prodImage, prodDescription, prodType);

  axios({
    url: "https://62bc4e966b1401736cf774ef.mockapi.io/api/products/" + prodId,
    method: "PUT",
    data: product,
  })
    .then(function (res) {
     
      getListProduct();

      // RESET lại cho ô nhập dữ liệu mới bằng rỗng sau khi update thành công.
      document.getElementById("TenSP").value = "";
      document.getElementById("GiaSP").value = "";
     document.getElementById("ManHinhSP").value = "";
      document.getElementById("CameraSauSP").value = "";
      document.getElementById("CameraTruocSP").value = "";
      document.getElementById("HinhSP").value = "";
     document.getElementById("MoTa").value = "";
     document.getElementById("PhanLoaiSP").value = "";

     document.getElementById("btnSaveInfo").style.display = "inline";
     document.getElementById("btnUpdate").style.display = "none";
     
    //  đóng ô nhập dữ liệu

    document.getElementById("btnCloseModal").click();

    alert("Update thành công !")
      
    })
    .catch(function (err) {
      console.log(err);

      
    });
}

 // RESET lại cho ô nhập dữ liệu mới bằng rỗng sau khi update thành công.
document.getElementById("btnCloseModal").addEventListener("click",function(){
  document.getElementById("TenSP").value = "";
      document.getElementById("GiaSP").value = "";
     document.getElementById("ManHinhSP").value = "";
      document.getElementById("CameraSauSP").value = "";
      document.getElementById("CameraTruocSP").value = "";
      document.getElementById("HinhSP").value = "";
     document.getElementById("MoTa").value = "";
     document.getElementById("PhanLoaiSP").value = "";

getEle("errorName") = "";
getEle("errorPrice") = "";
getEle("errorScreen") = "";
getEle("errorBackCamera") = "";
getEle("errorFrontCamera") = "";
getEle("errorImg") = "";
getEle("errorDesc") = "";
getEle("errorType") = "";

     document.getElementById("btnSaveInfo").style.display = "inline";
     document.getElementById("btnUpdate").style.display = "none"; 
})




//  RESET lại cho ô nhập dữ liệu mới bằng rỗng sau khi update thành công.
// document.addEventListener("click",function(){
//   document.getElementById("TenSP").value = "";
//       document.getElementById("GiaSP").value = "";
//      document.getElementById("ManHinhSP").value = "";
//       document.getElementById("CameraSauSP").value = "";
//       document.getElementById("CameraTruocSP").value = "";
//       document.getElementById("HinhSP").value = "";
//      document.getElementById("MoTa").value = "";
//      document.getElementById("PhanLoaiSP").value = "";

//      document.getElementById("btnSaveInfo").style.display = "inline";
//      document.getElementById("btnUpdate").style.display = "none"; 
// })


// Check Validation

function checkValidation(){
  var isValid = true;

  var name = document.getElementById("TenSP").value;
  var price = document.getElementById("GiaSP").value;
  var screen = document.getElementById("ManHinhSP").value;
  var backCamera = document.getElementById("CameraSauSP").value;
  var frontCamera = document.getElementById("CameraTruocSP").value;
  var img = document.getElementById("HinhSP").value;
  var desc = document.getElementById("MoTa").value;
  var type = document.getElementById("PhanLoaiSP").value;

  isValid &= checkRequired(name, "errorName");
  isValid &= checkRequired(price, "errorPrice") && checkNumber(price, "errorPrice");
  isValid &= checkRequired(screen, "errorScreen");
  isValid &= checkRequired(backCamera, "errorBackCamera");
  isValid &= checkRequired(frontCamera, "errorFrontCamera");
  isValid &= checkRequired(img, "errorImg") && checkLinkImg(img, "errorImg");
  isValid &= checkRequired(desc, "errorDesc");
  isValid &= checkRequired(type, "errorType") && checkCharacter(type, "errorType") && checkType(type.toLowerCase(), "errorType");
  return isValid;
}

function checkType(val,spanId){
  var letter1 = "samsung";
  var letter2 = "iphone";
  if(val.match(letter1) || val.match(letter2)){
    document.getElementById(spanId).innerHTML = "";
    return true;
  }
  
  document.getElementById(spanId).innerHTML = "*Vui lòng nhập type là 'samsung' hoặc 'iphone' !";
   return false;
  }

function checkRequired(val,spanId){ // check coi đã nhập chưa hay để trống

  if(val.length>0){
    document.getElementById(spanId).innerHTML = "";
    return true;
  }

 document.getElementById(spanId).innerHTML = "*Vui lòng nhập vào ô này";
 return false;
}

function checkCharacter(val, spanId){ // check kí tự nhập có hợp lệ hay không
var letter = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
if(val.match(letter)){
  document.getElementById(spanId).innerHTML = "";
  return true;
}

document.getElementById(spanId).innerHTML = "*Vui lòng nhập chuỗi kí tự hợp lệ, không nhập kí tự đặc biệt !";
 return false;
}

function checkNumber(val, spanId){
  var letter = /^[0-9]+$/;
  if(val.match(letter)){
    document.getElementById(spanId).innerHTML = "";
    return true;
  }
  
  document.getElementById(spanId).innerHTML = "*Vui lòng nhập chuỗi số hợp lệ !";
   return false;
}

function checkLinkImg(val, spanId){
  var letter1 = "https";
  var letter2 = ".jpg";
  var letter3 = ".png";
  
  if(val.match(letter1) || val.match(letter2) || val.match(letter3)){
    document.getElementById(spanId).innerHTML = "";
    return true;
  }
  
  document.getElementById(spanId).innerHTML = "*Vui lòng nhập link hình ảnh hợp lệ !";
   return false;
}


