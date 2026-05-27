import { prisma } from "../../../db.config.js";

// User 데이터 삽입
export const addUser = async (data: any): Promise<number | null> => {
  try {
    // 이미 존재하는 이메일인지 확인
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (user) {
      return null;
    }

    // User 데이터 생성
    const created = await prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
        gender: data.gender,
        birth: new Date(data.birth),
        address: data.address,
        detailAddress: data.detailAddress,
        phoneNumber: data.phoneNumber,
      },
    });

    return created.id;
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  }
};

// 사용자 정보 얻기
export const getUser = async (userId: number): Promise<any | null> => {
  try {
    return await prisma.user.findFirst({
      where: { id: userId },
    });
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  }
};

// 음식 선호 카테고리 매핑
export const setPreference = async (
  userId: number,
  foodCategoryId: number
): Promise<void> => {
  try {
    await prisma.userFavorCategory.create({
      data: {
        userId,
        foodCategoryId,
      },
    });
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  }
};

// 4. 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (
  userId: number
): Promise<any[]> => {
  try {
    return await prisma.userFavorCategory.findMany({
      where: { userId },
      include: {
        foodCategory: true,
      },
      orderBy: {
        foodCategoryId: "asc",
      },
    });
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  }
};

// 사용자 정보 수정
export const updateUserInfo = async (
  userId: number,
  data: any
): Promise<void> => {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        gender: data.gender,
        birth: data.birth ? new Date(data.birth) : undefined,
        address: data.address,
        detailAddress: data.detailAddress,
        phoneNumber: data.phoneNumber,
      },
    });
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  }
};

// 기존 선호 카테고리 삭제
export const deleteUserPreferences = async (
  userId: number
): Promise<void> => {
  try {
    await prisma.userFavorCategory.deleteMany({
      where: { userId },
    });
  } catch (err) {
    throw new Error(`오류가 발생했어요: ${err}`);
  }
};