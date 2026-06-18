import "./Topbar.css";

interface TopbarProps {
  postCount: number; // 현재 등록된 모집글 수
}

// 화면 최상단에 고정되는 기초 컴포넌트.
// "기초적인 컴포넌트"라는 역할 범위에 맞춰 서비스 이름과
// 모집글 개수만 보여주는 단순한 형태로 구현했다.
function Topbar({ postCount }: TopbarProps) {
  return (
    <header className="topbar">
      <h1 className="topbar-title">동아리·스터디 모집 게시판</h1>
      <span className="topbar-count">모집 중인 글 {postCount}개</span>
    </header>
  );
}

export default Topbar;