import { FirefighterDetails } from "@alarm-monitor/shared/src";

function queryFirefighters(list: FirefighterDetails[]) {
  return {
    list,
    filterByQualification(
      name: string,
      status: "active" | "expired" | "all" = "active",
    ) {
      return queryFirefighters(
        list.filter((f) =>
          f.qualificationToFirefighter.some((q) => {
            const nameMatch = q.qualification.name === name;
            if (status === "all") return nameMatch;
            return nameMatch && q.status === status;
          }),
        ),
      );
    },
    filterByActiveQualification(name: string) {
      return this.filterByQualification(name, "active");
    },
    filterByExpiredQualification(name: string) {
      return this.filterByQualification(name, "expired");
    },
    filterByAnyQualification(name: string) {
      return this.filterByQualification(name, "all");
    },
    excludeFirefighters(excluded: FirefighterDetails[]) {
      const excludedIds = new Set(excluded.map((f) => f.id));
      return queryFirefighters(list.filter((f) => !excludedIds.has(f.id)));
    },
    toArray() {
      return list;
    },
  };
}

export { queryFirefighters };
