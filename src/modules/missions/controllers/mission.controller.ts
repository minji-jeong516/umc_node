import {
  Controller,
  Get,
  Patch,
  Path,
  Post,
  Query,
  Route,
  Tags,
  Response,
  Request,
  Middlewares,
} from "tsoa";

import type { Request as ExpressRequest } from "express";

import {
  challengeMission,
  listMyChallengingMissions,
  completeMyMission,
} from "../services/mission.service.js";

import { ApiResponse, success } from "../../../common/responses/response.js";

import { authenticateJWT } from "../../../common/middlewares/auth.middleware.js";

@Route("missions")
@Tags("Missions")
export class MissionController extends Controller {
  /**
   * 미션 도전 API
   * @summary 특정 미션을 도전 중인 미션으로 추가합니다.
   */
  @Middlewares(authenticateJWT())
  @Post("{missionId}/challenge")
  @Response<ApiResponse<any>>(200, "미션 도전 성공")
  @Response<ApiResponse<null>>(400, "이미 도전 중인 미션")
  @Response<ApiResponse<null>>(404, "존재하지 않는 미션")
  public async handleChallengeMission(
    /** 도전할 미션 ID */
    @Path() missionId: number,
    @Request() req: ExpressRequest
  ): Promise<ApiResponse<any>> {
    const userId = (req as any).user.id;

    const result = await challengeMission(userId, missionId);

    return success(result);
  }

  /**
   * 내가 도전 중인 미션 목록 조회 API
   * @summary 현재 사용자가 도전 중인 미션 목록을 조회합니다.
   */
  @Middlewares(authenticateJWT())
  @Get("challenging")
  @Response<ApiResponse<any>>(200, "도전 중인 미션 목록 조회 성공")
  public async handleListMyChallengingMissions(
    @Request() req: ExpressRequest,
    /** 다음 페이지 조회를 위한 커서 값 */
    @Query() cursor?: number
  ): Promise<ApiResponse<any>> {
    const userId = (req as any).user.id;

    const result = await listMyChallengingMissions(userId, cursor ?? 0);

    return success(result);
  }

  /**
   * 미션 완료 처리 API
   * @summary 도전 중인 미션을 완료 상태로 변경합니다.
   */
  @Middlewares(authenticateJWT())
  @Patch("{missionId}/complete")
  @Response<ApiResponse<any>>(200, "미션 완료 처리 성공")
  @Response<ApiResponse<null>>(400, "완료 처리할 수 없는 미션")
  @Response<ApiResponse<null>>(404, "도전 중인 미션을 찾을 수 없음")
  public async handleCompleteMission(
    /** 완료 처리할 미션 ID */
    @Path() missionId: number,
    @Request() req: ExpressRequest
  ): Promise<ApiResponse<any>> {
    const userId = (req as any).user.id;

    const result = await completeMyMission(userId, missionId);

    return success(result);
  }
}