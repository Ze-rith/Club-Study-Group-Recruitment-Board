// 신청자 한 명의 정보
export interface Applicant {
  id: string;
  name: string;
}

// 모집글 하나의 정보
export interface Post {
  id: string;
  title: string; // 모집 제목 (예: "프론트엔드 스터디원 모집")
  content: string; // 모집 내용 설명
  author: string; // 작성자 이름
  capacity: number; // 모집 정원
  applicants: Applicant[]; // 신청자 목록
}

// 새 모집글을 등록할 때 입력받는 값 (id, applicants는 등록 시점에 자동 생성되므로 제외)
export type NewPostInput = Omit<Post, "id" | "applicants">;

// 사이드바 내비게이션에서 사용하는 페이지 종류
export type PageType = "main" | "register" | "profile";