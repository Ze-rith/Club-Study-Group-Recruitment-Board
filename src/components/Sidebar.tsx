import "./Sidebar.css";
import type { PageType } from "../types";

interface SidebarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

// 메뉴 항목 정의. id 값을 PageType과 똑같이 맞춰서
// 별도의 변환 로직 없이 그대로 상태값으로 사용할 수 있게 했다.
const MENU_ITEMS: { id: PageType; label: string }[] = [
  { id: "main", label: "메인" },
  { id: "register", label: "등록·신청" },
  { id: "profile", label: "프로필" },
];

// 기초적인 사이드바 컴포넌트.
// react-router 없이, 부모(App)가 들고 있는 currentPage 상태를
// 그대로 받아서 버튼 클릭 시 onNavigate로 전달하는 단순한 방식으로 구현했다.
// (react-router-dom을 쓰기로 하면 이 부분만 Link로 교체하면 된다.)
function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <nav className="sidebar">
      <ul className="sidebar-list">
        {MENU_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={
                item.id === currentPage
                  ? "sidebar-item sidebar-item-active"
                  : "sidebar-item"
              }
              onClick={() => onNavigate(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;