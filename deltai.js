let chiTiet = JSON.parse(localStorage.getItem("chitiet"));
let noiDung = document.getElementById("chiTiet-id");
if (chiTiet && noiDung) {
  noiDung.innerHTML = `
    <div class="chiTietSanPham">
      <div class="khungAnhChiTiet">
        <span class="nhanNoiBat">
          ${
            chiTiet.nhom === "hot"
              ? "BÁN CHẠY"
              : chiTiet.nhom === "moi"
                ? "SẢN PHẨM MỚI"
                : chiTiet.nhom === "KhuyenMai"
                  ? "KHUYẾN MÃI"
                  : "CHÍNH HÃNG"
          }
        </span>
        <img src="${chiTiet.hinhAnh}" alt="${chiTiet.ten}"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
        <div class="anhLoi">
          Không thể tải ảnh sản phẩm
        </div>
      </div>
      <div class="thongTinChiTiet">
        <p class="duongDan">
          Trang chủ / Sản phẩm / ${chiTiet.ten}
        </p>
        <p class="thuongHieuChiTiet">
          ${chiTiet.thuongHieu || "PHONE STORE"}
        </p>
        <h1>${chiTiet.ten}</h1>
        <div class="danhGiaChiTiet">
          <span>★★★★★</span>
          <small>Sản phẩm tại PHONE STORE</small>
        </div>
        <div class="giaKhoiChiTiet">
          <span class="giaChiTiet">
            ${Number(chiTiet.gia).toLocaleString("vi-VN")} ₫
          </span>
          <span class="tinhTrangChiTiet">
            ${chiTiet.tinhTrang || "Đang cập nhật"}
          </span>
        </div>
        <p class="moTaNgan">
          ${chiTiet.moTa || "Thiết kế hiện đại, hiệu năng mạnh mẽ, phù hợp với nhu cầu sử dụng hằng ngày."}
        </p>
        <div class="thongSoSanPham">
          <div>
            <span>Thương hiệu</span>
            <strong>${chiTiet.thuongHieu || "Đang cập nhật"}</strong>
          </div>
          <div>
            <span>Bảo hành</span>
            <strong>${chiTiet.baoHanh || "Đang cập nhật"}</strong>
          </div>
          <div>
            <span>Màu sắc</span>
            <strong>${chiTiet.mauSac || "Tùy sản phẩm"}</strong>
          </div>
          <div>
            <span>Tình trạng</span>
            <strong>${chiTiet.tinhTrang || "Đang cập nhật"}</strong>
          </div>
        </div>
        <div class="camKetChiTiet">
          <p>✓ Cam kết sản phẩm đúng mô tả</p>
          <p>✓ Hỗ trợ tư vấn trước khi mua</p>
          <p>✓ Chính sách bảo hành theo sản phẩm</p>
        </div>
        <div class="nutChiTiet">
          <button class="btnThemGio"
            onclick="themVaoGio(${chiTiet.id})">
           Thêm vào giỏ hàng
          </button>
          <button class="btnMuaNgay" onclick="muaNgay()">
            Mua ngay
          </button>
        </div>
        <a href="products.html" class="linkQuayLai">
           Tiếp tục xem sản phẩm
        </a>
      </div>
    </div>
  `;
} else if (noiDung) {
  noiDung.innerHTML = `
    <div class="thongBaoChiTiet">
      <h2>Không tìm thấy sản phẩm</h2>
      <p>Vui lòng quay lại trang sản phẩm và chọn sản phẩm bạn muốn xem.</p>
      <a href="products.html" class="linkQuayLai">
        ← Quay lại cửa hàng
      </a>
    </div>
  `;
}

function themVaoGio(id) {
  let gioHang = JSON.parse(localStorage.getItem("gioHang")) || [];
  let sanPham = JSON.parse(localStorage.getItem("SanPham")) || [];
  let sp = sanPham.find((item) => item.id === Number(id));
  if (!sp) {
    alert("Không tìm thấy sản phẩm!");
    return;
  }
  let daCo = gioHang.find((item) => item.id === Number(id));
  if (daCo) {
    daCo.soLuong = (daCo.soLuong || 1) + 1;
  } else {
    gioHang.push({ ...sp, soLuong: 1 });
  }
  localStorage.setItem("gioHang", JSON.stringify(gioHang));
  alert("Đã thêm " + sp.ten + " vào giỏ hàng!");
}

function muaNgay() {
  themVaoGio(chiTiet.id);
  window.location.href = "gioHang.html";
}
function timKiemSanPham() {
  let tuKhoa = document.getElementById("timKiem").value.trim();
  if (tuKhoa.length == 0) {
    alert("Vui lòng không để trống!");
    return;
  }
  window.location.href = "products.html?timKiem=" + encodeURIComponent(tuKhoa);
}
