import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { addStore } from "../services/store.service.js";

// 가게 추가 API 핸들러
export const handleAddStore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // regionId 추출 및 숫자 변환
    const regionId = Number(req.params.regionId);

    // regionId 유효성 검사
    if (Number.isNaN(regionId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "regionId가 올바르지 않습니다.",
      });
    }

    // 요청 body → 가게 데이터 변환
    const storeData = bodyToStore(req.body);

    // 가게 생성 로직 실행
    const result = await addStore(regionId, storeData);

    // 결과 반환
    return res.status(StatusCodes.OK).json({
      result,
    });
  } catch (err) {
    // 에러 처리
    next(err);
  }
};