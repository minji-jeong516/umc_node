export interface ChallengeMissionResponse {
  userMissionId: number;
  missionId: number;
  status: string;
}

export interface CompleteMissionResponse {
  missionId: number;
  status: string;
}

export interface MyChallengingMissionsResponse {
  data: any[];
  pagination: {
    cursor: number | null;
  };
}

export const responseFromMyChallengingMissions = (
  userMissions: any[]
): MyChallengingMissionsResponse => {
  const lastMission = userMissions[userMissions.length - 1];

  return {
    data: userMissions.map((userMission) => ({
      userMissionId: userMission.id,
      missionId: userMission.missionId,
      status: userMission.status,
      content: userMission.mission.content,
      reward: userMission.mission.reward,
      deadline: userMission.mission.deadline,
      storeId: userMission.mission.storeId,
      storeName: userMission.mission.store.name,
    })),
    pagination: {
      cursor: lastMission ? lastMission.id : null,
    },
  };
};