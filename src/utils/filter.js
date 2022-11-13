export function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

export function getTraitsBonus(
  allItem,
  uniqueTraits,
  synergysData,
  newMembers
) {
  // add trait from item
  allItem.forEach((item) => {
    switch (item) {
      case "Lagoon Emblem":
        !uniqueTraits.includes("lagoon") && uniqueTraits.push("lagoon");
        break;
      case "Dragonmancer Emblem":
        !uniqueTraits.includes("dragonmancer") &&
          uniqueTraits.push("dragonmancer");
        break;
      case "Mage Emblem":
        !uniqueTraits.includes("mage") && uniqueTraits.push("mage");
        break;
      case "Shimmerscale Emblem":
        !uniqueTraits.includes("shimmerscale") &&
          uniqueTraits.push("shimmerscale");
        break;
      case "Swiftshot Emblem":
        !uniqueTraits.includes("swiftshot") && uniqueTraits.push("swiftshot");
        break;
      case "Cavalier Emblem":
        !uniqueTraits.includes("cavalier") && uniqueTraits.push("cavalier");
        break;
      case "Mirage Emblem":
        !uniqueTraits.includes("mirage") && uniqueTraits.push("mirage");
        break;
      case "Darkflight Emblem":
        !uniqueTraits.includes("darkflight") && uniqueTraits.push("darkflight");
        break;
      case "Assassin Emblem":
        !uniqueTraits.includes("assassin") && uniqueTraits.push("assassin");
        break;
      case "Bruiser Emblem":
        !uniqueTraits.includes("bruiser") && uniqueTraits.push("bruiser");
        break;
      case "Cannoneer Emblem":
        !uniqueTraits.includes("cannoneer") && uniqueTraits.push("cannoneer");
        break;
      case "Evoker Emblem":
        !uniqueTraits.includes("evoker") && uniqueTraits.push("evoker");
        break;
      case "Jade Emblem":
        !uniqueTraits.includes("jade") && uniqueTraits.push("jade");
        break;
      case "Mystic Emblem":
        !uniqueTraits.includes("mystic") && uniqueTraits.push("mystic");
        break;
      case "Scalescorn Emblem":
        !uniqueTraits.includes("scalescorn") && uniqueTraits.push("scalescorn");
        break;
      case "Warrior Emblem":
        !uniqueTraits.includes("warrior") && uniqueTraits.push("warrior");
        break;
      case "Whispers Emblem":
        !uniqueTraits.includes("whispers") && uniqueTraits.push("whispers");
        break;
      case "Guild Emblem":
        !uniqueTraits.includes("guild") && uniqueTraits.push("guild");
        break;
      case "Ragewing Emblem":
        !uniqueTraits.includes("ragewing") && uniqueTraits.push("ragewing");
        break;
      case "Tempest Emblem":
        !uniqueTraits.includes("tempest") && uniqueTraits.push("tempest");
        break;
      default:
        break;
    }
  });

  // return this
  let data = [];

  // loop unique traits arr
  data = uniqueTraits.map((item) => {
    let count = 0; // count traits
    let lvls = []; // bonus level

    // get bonus level
    synergysData
      .find((s) => s.synergy_name.toLowerCase() === item.toLowerCase())
      ?.synergy_description_level.split("/")
      .forEach((i, index) => {
        if (index === 0) {
          lvls.push(i.split("$")[0]);
        } else {
          lvls.push(i.split("$")[0].split("\n")[1]);
        }
      });

    // count trait from character
    let championUnique = [];
    newMembers.forEach((c) => {
      if (!championUnique.find((i) => i?.champion_name === c.champion_name)) {
        championUnique.push(c);
      }
    });
    championUnique.forEach((a) => {
      if (a.champion_class.includes(item) || a.champion_origin.includes(item)) {
        if (
          a.is_dragon === "true" &&
          item !== "dragon" &&
          item !== "mystic" &&
          item !== "shapeshifter" &&
          item !== "guardian" &&
          item !== "evoker" &&
          item !== "mage" &&
          item !== "bruiser"
        ) {
          count += 3;
        } else {
          count += 1;
        }
      }
    });

    // count trait from item
    allItem.forEach((i) => {
      switch (i) {
        case "Lagoon Emblem":
          if (item === "lagoon") count = count + 1;
          break;
        case "Dragonmancer Emblem":
          if (item === "dragonmancer") count = count + 1;
          break;
        case "Mage Emblem":
          if (item === "mage") count = count + 1;
          break;
        case "Shimmerscale Emblem":
          if (item === "shimmerscale") count = count + 1;
          break;
        case "Swiftshot Emblem":
          if (item === "swiftshot") count = count + 1;
          break;
        case "Cavalier Emblem":
          if (item === "cavalier") count = count + 1;
          break;
        case "Mirage Emblem":
          if (item === "mirage") count = count + 1;
          break;
        case "Darkflight Emblem":
          if (item === "darkflight") count = count + 1;
          break;
        case "Assassin Emblem":
          if (item === "assassin") count = count + 1;
          break;
        case "Bruiser Emblem":
          if (item === "bruiser") count = count + 1;
          break;
        case "Cannoneer Emblem":
          if (item === "cannoneer") count = count + 1;
          break;
        case "Evoker Emblem":
          if (item === "evoker") count = count + 1;
          break;
        case "Jade Emblem":
          if (item === "jade") count = count + 1;
          break;
        case "Mystic Emblem":
          if (item === "mystic") count = count + 1;
          break;
        case "Scalescorn Emblem":
          if (item === "scalescorn") count = count + 1;
          break;
        case "Warrior Emblem":
          if (item === "warrior") count = count + 1;
          break;
        case "Whispers Emblem":
          if (item === "whispers") count = count + 1;
          break;
        case "Guild Emblem":
          if (item === "guild") count = count + 1;
          break;
        case "Ragewing Emblem":
          if (item === "ragewing") count = count + 1;
          break;
        case "Tempest Emblem":
          if (item === "tempest") count = count + 1;
          break;
        default:
          break;
      }
    });

    // get bonus level
    let bonus_level = 0;
    lvls.forEach((lvl) => {
      if (count >= lvl) {
        bonus_level += 1;
      }
    });
    if (
      item === "bard" ||
      item === "monolith" ||
      item === "prodigy" ||
      item === "spell-thief" ||
      item === "starcaller"
    )
      bonus_level = 3;
    return { name: item, count, lvls, bonus_level };
  });
  return data;
}
