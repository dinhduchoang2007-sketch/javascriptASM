const formDangNhap = document.getElementById("formDangNhap");
const thongBao = document.getElementById("thongBaoDangNhap");

formDangNhap.addEventListener("submit", function (event) {
  event.preventDefault();
  let email = document.getElementById("emailDangNhap").value.trim();
  let matKhau = document.getElementById("matKhauDangNhap").value;
  let taiKhoan = JSON.parse(localStorage.getItem("taiKhoan")) || [];
  let taiKhoanTimThay = taiKhoan.find(function (tk) {
    return tk.email.toLowerCase() === email.toLowerCase() && tk.matKhau === matKhau;
  });
  if (!taiKhoanTimThay) {
    thongBao.style.color = "#dc2626";
    thongBao.innerText = "Email hoặc mật khẩu không chính xác!";
    return;
  }
  let nguoiDung = {
    id: taiKhoanTimThay.id,
    hoTen: taiKhoanTimThay.hoTen,
    email: taiKhoanTimThay.email,
  };

  localStorage.setItem("nguoiDungDangNhap", JSON.stringify(nguoiDung));
  thongBao.style.color = "#16a34a";
  thongBao.innerText = "Đăng nhập thành công! Xin chào " + taiKhoanTimThay.hoTen;
  let nutDangNhap = formDangNhap.querySelector("button[type='submit']");
  nutDangNhap.disabled = true;
  nutDangNhap.innerText = "Đang đăng nhập...";
  setTimeout(function () {
    window.location.href = "index.html";
  }, 1000);
});
