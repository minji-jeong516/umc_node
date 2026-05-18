import {
  Body,
  Controller,
  Path,
  Post,
  Route,
  Tags,
  Response,
} from "tsoa";

import { CreateStoreRequest } from "../dtos/store.dto.js";

import { addStore } from "../services/store.service.js";

import {
  ApiResponse,
  success,
} from "../../../common/responses/response.js";

@Route("regions")
@Tags("Stores")
export class StoreController extends Controller {
  /**
   * 가게 추가 API
   * @summary 특정 지역에 새로운 가게를 추가합니다.
   */
  @Post("{regionId}/stores")
  @Response<ApiResponse<any>>(200, "가게 추가 성공")
  @Response<ApiResponse<null>>(404, "존재하지 않는 지역")
  @Response<ApiResponse<null>>(400, "잘못된 요청")
  public async handleAddStore(
    /** 가게를 추가할 지역 ID */
    @Path() regionId: number,

    @Body() body: CreateStoreRequest
  ): Promise<ApiResponse<any>> {
    const result = await addStore(regionId, body);

    return success(result);
  }
}