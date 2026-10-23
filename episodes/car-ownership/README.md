# Your $30,000 Car Costs More Than You Think

Tập 002 của **The Math Behind Everyday Life**. Video tiếng Anh dành cho khán giả Mỹ, dựng bằng Motion Canvas, với Alex, nhân vật thợ máy, sedan xanh, phố, đại lý, cây xăng và garage.

**1080p · 30 fps · 8 phút 31 giây · 36 cảnh · Kokoro `am_michael`**

## Xem và tải

- [Video hoàn chỉnh](https://github.com/tai23082004l02-svg/GPT-motion-canvas/raw/refs/heads/main/downloads/car-ownership-1080p.mp4)
- [Bộ bàn giao đầy đủ ZIP](https://github.com/tai23082004l02-svg/GPT-motion-canvas/raw/refs/heads/main/downloads/car-ownership-production-kit.zip)
- [Thumbnail](deliverables/thumbnail.png)
- [Phụ đề tiếng Anh](deliverables/captions.en.srt)
- [Mốc chương YouTube](deliverables/youtube-chapters.txt)
- [Lời thoại](script.en.txt)
- [Giả định và cách tính](sources-and-assumptions.md)

Video có phụ đề bật/tắt và chapter metadata. Nhạc nền và Foley do tổng hợp âm thanh riêng, không dùng bản ghi âm nhạc bên ngoài. Xem [nguồn gốc tài sản và giọng đọc](ATTRIBUTION.md).

## Mở project

Yêu cầu Node.js 20+.

```bash
npm ci
npm start
```

Mở địa chỉ Vite hiển thị để dùng Motion Canvas editor. Bản mix hoàn chỉnh đã có trong `public/soundtrack.mp3`, nên không cần cài Kokoro để xem và sửa hình.

- `src/art.ts`: nhân vật, xe, bối cảnh và đạo cụ vector.
- `src/scenes/main.tsx`: chuyển động và bố cục.
- `src/shots.json`: nội dung và thời gian chính xác của 36 cảnh.
- `public/soundtrack.mp3`: lời đọc + nhạc nền + hiệu ứng.
- `deliverables/`: phụ đề, giọng đọc riêng, bảng tính và tài liệu bàn giao.

## Tạo lại giọng Michael

Yêu cầu Python 3.12 và FFmpeg trong PATH. Model và voice bank được tải riêng, không nằm trong Git.

```bash
python -m pip install -r requirements.txt
python setup_voice.py
python write_episode.py
python synthesize.py
python sound_design.py
```

Giọng: `am_michael`, ngôn ngữ `en-us`, tốc độ `1.05`. Các đoạn WAV được lưu đệm theo scene ID trong `work/voice-shots/`. Nếu sửa lời của một cảnh, xóa WAV tương ứng trước khi tạo lại. `synthesize.py` tạo `public/narration.wav` và cập nhật mốc cảnh. `sound_design.py` tạo lại bản mix.

Nếu thay audio, cần căn lại phụ đề và các mốc chapter. File phụ đề bàn giao khớp với bản audio hiện tại.

## Xuất video từ dòng lệnh

Cài FFmpeg và Chromium. Đặt `CHROME_PATH` nếu Chromium nằm ở đường dẫn khác `/usr/bin/chromium`. Giữ Vite đang chạy ở một terminal, rồi chạy ở terminal khác:

```bash
npm run render
```

File hình trung gian ở `work/render-silent.mp4`. Renderer dùng Motion Canvas thực, gửi khung hình sang FFmpeg. Kết nối HMR bị chặn trong trình duyệt render để tránh bị ngắt khi mở editor.

Ghép hình, mix audio và phụ đề:

```bash
ffmpeg -i work/render-silent.mp4 -i public/soundtrack.mp3 -i deliverables/captions.en.srt -map 0:v -map 1:a -map 2:s -c:v copy -c:a aac -b:a 192k -c:s mov_text -metadata:s:a:0 language=eng -metadata:s:s:0 language=eng -t 511.2049583333 -movflags +faststart car-ownership-1080p.mp4
```

Nếu thay audio, dùng thời lượng mới trong `public/duration.json` thay cho số giây trên. File video bàn giao còn có các chapter metadata.

## Các con số chính

Ví dụ giả định: xe $30.000, trả trước $3.000, vay $27.000 ở 7% trong 60 tháng, không phí vay. Khoản trả chính xác $534,63/tháng. Tổng tiền chi ra khoảng $64.528; trừ giá bán lại giả định $15.000, chi phí sở hữu còn khoảng $49.528, trung bình $825/tháng. Ngân sách tiền mặt hằng tháng khoảng $995, cộng $4.800 ban đầu.

Đây không phải mức bình quân quốc gia hoặc báo giá thực tế. Các thành phần, khoản loại trừ và phép tính đầy đủ có trong `sources-and-assumptions.md` và `deliverables/financial-model.csv`.
