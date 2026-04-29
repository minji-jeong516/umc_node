import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { challengeMission } from "../services/mission.service.js";

// 미션 도전 API 핸들러
export const handleChallengeMission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // missionId 추출 및 숫자 변환
    const missionId = Number(req.params.missionId);

    // missionId 유효성 검사
    if (Number.isNaN(missionId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "missionId가 올바르지 않습니다.",
      });
    }

    // 임시 사용자 ID
    const userId = 1;

    // 미션 도전 로직 실행
    const result = await challengeMission(userId, missionId);

    // 결과 반환
    return res.status(StatusCodes.OK).json({
      result,
    });
  } catch (err) {
    // 에러 처리
    next(err);
  }
};