# 🌹 OUR STORY // 1-YEAR ANNIVERSARY (CINEMATIC HERO)

Trang web kỷ niệm tình yêu 1 năm phong cách **Cinematic, Tối giản, Sang trọng**.
Được xây dựng với kiến trúc module tiêu chuẩn, sẵn sàng đưa lên GitHub và triển khai tự động bằng **Vercel**.

---

## 📁 Cấu Trúc Dự Án

```
kiniem/
├── index.html                  # File HTML chính của trang
├── vercel.json                 # Cấu hình cache và routing cho Vercel
├── package.json                # Cấu hình dự án & script chạy thử
├── .gitignore                  # Bỏ qua các file không cần thiết khi đẩy lên Git
├── README.md                   # Hướng dẫn tổng quan
├── css/                        # Thư mục chứa mã nguồn CSS phân tách
│   ├── variables.css           # Biến màu sắc & Font chữ (Sửa font/màu tại đây)
│   ├── typography.css          # Quy định hiển thị font & mẫu @font-face
│   ├── layout.css              # Bố cục Hero, Grid, và Responsive Breakpoints
│   ├── components.css          # Card, Specs, Nút Icon và Nút Bật/Tắt nhạc
│   ├── animations.css          # Hiệu ứng phóng to ảnh, trồi chữ, mờ dần
│   └── style.css               # File tổng hợp toàn bộ CSS
├── js/                         # Thư mục chứa mã nguồn JavaScript ES Module
│   ├── spotlight.js            # Hiệu ứng rọi đèn Spotlight theo chuột/chạm tay
│   ├── animations.js           # Hiệu ứng tách từ (Word-split) và Scroll Observer
│   ├── audio.js                # Bộ phát nhạc nền, xử lý autoplay và nút âm thanh
│   └── main.js                 # Entry point khởi chạy toàn bộ module
└── assets/                     # Tài nguyên đa phương tiện
    ├── images/                 # Thư mục hình ảnh
    │   ├── hero-base.webp      # Ảnh nền chính
    │   ├── hero-reveal.webp    # Ảnh lớp lộ ra khi rọi đèn
    │   ├── anniversary-card.webp # Ảnh thu nhỏ thẻ kỷ niệm
    │   └── README.md           # Hướng dẫn chi tiết kích thước & cách đổi ảnh
    ├── audio/                  # Thư mục nhạc nền
    │   ├── bg-music.mp3        # (Bạn thả file nhạc mp3 vào đây)
    │   └── README.md           # Hướng dẫn cài đặt nhạc & cơ chế phát
    └── fonts/                  # Thư mục phông chữ tự chọn
        └── README.md           # Hướng dẫn thêm phông chữ riêng
```

---

## 🎵 1. Thêm Nhạc Nền

1. Chuẩn bị file bài hát định dạng `.mp3` bạn yêu thích.
2. Đổi tên file thành: `bg-music.mp3`
3. Bỏ vào thư mục: `assets/audio/`
4. **Cơ chế phát**:
   - Khi vào trang, nhạc sẽ thử tự động phát.
   - Nếu trình duyệt chặn Autoplay, nhạc sẽ **tự động cất lên ngay khi người dùng chạm hoặc click lần đầu tiên** vào trang.
   - Nút **MUSIC ON / OFF** ở góc trên bên trái cho phép người xem bật/tắt tùy ý.

---

## 🖼️ 2. Thay Đổi Hình Ảnh

Các ảnh đã được tải sẵn vào thư mục `assets/images/`. Để đổi ảnh của hai bạn:
- `hero-base.webp`: Ảnh nền lớn đầu tiên (Tỷ lệ 16:9, khuyên dùng 1920x1080).
- `hero-reveal.webp`: Ảnh nền thứ hai khi soi đèn (Tỷ lệ 16:9, cùng kích thước với ảnh trên).
- `anniversary-card.webp`: Ảnh nhỏ trong thẻ kỷ niệm "CHAPTER 01: US" (Tỷ lệ 1:1 vuông).

*(Chi tiết xem thêm tại `assets/images/README.md`)*

---

## 🔤 3. Thay Đổi Phông Chữ

Mở file `css/variables.css`, bạn có thể đổi ngay phông chữ bạn muốn:
```css
:root {
  --font-heading: 'Tên-Font-Tiêu-Đề', serif;
  --font-body: 'Tên-Font-Nội-Dung', sans-serif;
}
```
- Nếu dùng **Google Fonts**: Thêm link font vào `<head>` của `index.html`.
- Nếu dùng **File font cục bộ** (`.woff2`, `.ttf`): Bỏ file vào `assets/fonts/` và kích hoạt đoạn code mẫu trong `css/typography.css`.

*(Chi tiết xem thêm tại `assets/fonts/README.md`)*

---

## 🚀 4. Đẩy Lên Git & Triển Khai Lên Vercel

### Bước 1: Khởi tạo Git và Commit
Mở Terminal tại thư mục dự án và chạy:
```bash
git init
git add .
git commit -m "feat: complete cinematic anniversary hero section"
```

### Bước 2: Đẩy lên GitHub
1. Tạo một repository mới trên [GitHub](https://github.com/new).
2. Chạy lệnh:
```bash
git remote add origin https://github.com/<tai-khoan-cua-ban>/<ten-repo>.git
git branch -M main
git push -u origin main
```

### Bước 3: Deploy lên Vercel
1. Đăng nhập vào [Vercel](https://vercel.com).
2. Chọn **"Add New..."** -> **"Project"**.
3. Chọn Repository vừa tạo trên GitHub và nhấn **"Import"**.
4. Giữ nguyên toàn bộ cấu hình mặc định (Framework Preset: *Other*) và nhấn **"Deploy"**.
5. Trang web của bạn sẽ có một đường link trực tuyến (ví dụ: `https://ten-du-an.vercel.app`) để gửi tặng người ấy!
