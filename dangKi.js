const formDangKy = document.getElementById("formDangKy");
const thongBao = document.getElementById("thongBaoDangKy");

formDangKy.addEventListener("submit", function (event) {
  event.preventDefault();

  let hoTen = document.getElementById("hoTen").value.trim();
  let email = document.getElementById("email").value.trim();
  let soDienThoai = document.getElementById("soDienThoai").value.trim();
  let matKhau = document.getElementById("matKhau").value;
  let xacNhanMatKhau = document.getElementById("xacNhanMatKhau").value;

  if (matKhau.length < 6) {
    thongBao.style.color = "red";
    thongBao.innerText = "Mật khẩu phải có ít nhất 6 ký tự!";
    return;
  }

  if (matKhau !== xacNhanMatKhau) {
    thongBao.style.color = "red";
    thongBao.innerText = "Mật khẩu xác nhận không khớp!";
    return;
  }
  let taiKhoan = JSON.parse(localStorage.getItem("taiKhoan")) || [];

  let emailDaCo = taiKhoan.find((tk) => {
    return tk.email.toLowerCase() === email.toLowerCase();
  });
  if (emailDaCo) {
    thongBao.style.color = "red";
    thongBao.innerText = "Email này đã được đăng ký!";
    return;
  }
  let taiKhoanMoi = {
    id: Date.now(),
    hoTen: hoTen,
    email: email.toLowerCase(),
    soDienThoai: soDienThoai,
    matKhau: matKhau,
  };

  taiKhoan.push(taiKhoanMoi);

  localStorage.setItem("taiKhoan", JSON.stringify(taiKhoan));
  console.log(JSON.parse(localStorage.getItem("taiKhoan")));
  thongBao.style.color = "green";
  thongBao.innerText = "Đăng ký thành công! Đang chuyển đến đăng nhập...";

  formDangKy.reset();

  setTimeout(function () {
    window.location.href = "dangNhap.html";
  }, 1500);
});
