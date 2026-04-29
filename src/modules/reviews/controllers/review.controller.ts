import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { addReview } from "../services/review.service.js";

export const handleAddReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const storeId = Number(req.params.storeId);

    if (Number.isNaN(storeId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "storeId가 올바르지 않습니다.",
      });
    }

    const userId = 1; // 과제 조건: 특정 사용자
    const reviewData = bodyToReview(req.body);

    const result = await addReview(storeId, userId, reviewData);

    return res.status(StatusCodes.OK).json({
      result,
    });
  } catch (err) {
    next(err);
  }
};