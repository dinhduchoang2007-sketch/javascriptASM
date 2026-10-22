const products = JSON.parse(localStorage.getItem("SanPham")) || [];
const list = document.getElementById("products-list");
console.log(list);

function renderSanPham(ds) {
  list.innerHTML = "";
  ds.forEach((sp) => {
    list.innerHTML += `
      <div class="sanPham">
        <div class="khungAnh">
          <img class="anhSanPham" src="${sp.hinhAnh}" alt="${sp.ten}">
        </div>
        <div class="thongTinSP">
          <h3>${sp.ten}</h3>
          <p class="nhanGia">GIÁ BÁN</p>
          <h4 class="giaSanPham">
            ${sp.gia.toLocaleString("vi-VN")} ₫
          </h4>
          <div class="nutSanPham">
            <button class="btnChiTiet"
              onclick="xemChiTiet(${sp.id})">
              Xem chi tiết
            </button>
            <button class="btnMua"
              onclick="themVaoGio(${sp.id})">
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
    `;
  });
}
renderSanPham(products);
function locTheoLoai(loai) {
  if (loai === "tatca") {
    renderSanPham(products);
  } else if (loai === "dienthoai") {
    let phanLoai = products.filter((sp) => {
      return sp.phanLoai === loai;
    });
    renderSanPham(phanLoai);
  } else if (loai === "laptop") {
    let phanLoai = products.filter((sp) => {
      return sp.phanLoai === loai;
    });
    renderSanPham(phanLoai);
  } else if (loai === "dongho") {
    let phanLoai = products.filter((sp) => {
      return sp.phanLoai === loai;
    });
    renderSanPham(phanLoai);
  } else if (loai === "tainghe") {
    let phanLoai = products.filter((sp) => {
      return sp.phanLoai === loai;
    });
    renderSanPham(phanLoai);
  } else if (loai === "phukien") {
    let phanLoai = products.filter((sp) => {
      return sp.phanLoai === loai;
    });
    renderSanPham(phanLoai);
  } else if (loai === "manhinh") {
    let phanLoai = products.filter((sp) => {
      return sp.phanLoai === loai;
    });
    renderSanPham(phanLoai);
  } else if (loai === "loa") {
    let phanLoai = products.filter((sp) => {
      return sp.phanLoai === loai;
    });
    renderSanPham(phanLoai);
  } else {
    alert("Không tìm thấy danh mục");
  }
}
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
const cart = [];
function themVaoGio(id) {
  let insertCart = products.find((sp) => {
    return sp.id === Number(id);
  });
  let spDaCo = cart.find((sp) => {
    return sp.id === Number(id);
  });
  if (spDaCo) {
    alert("Đã thêm sản phẩm vào giỏ");
    spDaCo.soLuong += 1;
  } else {
    alert("Đã thêm sản phẩm vào giỏ");
    insertCart.soLuong = 1;
    cart.push(insertCart);
  }
  console.log(cart);
  localStorage.setItem("gioHang", JSON.stringify(cart));
}

function timKiemSanPham() {
  let tuKhoa = document.getElementById("timKiem").value;
  if (tuKhoa.length == 0) {
    alert("Vui lòng không để trống !");
    return;
  } else {
    let timKiem = products.filter((sp) => {
      return sp.ten.toLowerCase().includes(tuKhoa.toLowerCase());
    });
    console.log(timKiem);
    renderSanPham(timKiem);
  }
}
let thamSo = new URLSearchParams(window.location.search);
if (thamSo) {
  let tuKhoaURL = thamSo.get("timKiem");
  if (tuKhoaURL) {
    let ketQua = products.filter((sp) => {
      return sp.ten.toLowerCase().includes(tuKhoaURL.toLowerCase());
    });
    renderSanPham(ketQua);
  } else {
    renderSanPham(products);
  }
} else {
  alert("Vui lòng không để trống !");
}
