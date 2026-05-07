// 1. 회원가입 요청 데이터 타입
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

// 2. 회원가입 응답 데이터 타입
export interface UserSignUpResponse {
  email: string;
  name: string;
  preferCategory: string[];
}

// 3. 요청 body를 user 데이터로 변환
export const bodyToUser = (body: UserSignUpRequest) => {
  return {
    email: body.email,
    name: body.name,
    gender: body.gender,
    birth: body.birth,
    address: body.address || "",
    detailAddress: body.detailAddress || "",
    phoneNumber: body.phoneNumber,
    preferences: body.preferences,
    password: body.password,
  };
};

// 4. 응답 데이터 변환
export const responseFromUser = (data: {
  user: any;
  preferences: any[];
}): UserSignUpResponse => {
  const preferCategory = data.preferences.map((p) => p.foodCategory.name);

  return {
    email: data.user.email,
    name: data.user.name,
    preferCategory,
  };
};