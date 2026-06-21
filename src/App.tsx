import { useState, useEffect } from "react";
import "./App.css";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import MainPage from "./screen/MainPage.tsx";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import type { Post, NewPostInput, PageType } from "./types";

function App() {
    // 1. 현재 어떤 페이지를 보고 있는지 상태 관리 ("main", "register", "profile")
    const [currentPage, setCurrentPage] = useState<PageType>("main");

    // localStorage 저장 키 (한 곳에서만 관리해 오타로 인한 버그를 막는다)
    const STORAGE_KEY = "recruitment-posts";

    // 발표할 때 화면이 심심하지 않도록 넣어둔 기본 더미 데이터
    const DEFAULT_POSTS: Post[] = [
        {
            id: "1",
            title: "💻 React 웹 개발 스터디원 모집",
            content: "매주 고퀄리티 토이 프로젝트를 만들며 리액트를 마스터할 2학년 부원을 모집합니다. 초보자도 환영해요!",
            author: "박세웅",
            capacity: 4,
            applicants: [{ id: "a1", name: "김승우" }],
        },
        {
            id: "2",
            title: "🏀 3대3 길거리 농구 동아리",
            content: "점심시간이나 방과 후에 가볍게 농구 한 게임 하실 분들 구합니다. 학년 상관없이 컴온!",
            author: "이영희",
            capacity: 6,
            applicants: [],
        },
    ];

    // 2. 전체 모집글 상태 배열 (아키텍처 그림의 'posts 상태 배열')
    // 첫 렌더 때 localStorage에 저장된 값이 있으면 그걸 불러오고,
    // 없으면(=처음 방문) 기본 더미 데이터로 시작한다. (lazy initializer)
    const [posts, setPosts] = useState<Post[]>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? (JSON.parse(saved) as Post[]) : DEFAULT_POSTS;
        } catch {
            // JSON 파싱 실패 등 예외 상황에서도 앱이 죽지 않도록 기본값으로 복구
            return DEFAULT_POSTS;
        }
    });

    // posts가 바뀔 때마다 localStorage에 자동 저장 → 새로고침해도 유지된다.
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    }, [posts]);

    // 3. 새 모집글 등록 함수
    const handleAddPost = (newPost: NewPostInput) => {
        const post: Post = {
            ...newPost,
            id: crypto.randomUUID(), // 랜덤 ID 생성
            applicants: [], // 처음엔 신청자 0명
        };
        setPosts([post, ...posts]);
    };

    // 4. 스터디/동아리 신청하기 함수
    const handleApply = (postId: string, applicantName: string) => {
        setPosts(
            posts.map((post) => {
                if (post.id === postId) {
                    // 정원 초과 체크
                    if (post.applicants.length >= post.capacity) {
                        alert("이미 모집이 마감된 글입니다!");
                        return post;
                    }
                    // 중복 신청 체크
                    if (post.applicants.some((a) => a.name === applicantName)) {
                        alert("이미 신청하셨습니다!");
                        return post;
                    }
                    return {
                        ...post,
                        applicants: [...post.applicants, { id: crypto.randomUUID(), name: applicantName }],
                    };
                }
                return post;
            })
        );
    };

    // 5. 현재 탭 상태에 따라 본문 화면을 다르게 렌더링 (조건부 렌더링)
    const renderPage = () => {
        switch (currentPage) {
            case "main":
                return <MainPage posts={posts} />;
            case "register":
                return (
                    <RegisterPage
                        posts={posts}
                        onAddPost={handleAddPost}
                        onApply={handleApply}
                    />
                );
            case "profile":
                return <ProfilePage posts={posts} />;
            default:
                return <MainPage posts={posts} />;
        }
    };

    return (
        <div className="app-shell">
            {/* 최상단 탑바 (전체 모집글 개수 전달) */}
            <Topbar postCount={posts.length} />

            <div className="app-body">
                {/* 좌측 사이드바 (내비게이션 기능) */}
                <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

                {/* 우측 메인 콘텐츠 영역 */}
                <main className="app-content">{renderPage()}</main>
            </div>
        </div>
    );
}

export default App;