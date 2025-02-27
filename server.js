// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// 미들웨어 설정
app.use(cors());  // CORS 활성화
app.use(express.json());  // JSON 파싱
app.use(express.static('public'));  // 정적 파일 제공

// 메모 데이터 저장소
let memos = [];

// 라우트 설정
// 메모 조회
app.get('/api/memos', (req, res) => {
    res.json(memos);
});

// 메모 생성
app.post('/api/memos', (req, res) => {
    const newMemo = {
        id: Date.now(),
        content: req.body.content
    };
    memos.push(newMemo);
    res.json(newMemo);
});

// 메모 수정
app.put('/api/memos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = memos.findIndex(memo => memo.id === id);
    
    if (index !== -1) {
        memos[index] = {
            ...memos[index],
            content: req.body.content
        };
        res.json(memos[index]);
    } else {
        res.status(404).json({ message: '메모를 찾을 수 없습니다.' });
    }
});

// 메모 삭제
app.delete('/api/memos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    memos = memos.filter(memo => memo.id !== id);
    res.json({ message: '메모가 삭제되었습니다.' });
});

// 서버 시작
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
