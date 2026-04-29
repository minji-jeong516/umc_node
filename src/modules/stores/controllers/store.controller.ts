import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { addStore } from "../services/store.service.js";

export const handleAddStore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const regionId = Number(req.params.regionId);

    if (Number.isNaN(regionId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "regionId가 올바르지 않습니다.",
      });
    }

    const storeData = bodyToStore(req.body);
    const result = await addStore(regionId, storeData);

    return res.status(StatusCodes.OK).json({
      result,
    });
  } catch (err) {
    next(err);
  }
};