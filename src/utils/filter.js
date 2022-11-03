export function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

export function getSynergyArrFromTeamComp(team, championsData) {
  let synergyArr = team.members
    .map((m) => {
      let championDetail = championsData.find(
        (c) => c.champion_name === m.name
      );
      let synergys = championDetail.champion_origin.concat(
        championDetail.champion_class
      );
      return {
        ...m,
        synergys,
      };
    })
    .reduce((totalSys, currentValue) => {
      return totalSys.concat(currentValue.synergys);
    }, []);
  return synergyArr;
}
