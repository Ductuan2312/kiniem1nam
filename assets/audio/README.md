# THƯ MỤC ÂM THANH / NHẠC NỀN (ASSETS / AUDIO)

Thư mục này dành để lưu trữ bài hát kỷ niệm bạn muốn phát khi mở trang web.

---

### Hướng dẫn cài đặt nhạc:
1. Chọn bài hát bạn yêu thích (ví dụ: bài hát hai người cùng nghe, giai điệu lãng mạn nhẹ nhàng).
2. Đổi tên file nhạc thành: `bg-music.mp3`
3. Thả file `bg-music.mp3` vào chính thư mục này (`assets/audio/bg-music.mp3`).

### Cơ chế hoạt động:
- Trang web đã cấu hình sẵn thẻ `<audio>` trỏ tới `./assets/audio/bg-music.mp3`.
- Khi người dùng vào trang: Hệ thống sẽ tự động phát nhạc.
- **Lưu ý về trình duyệt**: Hầu hết các trình duyệt hiện đại (Chrome, Safari, Edge, Cốc Cốc) đều chặn âm thanh tự động phát nếu chưa có tương tác chuột. Code trong `js/audio.js` đã được tối ưu: ngay khi người dùng chạm hoặc click lần đầu tiên ở bất cứ đâu trên màn hình, bài hát sẽ tự động cất lên mượt mà!
- Ở góc trên bên trái màn hình có nút **"MUSIC ON / OFF"** để người xem có thể chủ động tạm dừng hoặc tiếp tục nghe nhạc bất kỳ lúc nào.
