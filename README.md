# Mô tả chức năng các bảng (collection) trong database MongoDB

Dưới đây là mô tả chức năng của từng collection trong hệ thống học tiếng Anh:

---

## 1. `topics`
- **Chức năng:** Lưu danh sách các chủ đề từ vựng (ví dụ: Du lịch, Gia đình...).
- **Trường chính:**  
  - `_id`: Mã chủ đề  
  - `name`: Tên chủ đề

---

## 2. `words`
- **Chức năng:** Lưu tất cả từ vựng, mỗi từ liên kết với một chủ đề.
- **Trường chính:**  
  - `_id`: Mã từ  
  - `topic_id`: Tham chiếu tới `_id` của `topics`  
  - `word`: Từ vựng  
  - `phonetic`: Phiên âm  
  - `definition`: Định nghĩa  
  - `example`: Ví dụ sử dụng  
  - `audio_url`: Đường dẫn file âm thanh

---

## 3. `levels`
- **Chức năng:** Lưu các cấp độ trình độ tiếng Anh (A1, A2, B1...).
- **Trường chính:**  
  - `_id`: Mã cấp độ  
  - `code`: Mã cấp (ví dụ: A1)  
  - `name`: Tên cấp độ (ví dụ: Beginner)

---

## 4. `students`
- **Chức năng:** Quản lý thông tin cá nhân của học viên.
- **Trường chính:**  
  - `_id`: Mã học viên  
  - `first_name`, `last_name`: Họ tên  
  - `email`, `phone`: Liên hệ  
  - `date_birth`, `city`, `state`, `zip_code`, `street`: Thông tin địa chỉ

---

## 5. `student_account`
- **Chức năng:** Lưu thông tin đăng nhập tài khoản học viên.
- **Trường chính:**  
  - `_id`: Mã tài khoản  
  - `student_id`: Tham chiếu tới `_id` của `students`  
  - `login`: Tên đăng nhập  
  - `password`: Mật khẩu (đã mã hóa)  
  - `is_active`: Trạng thái hoạt động

---

## 6. `student_word_progress`
- **Chức năng:** Theo dõi tiến trình học từng từ của từng học viên.
- **Trường chính:**  
  - `_id`: Mã dòng tiến trình  
  - `student_id`: Tham chiếu tới học viên  
  - `word_id`: Tham chiếu tới từ vựng  
  - `status`: Trạng thái học (learning, mastered...)  
  - `last_reviewed`: Ngày ôn tập gần nhất  
  - `score`: Điểm đánh giá

---

## 7. `booknotes`
- **Chức năng:** Lưu ghi chú cá nhân của học viên với từng từ vựng.
- **Trường chính:**  
  - `_id`: Mã ghi chú  
  - `user_id`: Tham chiếu tới học viên  
  - `word_id`: Tham chiếu tới từ vựng  
  - `note`: Nội dung ghi chú  
  - `created_at`: Thời gian tạo

---

## 8. `pronunciation_practice`
- **Chức năng:** Lưu kết quả luyện phát âm của học viên với từng từ.
- **Trường chính:**  
  - `_id`: Mã luyện tập  
  - `student_id`: Tham chiếu tới học viên  
  - `word_id`: Tham chiếu tới từ vựng  
  - `recording_url`: File ghi âm  
  - `score`: Điểm phát âm  
  - `created_at`: Thời gian ghi âm

---

## Tổng kết
Các collection trên kết hợp tạo thành hệ thống quản lý từ vựng, chủ đề, tiến trình học, luyện phát âm và các thông tin liên quan cho ứng dụng học tiếng Anh.


MY-ENGLISH/
├── node_modules/
├── public/
│   ├── favicon.ico
│   ├── logo.png
│   └── ...                     # Tài nguyên tĩnh cho FE
├── services/
│   └── mongod                  # Script/service khởi động MongoDB (hoặc docker-compose.yml)
├── src/
│   ├── backend/                # Backend Express/MongoDB
│   │   ├── models/
│   │   │   ├── Topic.js
│   │   │   ├── Word.js
│   │   │   ├── Level.js
│   │   │   ├── Student.js
│   │   │   ├── StudentAccount.js
│   │   │   ├── StudentWordProgress.js
│   │   │   ├── BookNote.js
│   │   │   └── PronunciationPractice.js
│   │   ├── controllers/
│   │   │   ├── topicController.js
│   │   │   ├── wordController.js
│   │   │   ├── levelController.js
│   │   │   ├── studentController.js
│   │   │   ├── studentAccountController.js
│   │   │   ├── studentWordProgressController.js
│   │   │   ├── bookNoteController.js
│   │   │   └── pronunciationPracticeController.js
│   │   ├── routes/
│   │   │   ├── topics.js
│   │   │   ├── words.js
│   │   │   ├── levels.js
│   │   │   ├── students.js
│   │   │   ├── studentAccounts.js
│   │   │   ├── studentWordProgress.js
│   │   │   ├── bookNotes.js
│   │   │   └── pronunciationPractice.js
│   │   ├── middleware/
│   │   │   ├── auth.js         # Xác thực, phân quyền nếu có
│   │   │   └── errorHandler.js # Xử lý lỗi tập trung
│   │   ├── utils/
│   │   │   └── db.js           # Kết nối MongoDB
│   │   ├── config.js           # Thông tin cấu hình (port, uri,...)
│   │   ├── app.js              # Khởi tạo Express, middleware, routes
│   │   └── server.js           # Entry point backend (node src/backend/server.js)
│   ├── frontend/               # Frontend React
│   │   ├── api/                # Hàm gọi API backend (axios/fetch)
│   │   │   ├── topics.js
│   │   │   ├── words.js
│   │   │   └── ...
│   │   ├── components/
│   │   │   ├── common/         # Button, Input, Modal...
│   │   │   ├── Topics/
│   │   │   │   ├── TopicList.jsx
│   │   │   │   ├── TopicForm.jsx
│   │   │   ├── Words/
│   │   │   │   ├── WordList.jsx
│   │   │   │   ├── WordForm.jsx
│   │   │   ├── Students/
│   │   │   ├── Levels/
│   │   │   ├── BookNotes/
│   │   │   ├── PronunciationPractice/
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── TopicsPage.jsx
│   │   │   ├── WordsPage.jsx
│   │   │   ├── StudentsPage.jsx
│   │   │   └── ...
│   │   ├── hooks/
│   │   │   ├── useTopics.js
│   │   │   └── ...
│   │   ├── contexts/
│   │   │   ├── AuthContext.js
│   │   │   └── ...
│   │   ├── App.jsx
│   │   └── main.jsx            # Entry React (Vite)
│   └── index.js                # Entry FE (Vite mặc định, import từ ./src/frontend/main.jsx)
├── .gitignore
├── index.html                  # FE entry (Vite)
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── vite.config.js              # Cấu hình Vite (proxy, alias...)
└── ...

node src/backend/server.js
# Hoặc dùng npx nodemon nếu đã cài:
npx nodemon src/backend/server.js
