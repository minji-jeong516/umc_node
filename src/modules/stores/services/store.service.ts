import { CreateStoreRequest } from "../dtos/store.dto.js";
import {
  findRegionById,
  createStore,
} from "../repositories/store.repository.js";

export const addStore = async (
  regionId: number,
  data: CreateStoreRequest
) => {
  const isExist = await findRegionById(regionId);

  if (!isExist) {
    throw new Error("존재하지 않는 지역입니다.");
  }

  const storeId = await createStore(regionId, data.name, data.address);

  return {
    storeId,
    regionId,
    name: data.name,
    address: data.address,
  };
};