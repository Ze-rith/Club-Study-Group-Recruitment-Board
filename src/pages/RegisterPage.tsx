import { useState } from "react";
import type { FormEvent } from "react";
import "./RegisterPage.css";
import type { Post, NewPostInput } from "../types";

interface RegisterPageProps {
  posts: Post[];
  onAddPost: (newPost: NewPostInput) => void;
  onApply: (postId: string, applicantName: string) => void;
}

// 등록·신청 페이지.
// 1) 위쪽: 새 모집글을 작성하는 폼
// 2) 아래쪽: 등록된 모집글 목록 + 각 글에 신청할 수 있는 기능
// 데이터(posts)와 데이터를 바꾸는 함수(onAddPost, onApply)는 모두
// 부모(App)에서 props로 받아오기 때문에, 이 컴포넌트는
// "화면을 어떻게 보여줄지"에만 집중하고 실제 상태는 직접 들고 있지 않다.
function RegisterPage({ posts, onAddPost, onApply }: RegisterPageProps) {
  // 등록 폼 입력값
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [capacity, setCapacity] = useState(4);

  // 신청 폼 상태: 지금 어떤 글에 신청 중인지(activePostId)와 입력한 이름
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [applicantName, setApplicantName] = useState("");

  // 모집글 등록 처리
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // 빈 값으로 등록되는 것을 막기 위한 최소한의 검증
    if (!title.trim() || !content.trim() || !author.trim()) {
      alert("제목, 내용, 작성자를 모두 입력해주세요.");
      return;
    }

    onAddPost({ title, content, author, capacity });

    // 등록 후 입력값 초기화
    setTitle("");
    setContent("");
    setAuthor("");
    setCapacity(4);
  }

  // "신청하기" 버튼 클릭: 같은 글을 다시 누르면 입력창을 닫는 토글 동작
  function handleApplyClick(postId: string) {
    setActivePostId(activePostId === postId ? null : postId);
    setApplicantName("");
  }

  // 신청 제출 처리
  function handleApplySubmit(postId: string) {
    if (!applicantName.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }
    onApply(postId, applicantName);
    setApplicantName("");
    setActivePostId(null);
  }

  return (
    <div className="register-page">
      <section className="register-form-section">
        <h2>모집글 등록</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            placeholder="모집 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="모집 내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="register-form-row">
            <input
              type="text"
              placeholder="작성자"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <input
              type="number"
              min={1}
              placeholder="모집 정원"
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
            />
          </div>
          <button type="submit">등록하기</button>
        </form>
      </section>

      <section className="register-list-section">
        <h2>모집글 목록</h2>

        {posts.length === 0 && (
          <p className="empty-message">아직 등록된 모집글이 없어요.</p>
        )}

        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.id} className="post-card">
              <div className="post-card-header">
                <h3>{post.title}</h3>
                <span className="post-card-capacity">
                  {post.applicants.length} / {post.capacity}명
                </span>
              </div>

              <p className="post-card-content">{post.content}</p>
              <p className="post-card-author">작성자: {post.author}</p>

              <button type="button" onClick={() => handleApplyClick(post.id)}>
                {activePostId === post.id ? "취소" : "신청하기"}
              </button>

              {activePostId === post.id && (
                <div className="apply-input-row">
                  <input
                    type="text"
                    placeholder="이름을 입력하세요"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => handleApplySubmit(post.id)}
                  >
                    제출
                  </button>
                </div>
              )}

              {post.applicants.length > 0 && (
                <ul className="applicant-list">
                  {post.applicants.map((a) => (
                    <li key={a.id}>{a.name}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default RegisterPage;