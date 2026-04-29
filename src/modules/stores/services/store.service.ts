import { CreateStoreRequest } from "../dtos/store.dto.js";
import {
  findRegionById,
  createStore,
} from "../repositories/store.repository.js";

// 가게 추가 서비스 로직
export const addStore = async (
  regionId: number,
  data: CreateStoreRequest
) => {
  // 지역 존재 여부 확인
  const isExist = await findRegionById(regionId);

  // 지역 없으면 에러
  if (!isExist) {
    throw new Error("존재하지 않는 지역입니다.");
  }

  // 가게 생성
  const storeId = await createStore(regionId, data.name, data.address);

  // 생성된 가게 정보 반환
  return {
    storeId,
    regionId,
    name: data.name,
    address: data.address,
  };
};