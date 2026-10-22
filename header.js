const tenNguoiDung = document.getElementById("tenNguoiDung");
const nutDangXuat = document.getElementById("btnDangXuat");

let nguoiDung = JSON.parse(localStorage.getItem("nguoiDungDangNhap"));

if (nguoiDung) {
  tenNguoiDung.innerText = " Xin chào, " + nguoiDung.hoTen;
  nutDangXuat.style.display = "inline-block";
} else {
  tenNguoiDung.innerText = "";
  nutDangXuat.style.display = "none";
}

nutDangXuat.addEventListener("click", function () {
  let xacNhan = confirm("Bạn có muốn đăng xuất không?");

  if (xacNhan) {
    localStorage.removeItem("nguoiDungDangNhap");
    window.location.href = "index.html";
  }
});
