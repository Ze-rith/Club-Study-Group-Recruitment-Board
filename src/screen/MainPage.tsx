import "./MainPage.css";
import type { Post } from "../types.ts";

interface MainPageProps {
    posts: Post[]; // App(부모) 컴포넌트로부터 전달받은 전체 모집글 상태 배열
}

// 메인 페이지 컴포넌트: 동아리 및 스터디 모집글 리스트를 한눈에 보여주는 역할
function MainPage({ posts }: MainPageProps) {
    return (
        <div className="main-page">
            <section className="main-intro">
                <h2>📢 개설된 모집글 목록</h2>
                <p>우리 학교의 다양한 동아리와 스터디를 확인하고 참여해보세요!</p>
            </section>

            {/* 모집글이 없을 때 예외 처리 (방어적 코드 작성) */}
            {posts.length === 0 ? (
                <div className="main-empty">
                    <p>현재 등록된 동아리나 스터디 모집글이 없습니다.</p>
                    <p className="sub-text">🕒 '등록·신청' 탭에서 첫 번째 모집글을 작성해보세요!</p>
                </div>
            ) : (
                /* 모집글 그리드 레이아웃 리스트 */
                <div className="main-post-grid">
                    {posts.map((post) => {
                        // 발표 핵심 포인트: 정원이 찼는지 여부를 판단하는 논리 변수
                        const isFull = post.applicants.length >= post.capacity;

                        return (
                            <article key={post.id} className={`main-post-card ${isFull ? "card-disabled" : ""}`}>
                                <div className="card-badge-row">
                                    {isFull ? (
                                        <span className="badge badge-full">모집 마감</span>
                                    ) : (
                                        <span className="badge badge-recruiting">모집 중</span>
                                    )}
                                    <span className="card-count">
                    신청 {post.applicants.length} / {post.capacity}명
                  </span>
                                </div>

                                <h3 className="card-title">{post.title}</h3>
                                <p className="card-content">{post.content}</p>

                                <div className="card-footer">
                                    <span className="card-author">✍️ 작성자: {post.author}</span>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default MainPage;