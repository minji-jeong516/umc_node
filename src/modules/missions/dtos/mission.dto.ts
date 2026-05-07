export interface ChallengeMissionRequest {}

export const bodyToChallenge = () => {
  return {};
};

export const responseFromMyChallengingMissions = (
  userMissions: any[]
) => {
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