import { useState } from "react";
import "./ProfilePage.css";
import type { Post } from "../types";

interface ProfilePageProps {
  posts: Post[]; // App(부모)이 들고 있는 전체 모집글 상태 배열
  onCancelApply: (postId: string, applicantName: string) => void; // 신청 취소 함수
}

// 프로필 페이지.
// 이 앱에는 아직 로그인 기능이 없기 때문에,
// "내 이름"을 입력하면 그 이름을 기준으로
// 1) 내가 작성한 모집글  2) 내가 신청한 모집글 을 모아서 보여준다.
// (로그인 기능이 생기면 이 입력창 대신 로그인된 사용자 이름을 쓰면 된다.)
function ProfilePage({ posts, onCancelApply }: ProfilePageProps) {
  // 더미 데이터에 신청자로 들어가 있는 "김승우"를 기본값으로 둬서
  // 첫 화면이 비어 보이지 않게 했다.
  const [myName, setMyName] = useState("김승우");

  const trimmedName = myName.trim();

  // 내가 작성한 모집글
  const myPosts = posts.filter((post) => post.author === trimmedName);

  // 내가 신청한 모집글
  const appliedPosts = posts.filter((post) =>
    post.applicants.some((a) => a.name === trimmedName)
  );

  // 프로필 아바타에 표시할 이름 첫 글자
  const initial = trimmedName ? trimmedName.charAt(0) : "?";

  return (
    <div className="profile-page">
      {/* 상단 프로필 카드 */}
      <section className="profile-header">
        <div className="profile-avatar">{initial}</div>
        <div className="profile-header-info">
          <h2>{trimmedName || "이름을 입력해주세요"}</h2>
          <p>동아리·스터디 모집 게시판 회원</p>
        </div>
      </section>

      {/* 내 이름 입력 (로그인 대체) */}
      <section className="profile-name-section">
        <label htmlFor="profile-name-input">내 이름</label>
        <input
          id="profile-name-input"
          type="text"
          placeholder="이름을 입력하면 내 활동이 보여요"
          value={myName}
          onChange={(e) => setMyName(e.target.value)}
        />
      </section>

      {/* 활동 요약 통계 */}
      <section className="profile-stats">
        <div className="profile-stat-card">
          <span className="profile-stat-number">{myPosts.length}</span>
          <span className="profile-stat-label">작성한 모집글</span>
        </div>
        <div className="profile-stat-card">
          <span className="profile-stat-number">{appliedPosts.length}</span>
          <span className="profile-stat-label">신청한 모집글</span>
        </div>
      </section>

      {/* 내가 작성한 모집글 목록 */}
      <section className="profile-list-section">
        <h3>✍️ 내가 작성한 모집글</h3>
        {myPosts.length === 0 ? (
          <p className="profile-empty">아직 작성한 모집글이 없어요.</p>
        ) : (
          <ul className="profile-post-list">
            {myPosts.map((post) => {
              const isFull = post.applicants.length >= post.capacity;
              return (
                <li key={post.id} className="profile-post-card">
                  <div className="profile-post-top">
                    <h4>{post.title}</h4>
                    <span
                      className={`profile-badge ${
                        isFull ? "profile-badge-full" : "profile-badge-open"
                      }`}
                    >
                      {isFull ? "모집 마감" : "모집 중"}
                    </span>
                  </div>
                  <p className="profile-post-content">{post.content}</p>
                  <span className="profile-post-meta">
                    신청 {post.applicants.length} / {post.capacity}명
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* 내가 신청한 모집글 목록 */}
      <section className="profile-list-section">
        <h3>🙋 내가 신청한 모집글</h3>
        {appliedPosts.length === 0 ? (
          <p className="profile-empty">아직 신청한 모집글이 없어요.</p>
        ) : (
          <ul className="profile-post-list">
            {appliedPosts.map((post) => (
              <li key={post.id} className="profile-post-card">
                <div className="profile-post-top">
                  <h4>{post.title}</h4>
                  <span className="profile-post-meta">작성자: {post.author}</span>
                </div>
                <p className="profile-post-content">{post.content}</p>
                <button
                  type="button"
                  className="profile-cancel-btn"
                  onClick={() => {
                    // 실수로 누르는 것을 막기 위해 한 번 더 확인
                    if (window.confirm(`'${post.title}' 신청을 취소할까요?`)) {
                      onCancelApply(post.id, trimmedName);
                    }
                  }}
                >
                  신청 취소
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default ProfilePage;
