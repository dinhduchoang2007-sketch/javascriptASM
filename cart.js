let gioHang = JSON.parse(localStorage.getItem("gioHang")) || [];

const cartItem = document.getElementById("cart-sanPham");
const thanhToan = document.getElementById("cart-ThanhToan");
const formDatHang = document.getElementById("formDatHang");
function formatGia(gia) {
  return Number(gia).toLocaleString("vi-VN") + " ₫";
}
function renderCart() {
  cartItem.innerHTML = "";
  if (gioHang.length === 0) {
    cartItem.innerHTML = `
      <div class="gioHangTrong">
        <h3>Giỏ hàng đang trống</h3>
        <p>Bạn hãy chọn sản phẩm yêu thích nhé!</p>
        <a href="products.html">Khám phá sản phẩm</a>
      </div>
    `;
    renderThanhToan();
    return;
  }
  gioHang.forEach((sp) => {
    let tongTien = sp.gia * sp.soLuong;
    cartItem.innerHTML += `
      <div class="sanPhamGioHang">
        <div class="anhGioHang">
          <img src="${sp.hinhAnh}" alt="${sp.ten}">
        </div>
        <div class="thongTinGioHang">
          <h3>${sp.ten}</h3>
          <p class="giaDon">
            ${formatGia(sp.gia)}
          </p>
          <div class="dieuKhienSoLuong">
            <button type="button"
              onclick="giamSoLuong(${sp.id})">−</button>
            <span>${sp.soLuong}</span>
            <button type="button"
              onclick="tangSoLuong(${sp.id})">+</button>
          </div>
          <p class="thanhTienSP">
            Thành tiền: ${formatGia(tongTien)}
          </p>
          <button type="button"
            class="btnXoaSP"
            onclick="xoaSanPham(${sp.id})">
            Xóa sản phẩm
          </button>
        </div>
      </div>
    `;
  });
  renderThanhToan();
}
function tangSoLuong(id) {
  let spDaCo = gioHang.find((sp) => {
    return sp.id === Number(id);
  });
  if (spDaCo) {
    spDaCo.soLuong += 1;
  }
  luuGioHang();
}

function giamSoLuong(id) {
  let spDaCo = gioHang.find((sp) => {
    return sp.id === Number(id);
  });
  if (spDaCo) {
    if (spDaCo.soLuong > 1) {
      spDaCo.soLuong -= 1;
    } else {
      gioHang = gioHang.filter((sp) => {
        return sp.id !== Number(id);
      });
      luuGioHang();
    }
  }
  luuGioHang();
}
function xoaSanPham(id) {
  let xacNhan = confirm("Bạn có chắc muốn xóa sản phẩm này?");
  if (xacNhan) {
    gioHang = gioHang.filter((sp) => {
      return sp.id !== Number(id);
    });
    luuGioHang();
  }
}
function luuGioHang() {
  localStorage.setItem("gioHang", JSON.stringify(gioHang));
  renderCart();
}
function renderThanhToan() {
  let sum = 0;
  let soLuongTong = 0;
  gioHang.forEach((sp) => {
    sum += sp.gia * sp.soLuong;
    soLuongTong += sp.soLuong;
  });
  thanhToan.innerHTML = `
    <div class="dongTongTien">
      <span>Số lượng sản phẩm</span>
      <strong>${soLuongTong}</strong>
    </div>
    <div class="dongTongTien">
      <span>Tạm tính</span>
      <strong>${formatGia(sum)}</strong>
    </div>
    <div class="dongTongTien">
      <span>Phí vận chuyển</span>
      <strong>Được xác nhận sau</strong>
    </div>
    <div class="tongThanhToan">
      <span>Tổng tiền hàng</span>
      <strong>${formatGia(sum)}</strong>
    </div>
  `;
}
formDatHang.addEventListener("submit", function (event) {
  event.preventDefault();
  if (gioHang.length === 0) {
    alert("Giỏ hàng đang trống!");
    return;
  }
  let hoTen = document.getElementById("hoTen").value.trim();
  let soDienThoai = document.getElementById("soDienThoai").value.trim();
  let diaChi = document.getElementById("diaChi").value.trim();
  let ghiChu = document.getElementById("ghiChu").value.trim();
  let phuongThuc = document.getElementById("phuongThuc").value;
  if (hoTen === "" || soDienThoai === "" || diaChi === "") {
    alert("Bạn hãy nhập đầy đủ thông tin nhận hàng!");
    return;
  }
  let tongTien = 0;
  gioHang.forEach((sp) => {
    tongTien += sp.gia * sp.soLuong;
  });
  let donHang = {
    hoTen: hoTen,
    soDienThoai: soDienThoai,
    diaChi: diaChi,
    ghiChu: ghiChu,
    phuongThuc: phuongThuc,
    sanPham: gioHang,
    tongTien: tongTien,
    ngayDat: new Date().toLocaleString("vi-VN"),
  };
  let danhSachDonHang = JSON.parse(localStorage.getItem("donHang")) || [];
  danhSachDonHang.push(donHang);
  localStorage.setItem("donHang", JSON.stringify(danhSachDonHang));
  alert(
    "Đặt hàng thành công!\n" +
      "Người nhận: " +
      hoTen +
      "\n" +
      "Tổng tiền hàng: " +
      formatGia(tongTien) +
      "\nĐây là đơn hàng mô phỏng.",
  );
  gioHang = [];
  localStorage.setItem("gioHang", JSON.stringify(gioHang));
  formDatHang.reset();
  renderCart();
});
renderCart();
function timKiemSanPham() {
  let tuKhoa = document.getElementById("timKiem").value.trim();
  if (tuKhoa.length == 0) {
    alert("Vui lòng không để trống!");
    return;
  }
  window.location.href = "products.html?timKiem=" + encodeURIComponent(tuKhoa);
}
