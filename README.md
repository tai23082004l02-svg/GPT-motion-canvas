# GPT Motion Canvas

## Tập 002 — mới nhất

**Your $30,000 Car Costs More Than You Think** — hoạt hình 2D với Alex, thợ máy, xe và bối cảnh chuyển động. Giọng **Kokoro Michael**, nhạc nền và hiệu ứng âm thanh riêng.

**1080p · 30 fps · 8 phút 31 giây · 36 cảnh**

- [Tải video MP4](downloads/car-ownership-1080p.mp4)
- [Tải bộ đầy đủ ZIP](downloads/car-ownership-production-kit.zip)
- [Mã nguồn và hướng dẫn chạy](episodes/car-ownership/)
- [Thumbnail](episodes/car-ownership/deliverables/thumbnail.png)
- [Phụ đề tiếng Anh](episodes/car-ownership/deliverables/captions.en.srt)

![Car ownership thumbnail](episodes/car-ownership/deliverables/thumbnail.png)

## Tập 001 — Credit Card Explainer

Video đầu tiên: **Why Your Credit Card Balance Barely Moves** — animation tiếng Anh dành cho YouTube, dựng bằng Motion Canvas.

**1920 × 1080 · 30 fps · 7 phút 52 giây · 41 cảnh**

## Tải video và bộ bàn giao

- [Video MP4 1080p](https://github.com/tai23082004l02-svg/GPT-motion-canvas/raw/refs/heads/main/downloads/credit-card-explainer-1080p.mp4)
- [Bộ đầy đủ ZIP: video, mã nguồn, phụ đề, 9 đoạn audio và storyboard](https://github.com/tai23082004l02-svg/GPT-motion-canvas/raw/refs/heads/main/downloads/credit-card-production-kit.zip)
- [Thư mục downloads](downloads/): mở file rồi bấm **Download raw file** nếu trình duyệt chưa tự tải.
- Mã nguồn có sẵn ngay trong repo; có thể tải bằng **Code → Download ZIP**.

![Storyboard](deliverables/storyboard.jpg)

## Chạy project

Yêu cầu Node.js 20+.

```bash
npm ci
npm start
```

Mở địa chỉ Vite hiển thị để xem và chỉnh sửa trong Motion Canvas editor. Audio gốc đã có trong `public/narration.wav`.

- `src/scenes/main.tsx`: hình và animation.
- `src/cues.json`: mốc thời gian và nội dung 41 cảnh.
- `deliverables/`: phụ đề SRT, bảng thời gian, transcript, mốc chương YouTube và storyboard.
- [Hướng dẫn chi tiết](README-vi.md): cách render và các giả định tài chính.

Video giữ nguyên nội dung và tốc độ audio gốc; âm lượng lời đọc được cân bằng khi xuất MP4. Phụ đề trong MP4 có thể bật/tắt. Các phép tính theo tháng là minh họa; lãi thực tế và điều khoản phụ thuộc từng thẻ.
