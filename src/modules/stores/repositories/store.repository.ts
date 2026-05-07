import { prisma } from "../../../db.config.js";

// 지역 존재 여부 확인
export const findRegionById = async (regionId: number) => {
  const region = await prisma.region.findUnique({
    where: {
      id: regionId,
    },
  });

  return region !== null;
};

// 가게 생성
export const createStore = async (
  regionId: number,
  name: string,
  address: string
) => {
  const store = await prisma.store.create({
    data: {
      regionId,
      name,
      address,
    },
  });

  return store.id;
};