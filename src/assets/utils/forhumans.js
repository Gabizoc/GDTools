function forHumans(o) {
  for (
    var r = [
      [Math.floor(o / 31536e3), "annés"],
      [Math.floor((o % 31536e3) / 86400), "jours"],
      [Math.floor(((o % 31536e3) % 86400) / 3600), "heures"],
      [Math.floor((((o % 31536e3) % 86400) % 3600) / 60), "minutes"],
      [(((o % 31536e3) % 86400) % 3600) % 60, "secondes"],
    ],
    e = "",
    t = 0,
    s = r.length;
    t < s;
    t++
  )
    0 !== r[t][0] &&
      (e +=
        " " +
        r[t][0] +
        " " +
        (1 === r[t][0] ? r[t][1].substr(0, r[t][1].length - 1) : r[t][1]));
  return e.trim();
}

module.exports = forHumans;

