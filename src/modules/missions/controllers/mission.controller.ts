import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { challengeMission } from "../services/mission.service.js";

export const handleChallengeMission = async (
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

    const result = await challengeMission(userId, missionId);

    return res.status(StatusCodes.OK).json({
      result,
    });
  } catch (err) {
    next(err);
  }
};