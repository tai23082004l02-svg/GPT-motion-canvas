# Why Your Credit Card Balance Barely Moves

Video tiếng Anh dành cho khán giả Mỹ, dựng bằng Motion Canvas 3.17.x.

- Khung hình: 1920 × 1080, 16:9, 30 fps.
- Audio gốc: 471.725 giây (7:51.725), giữ nguyên nội dung và tốc độ đọc.
- 41 cảnh theo mốc lời thoại. 9 file WAV theo chương, nối liền nhau khôi phục audio gốc.
- Thiết kế: hình vector, nền navy; xanh ngọc chỉ tiền gốc/tiến độ, cam chỉ lãi/chi phí. Không dùng hình stock.
- MP4: H.264 / AAC; phụ đề tiếng Anh có thể bật/tắt; có chapter metadata.
- SRT riêng để upload lên YouTube. Kiểm tra lại phần nhận dạng giọng nói trước khi đăng.

## Chạy và sửa project

Cài Node.js 20+ và FFmpeg. Chạy `npm ci`, rồi `npm start`. Mở địa chỉ Vite hiển thị để dùng Motion Canvas editor. Audio ở `public/narration.wav`.

Sửa tiêu đề, số tiền và mốc cảnh trong `src/cues.json`. Sửa hình và chuyển động trong `src/scenes/main.tsx`. Mốc giây tính từ đầu audio. Không cần cắt audio để chạy project; file WAV được phát liên tục để tránh tiếng click ở điểm nối.

Để render tự động, cài Chromium và đặt đường dẫn trình duyệt bằng biến `CHROME_PATH` nếu khác `/usr/bin/chromium`. Giữ `npm start` đang chạy, mở terminal khác rồi chạy `npm run render`. Renderer dùng Motion Canvas thực, gửi khung hình vào FFmpeg. File trung gian: `work/render-silent.mp4`.

## File bàn giao

- `credit-card-explainer-1080p.mp4`: video đầy đủ, âm lượng lời đọc đã cân bằng.
- `captions.en.srt`: phụ đề rời có timestamp.
- `audio-chapters/01.wav` đến `09.wav`: audio gốc cắt theo chương, không thay tốc độ.
- `scene-plan.csv`: thời gian và nội dung 41 cảnh.
- `youtube-chapters.txt`: mốc chương để dán vào mô tả YouTube.
- `transcript.en.txt`: bản nhận dạng audio để rà soát.
- `storyboard.jpg`: ảnh tổng hợp các cảnh.

## Các giả định tài chính trong hình

Dùng ví dụ $5.000, APR 24%, ước tính 2%/tháng; $100 lãi, trả $200 còn $4.900. Tháng kế tiếp ước tính $98 lãi, giảm gốc $102. Thêm $120 mua sắm vào ví dụ tháng đầu dẫn đến $5.020. Ví dụ so sánh APR 12% và 30% dùng cùng số dư $5.000 và cùng cách ước tính theo tháng.

Các phép tính minh họa không thay cho cách tính lãi thực tế theo ngày. Mức thanh toán tối thiểu, ân hạn và chương trình hỗ trợ phụ thuộc điều khoản từng thẻ. So sánh giảm gốc gấp đôi chỉ áp dụng ví dụ tháng đầu đã nêu.
