import {
  Body,
  Controller,
  Path,
  Post,
  Route,
  Tags,
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
  // 가게 추가 API
  @Post("{regionId}/stores")
  public async handleAddStore(
    @Path() regionId: number,
    @Body() body: CreateStoreRequest
  ): Promise<ApiResponse<any>> {
    const result = await addStore(regionId, body);

    return success(result);
  }
}