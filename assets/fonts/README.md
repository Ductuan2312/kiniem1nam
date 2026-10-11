# THƯ MỤC PHÔNG CHỮ TỰ CHỌN (ASSETS / FONTS)

Nếu bạn muốn sử dụng phông chữ riêng (font Việt hóa, font viết tay calligraphy, hoặc font sang trọng theo sở thích), bạn có 2 cách thực hiện rất đơn giản:

---

### CÁCH 1: Dùng font file cục bộ (.woff2 / .ttf)
1. Thả file phông chữ của bạn vào thư mục này, ví dụ:
   - `heading.woff2` (hoặc `heading.ttf`) cho tiêu đề
   - `body.woff2` (hoặc `body.ttf`) cho phần nội dung
2. Mở file `css/typography.css`, tìm đoạn:
   ```css
   /* MẪU CẤU HÌNH FONT RIÊNG NẾU BẠN BỎ FILE VÀO assets/fonts/
   @font-face {
     font-family: "CustomHeadingFont";
     src: url("../assets/fonts/heading.woff2") format("woff2"),
          url("../assets/fonts/heading.ttf") format("truetype");
     ...
   }
   */
   ```
   Bỏ dấu comment `/*` và `*/`, sau đó cập nhật đúng tên file font của bạn.
3. Mở file `css/variables.css` và đổi:
   ```css
   --font-heading: 'CustomHeadingFont', serif;
   ```

---

### CÁCH 2: Dùng Google Fonts (Nhanh nhất & Tối ưu nhất)
1. Truy cập [fonts.google.com](https://fonts.google.com) và chọn phông bạn thích (ví dụ: *Playfair Display*, *Montserrat*, *Cormorant Garamond*, *Be Vietnam Pro*).
2. Sao chép thẻ `<link>` của font đó và dán vào phần `<head>` trong file `index.html`.
3. Mở file `css/variables.css` và đổi giá trị:
   ```css
   --font-heading: 'Tên-Font-Của-Bạn', serif;
   --font-body: 'Tên-Font-Nội-Dung', sans-serif;
   ```
Mọi thành phần trên trang sẽ tự động áp dụng phông chữ mới ngay lập tức!
