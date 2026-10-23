# GPT Motion Canvas

Video đầu tiên: **Why Your Credit Card Balance Barely Moves** — animation tiếng Anh dành cho YouTube, dựng bằng Motion Canvas.

**1920 × 1080 · 30 fps · 7 phút 52 giây · 41 cảnh**

## Tải video và bộ bàn giao

Mở [Release v1.0.0](https://github.com/tai23082004l02-svg/GPT-motion-canvas/releases/tag/v1.0.0):

- [Video MP4 1080p](https://github.com/tai23082004l02-svg/GPT-motion-canvas/releases/download/v1.0.0/credit-card-explainer-1080p.mp4)
- [Bộ đầy đủ: video, mã nguồn, phụ đề, 9 đoạn audio và storyboard](https://github.com/tai23082004l02-svg/GPT-motion-canvas/releases/download/v1.0.0/credit-card-production-kit.zip)
- [Mã nguồn đóng gói riêng](https://github.com/tai23082004l02-svg/GPT-motion-canvas/releases/download/v1.0.0/motion-canvas-source.zip)

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
