import {
  Controller,
  Get,
  Patch,
  Path,
  Post,
  Query,
  Route,
  Tags,
} from "tsoa";

import {
  challengeMission,
  listMyChallengingMissions,
  completeMyMission,
} from "../services/mission.service.js";

import { ApiResponse, success } from "../../../common/responses/response.js";

@Route("missions")
@Tags("Missions")
export class MissionController extends Controller {
  // 미션 도전 API
  @Post("{missionId}/challenge")
  public async handleChallengeMission(
    @Path() missionId: number
  ): Promise<ApiResponse<any>> {
    const userId = 1;

    const result = await challengeMission(userId, missionId);

    return success(result);
  }

  // 내가 도전 중인 미션 목록 조회
  @Get("challenging")
  public async handleListMyChallengingMissions(
    @Query() cursor?: number
  ): Promise<ApiResponse<any>> {
    const userId = 1;

    const result = await listMyChallengingMissions(
      userId,
      cursor ?? 0
    );

    return success(result);
  }

  // 미션 완료 처리
  @Patch("{missionId}/complete")
  public async handleCompleteMission(
    @Path() missionId: number
  ): Promise<ApiResponse<any>> {
    const userId = 1;

    const result = await completeMyMission(userId, missionId);

    return success(result);
  }
}