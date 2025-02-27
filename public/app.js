// API 기본 URL 설정
const API_URL = 'http://localhost:3000/api';

// 메모 목록 조회
async function getMemos() {
    try {
        const response = await axios.get(`${API_URL}/memos`);
        displayMemos(response.data);
    } catch (error) {
        console.error('메모 조회 실패:', error);
    }
}

// 메모 생성
async function createMemo() {
    const input = document.getElementById('memoInput');
    const content = input.value.trim();

    if (!content) return;

    try {
        await axios.post(`${API_URL}/memos`, { content });
        input.value = '';
        getMemos();
    } catch (error) {
        console.error('메모 생성 실패:', error);
    }
}

// 메모 수정
async function updateMemo(id, content) {
    try {
        await axios.put(`${API_URL}/memos/${id}`, { content });
        getMemos();
    } catch (error) {
        console.error('메모 수정 실패:', error);
    }
}

// 메모 삭제
async function deleteMemo(id) {
    try {
        await axios.delete(`${API_URL}/memos/${id}`);
        getMemos();
    } catch (error) {
        console.error('메모 삭제 실패:', error);
    }
}

// 메모 화면에 표시
function displayMemos(memos) {
    const memoList = document.getElementById('memoList');
    memoList.innerHTML = '';

    memos.forEach(memo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${memo.content}</span>
            <button onclick="updateMemo(${memo.id}, prompt('수정할 내용을 입력하세요:', '${memo.content}'))">수정</button>
            <button onclick="deleteMemo(${memo.id})">삭제</button>
        `;
        memoList.appendChild(li);
    });
}

// 초기 메모 목록 로드
getMemos(); 