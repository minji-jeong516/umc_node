import { prisma } from "../../../db.config.js";

// 가게 존재 여부 확인
export const findStoreById = async (storeId: number) => {
  const store = await prisma.store.findUnique({
    where: { id: storeId },
  });

  return !!store;
};

// 리뷰 생성
export const createReview = async (
  userId: number,
  storeId: number,
  content: string,
  score: number
) => {
  const review = await prisma.review.create({
    data: {
      userId,
      storeId,
      content,
      score,
    },
  });

  return review.id;
};

// 가게 리뷰 목록 조회
export const getAllStoreReviews = async (
  storeId: number,
  cursor: number
) => {
  return await prisma.review.findMany({
    where: {
      storeId,
      id: {
        gt: cursor,
      },
    },
    orderBy: {
      id: "asc",
    },
    take: 5,
    include: {
      user: true,
      store: true,
    },
  });
};
// 내가 작성한 리뷰 목록 조회
export const getMyReviews = async (
  userId: number,
  cursor: number
) => {
  return await prisma.review.findMany({
    where: {
      userId,
      id: {
        gt: cursor,
      },
    },
    orderBy: {
      id: "asc",
    },
    take: 5,
    include: {
      store: true,
    },
  });
};