import { prisma } from "../../../db.config.js";

// 미션 존재 확인
export const findMissionById = async (missionId: number) => {
  const mission = await prisma.mission.findUnique({
    where: {
      id: missionId,
    },
  });

  return mission !== null;
};

// 이미 도전 중인지 확인
export const findUserMission = async (
  userId: number,
  missionId: number
) => {
  const userMission = await prisma.userMission.findFirst({
    where: {
      userId,
      missionId,
    },
  });

  return userMission !== null;
};

// 미션 도전 추가
export const createUserMission = async (
  userId: number,
  missionId: number
) => {
  const userMission = await prisma.userMission.create({
    data: {
      userId,
      missionId,
      status: "CHALLENGING",
    },
  });

  return userMission.id;
};
// 내가 진행 중인 미션 목록 조회
export const getMyChallengingMissions = async (
  userId: number,
  cursor: number
) => {
  return await prisma.userMission.findMany({
    where: {
      userId,
      status: "CHALLENGING",
      id: {
        gt: cursor,
      },
    },
    orderBy: {
      id: "asc",
    },
    take: 5,
    include: {
      mission: {
        include: {
          store: true,
        },
      },
    },
  });
};
// 진행 중인 미션 완료 처리
export const completeMission = async (
  userId: number,
  missionId: number
) => {
  const result = await prisma.userMission.updateMany({
    where: {
      userId,
      missionId,
      status: "CHALLENGING",
    },
    data: {
      status: "COMPLETED",
    },
  });

  return result.count;
};