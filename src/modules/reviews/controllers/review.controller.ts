import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { addReview } from "../services/review.service.js";

// 리뷰 추가 API 핸들러
export const handleAddReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // storeId 추출 및 숫자 변환
    const storeId = Number(req.params.storeId);

    // storeId 유효성 검사
    if (Number.isNaN(storeId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "storeId가 올바르지 않습니다.",
      });
    }

    // 임시 사용자 ID
    const userId = 1;

    // 요청 body → 리뷰 데이터 변환
    const reviewData = bodyToReview(req.body);

    // 리뷰 생성 로직 실행
    const result = await addReview(storeId, userId, reviewData);

    // 결과 반환
    return res.status(StatusCodes.OK).json({
      result,
    });
  } catch (err) {
    // 에러 처리
    next(err);
  }
};