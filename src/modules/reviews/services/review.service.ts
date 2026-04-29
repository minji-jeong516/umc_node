import { CreateReviewRequest } from "../dtos/review.dto.js";
import { findStoreById, createReview } from "../repositories/review.repository.js";

export const addReview = async (
  storeId: number,
  userId: number,
  data: CreateReviewRequest
) => {
  // 1. 가게 존재 여부 확인
  const isExist = await findStoreById(storeId);

  if (!isExist) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  // 2. 리뷰 저장
  const reviewId = await createReview(
    userId,
    storeId,
    data.content,
    data.score
  );

  return {
    reviewId,
    storeId,
    content: data.content,
    score: data.score,
  };
};