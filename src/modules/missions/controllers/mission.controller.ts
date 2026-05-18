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
  /**
   * 미션 도전 API
   * @summary 특정 미션을 도전 중인 미션으로 추가합니다.
   */
  @Post("{missionId}/challenge")
  @Response<ApiResponse<any>>(200, "미션 도전 성공")
  @Response<ApiResponse<null>>(400, "이미 도전 중인 미션")
  @Response<ApiResponse<null>>(404, "존재하지 않는 미션")
  public async handleChallengeMission(
    /** 도전할 미션 ID */
    @Path() missionId: number
  ): Promise<ApiResponse<any>> {
    const userId = 1;

    const result = await challengeMission(userId, missionId);

    return success(result);
  }

  /**
   * 내가 도전 중인 미션 목록 조회 API
   * @summary 현재 사용자가 도전 중인 미션 목록을 조회합니다.
   */
  @Get("challenging")
  @Response<ApiResponse<any>>(200, "도전 중인 미션 목록 조회 성공")
  public async handleListMyChallengingMissions(
    /** 다음 페이지 조회를 위한 커서 값 */
    @Query() cursor?: number
  ): Promise<ApiResponse<any>> {
    const userId = 1;

    const result = await listMyChallengingMissions(userId, cursor ?? 0);

    return success(result);
  }

  /**
   * 미션 완료 처리 API
   * @summary 도전 중인 미션을 완료 상태로 변경합니다.
   */
  @Patch("{missionId}/complete")
  @Response<ApiResponse<any>>(200, "미션 완료 처리 성공")
  @Response<ApiResponse<null>>(400, "완료 처리할 수 없는 미션")
  @Response<ApiResponse<null>>(404, "도전 중인 미션을 찾을 수 없음")
  public async handleCompleteMission(
    /** 완료 처리할 미션 ID */
    @Path() missionId: number
  ): Promise<ApiResponse<any>> {
    const userId = 1;

    const result = await completeMyMission(userId, missionId);

    return success(result);
  }
}