const products = JSON.parse(localStorage.getItem("SanPham")) || [];
let spHot = document.getElementById("products-hot");
console.log(spHot);
let spNew = document.getElementById("products-new");
console.log(spNew);
let spKM = document.getElementById("products-KM");
console.log(spKM);

const sanPhamHot = products.filter((sp) => {
  return sp.nhom === "hot";
});
console.log(sanPhamHot);
const sanPhamMoi = products.filter((sp) => {
  return sp.nhom === "moi";
});
console.log(sanPhamMoi);
const sanPhamKM = products.filter((sp) => {
  return sp.nhom === "KhuyenMai";
});

function renderNoiBat(danhSach, id) {
  id.innerHTML = "";
  danhSach.forEach((sp) => {
    id.innerHTML += `
      <div class="sanPham">
        <img class="anhSanPham" src="${sp.hinhAnh}" alt="${sp.ten}">
        <h4>${sp.ten}</h4>
        <b>${sp.gia.toLocaleString("vi-VN")} ₫</b>
        <div class="nutSanPham">
          <button onclick="xemChiTiet(${sp.id})">
            Xem chi tiết
          </button>
          <button onclick="themVaoGio(${sp.id})">
            Thêm vào giỏ
          </button>
        </div>
      </div>
    `;
  });
}
renderNoiBat(sanPhamHot, spHot);
renderNoiBat(sanPhamMoi, spNew);
renderNoiBat(sanPhamKM, spKM);

const tinTuc = document.getElementById("tintuc-news");
tinTuc.innerHTML = `HỆ THỐNG BÁN HÀNG PHONE STORE ĐỨNG TOP 5 THỊ TRƯỜNG VIỆT NAM \n TẠO NÊN THƯƠNG HIỆU ĐIỆN TỬ 
CHẠY PHỦ KHẮP MIỀN NAM BẮC . NHÀ PHÂN PHỐI KHẮP 64 TỈNH THÀNH . CHỨNG NHẬN BỞI NHÀ NƯỚC VIỆT NAM TOP 10 CỬA HÀNG CẠNH TRANH TRÊN ĐẤT NƯỚC VÀ NƯỚC NGOÀI NÓI RIÊNG
<h3> GIÁM ĐỐC PHÁT TRIỂN : ĐINH ĐỨC HOÀNG </h3>
<div> <img class="anhSanPham" src="img/nenweb.png"> </div>
`;

const doi1 = document.getElementById("1doi-1");
doi1.innerHTML = `
 <div> <img class="anhSanPham" src="img/1doi1.jpeg" withd="50%" height="20%"> </div>
`;

let anhSlider = document.getElementById("anhSlider");
let btnPrev = document.getElementById("btnPrev");
let btnNext = document.getElementById("btnNext");
let danhSachAnh = ["img/nenweb.png", "img/1doi1.jpeg"];
let viTri = 0;
btnNext.onclick = function () {
  viTri++;
  if (viTri >= danhSachAnh.length) {
    viTri = 0;
  }
  anhSlider.src = danhSachAnh[viTri];
};
btnPrev.onclick = function () {
  viTri--;
  if (viTri < 0) {
    viTri = danhSachAnh.length - 1;
  }
  anhSlider.src = danhSachAnh[viTri];
};
setInterval(function () {
  viTri++;
  if (viTri >= danhSachAnh.length) {
    viTri = 0;
  }
  anhSlider.src = danhSachAnh[viTri];
}, 2000);

function xemChiTiet(id) {
  let chiTiet = products.find((sp) => {
    return sp.id === Number(id);
  });
  if (!chiTiet) {
    alert("Không tìm thấy sản phẩm!");
    return;
  }
  localStorage.setItem("chitiet", JSON.stringify(chiTiet));
  window.location.href = "deltai.html";
}
function themVaoGio(id) {
  const cart = JSON.parse(localStorage.getItem("gioHang")) || [];
  let insertCart = products.find((sp) => {
    return sp.id === Number(id);
  });
  if (!insertCart) {
    alert("Không tìm thấy sản phẩm!");
    return;
  }
  let spDaCo = cart.find((sp) => {
    return sp.id === Number(id);
  });
  if (spDaCo) {
    spDaCo.soLuong += 1;
  } else {
    let spMoi = { ...insertCart, soLuong: 1 };
    cart.push(spMoi);
    alert("Đã thêm sản phẩm vào giỏ hàng!");
  }
  localStorage.setItem("gioHang", JSON.stringify(cart));
}

function timKiemSanPham() {
  let tuKhoa = document.getElementById("timKiem").value.trim();
  if (tuKhoa.length == 0) {
    alert("Vui lòng không để trống!");
    return;
  }
  window.location.href = "products.html?timKiem=" + encodeURIComponent(tuKhoa);
}

let thoiGian = 86400;
let dongHo = document.getElementById("dongHo");

function demNguoc() {
  let gio = Math.floor(thoiGian / 3600);
  let phut = Math.floor((thoiGian % 3600) / 60);
  let giay = thoiGian % 60;

  dongHo.innerHTML =
    String(gio).padStart(2, "0") +
    ":" +
    String(phut).padStart(2, "0") +
    ":" +
    String(giay).padStart(2, "0");

  if (thoiGian > 0) {
    thoiGian--;
  } else {
    clearInterval(dem);
    dongHo.innerHTML = "FLASH SALE ĐÃ KẾT THÚC!";
  }
}

demNguoc();

let dem = setInterval(demNguoc, 1000);
