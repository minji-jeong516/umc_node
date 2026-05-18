// 회원가입 요청 DTO
export interface UserSignUpRequest {
  email: string;
  name: string;
  gender: string;
  birth: string;
  address?: string;
  detailAddress?: string;
  phoneNumber: string;
  preferences: number[];
  password: string;
}

// 회원가입 응답 DTO
export interface UserSignUpResponse {
  email: string;
  name: string;
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