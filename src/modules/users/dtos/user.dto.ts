// 회원가입 요청 DTO
export interface UserSignUpRequest {
  /** 유저 이메일 */
  email: string;

  /** 유저 이름 */
  name: string;

  /** 성별 */
  gender: string;

  /** 생년월일 */
  birth: string;

  /** 주소 */
  address?: string;

  /** 상세 주소 */
  detailAddress?: string;

  /** 전화번호 */
  phoneNumber: string;

  /** 선호 음식 카테고리 ID 배열 */
  preferences: number[];

  /** 비밀번호 */
  password: string;
}

// 회원가입 응답 DTO
export interface UserSignUpResponse {
  /** 유저 이메일 */
  email: string;

  /** 유저 이름 */
  name: string;

  /** 선호 음식 카테고리 이름 배열 */
  preferCategory: string[];
}

export const responseFromUser = (data: {
  user: any;
  preferences: any[];
}): UserSignUpResponse => {
  const preferCategory = data.preferences.map(
    (p) => p.foodCategory.name
  );

  return {
    email: data.user.email,
    name: data.user.name,
    preferCategory,
  };
};