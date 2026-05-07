import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { challengeMission,listMyChallengingMissions,completeMyMission, } from "../services/mission.service.js";

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
// 내가 도전중인 미션
export const handleListMyChallengingMissions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = 1;

    const cursor =
      typeof req.query.cursor === "string"
        ? Number(req.query.cursor)
        : 0;

    const result = await listMyChallengingMissions(userId, cursor);

    return res.status(StatusCodes.OK).json({
      result,
    });
  } catch (err) {
    next(err);
  }
};

export const handleCompleteMission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const missionId = Number(req.params.missionId);

    if (Number.isNaN(missionId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "missionId가 올바르지 않습니다.",
      });
    }

    const userId = 1;

    const result = await completeMyMission(
      userId,
      missionId
    );

    return res.status(StatusCodes.OK).json({
      result,
    });
  } catch (err) {
    next(err);
  }
};