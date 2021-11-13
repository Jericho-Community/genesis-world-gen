class RegionGenerator {
  /**
   * @method generate -> Geenrate Random Region blueprints
   * @param {Number[]} DimensionalLength -> Array of Lengths in terms of [Max,Min]
   * @param {Number[]} DimensionalBreadth -> Array of Breadth in terms of [Max,Min]
   * @param {JSON} RawLandJson -> Json Value of Resources in terms of Resources
   * @returns {Object} -> Generation Data after analyzing the Random algorithm of occurences as Land Type
   */
  static generate(DimensionalLength, DimensionalBreadth, RawLandJson) {
    const RegionModel = {};
    RegionModel.length = Math.floor(
      Math.random() * (DimensionalLength[0] - DimensionalLength[1]),
    ) + DimensionalLength[1];
    RegionModel.breadth = Math.floor(
      Math.random() * (DimensionalBreadth[0] - DimensionalBreadth[1]),
    ) + DimensionalBreadth[1];
    RegionModel.land_area = RegionModel.breadth * RegionModel.length;
    RegionModel.land_blueprint = [];
    const LandKeys = Object.keys(RawLandJson);
    let GarbageArray = [];
    for (let countA = 0; countA < RegionModel.breadth; ++countA) {
      for (let countB = 0; countB < RegionModel.length; ++countB) {
        GarbageArray.push(
          RegionGenerator.#RecursiveFunc(
            RawLandJson,
            RegionModel,
            countA,
            countB,
            LandKeys,
          ),
        );
        RegionModel.land_blueprint[countA] = GarbageArray;
      }
      GarbageArray = [];
    }
    return RegionModel;
  }

  static #RecursiveFunc(
    RawLandJson,
    RegionModel,
    RowNumber = 0,
    ColumnNumber = 0,
    LandKeys,
  ) {
    let GarbageElement = null;
    GarbageElement = RawLandJson[
      `${LandKeys[Math.floor(Math.random() * (LandKeys.length - 1))]}`
    ].prefix;
    GarbageElement = RegionGenerator.#DepthCompareChecks(
      RegionModel,
      RowNumber,
      ColumnNumber,
      GarbageElement,
      Math.floor(Math.random() * 4) + 0,
      Math.floor(Math.random() * 4) + 0,
    )
      ? GarbageElement
      : undefined;
    GarbageElement = RegionGenerator.#selectionWithOccurences([
      { chance: Math.floor(Math.random() * 5) + 30, result: 'Pl-' },
      { chance: Math.floor(Math.random() * 15) + 5, result: GarbageElement },
    ]);
    return GarbageElement ?? 'Pl-';
  }

  static #selectionWithOccurences(choices) {
    const ModernChoices = [];
    let totalWeight = 0.0;
    for (let i = 0; i < choices.length; i++) {
      if (choices[i].chance > 0.0) {
        ModernChoices.push(choices[i]);
        totalWeight += choices[i].chance;
      }
    }

    // Pick a random value from [0,1)
    const value = Math.random() * totalWeight;

    // Iterate over possibilities until we find the selected one
    let chanceCovered = 0.0;
    for (let i = 0; i < ModernChoices.length; i++) {
      chanceCovered += ModernChoices[i].chance;
      if (value < chanceCovered) {
        return ModernChoices[i].result;
      }
    }
  }

  static #DepthCompareChecks(
    RegionModel,
    RowNumber = 0,
    ColumnNumber = 0,
    Element = 'Pl-',
    RowDepth = 4,
    ColDepth = 3,
  ) {
    while (RowDepth >= 0) {
      while (ColDepth >= 0) {
        if ((RowNumber === 0 && ColumnNumber === 0) || Element === 'Pl-') return true;
        if (RowNumber - RowDepth < 0 && ColumnNumber - ColDepth < 0) {
          RowDepth -= 1;
          ColDepth -= 1;
          continue;
        }
        if (
          ColumnNumber === 0
          && ((RowNumber - RowDepth >= 0
            && RegionModel.land_blueprint[RowNumber - RowDepth] !== undefined
            && RegionModel.land_blueprint[RowNumber - RowDepth][
              ColumnNumber + ColDepth
            ] === Element)
            || (RegionModel.land_blueprint[RowNumber + RowDepth] !== undefined
              && RegionModel.land_blueprint[RowNumber + RowDepth][
                ColumnNumber + ColDepth
              ] === Element))
        ) {
          return false;
        }

        if (
          RowNumber === 0
          && RegionModel.land_blueprint[RowNumber + RowDepth] !== undefined
          && ((ColumnNumber - ColDepth >= 0
            && RegionModel.land_blueprint[RowNumber + RowDepth][
              ColumnNumber - ColDepth
            ] === Element)
            || RegionModel.land_blueprint[RowNumber + RowDepth][
              ColumnNumber + ColDepth
            ] === Element)
        ) {
          return false;
        }

        if (
          ColumnNumber === RegionModel.length - 1
          && RowNumber === RegionModel.breadth - 1
          && RowNumber - RowDepth >= 0
          && ColumnNumber - ColDepth >= 0
          && RegionModel.land_blueprint[RowNumber - RowDepth] !== undefined
          && RegionModel.land_blueprint[RowNumber - RowDepth][
            ColumnNumber - ColDepth
          ] === Element
        ) {
          return false;
        }

        if (
          RowNumber === RegionModel.breadth - 1
          && RowNumber - RowDepth >= 0
          && ColumnNumber - ColDepth >= 0
          && ((RegionModel.land_blueprint[RowNumber - RowDepth] !== undefined
            && RegionModel.land_blueprint[RowNumber - RowDepth][
              ColumnNumber - ColDepth
            ] === Element)
            || (RegionModel.land_blueprint[RowNumber - RowDepth] !== undefined
              && RegionModel.land_blueprint[RowNumber - RowDepth][
                ColumnNumber + ColDepth
              ] === Element))
        ) {
          return false;
        }

        if (
          ColumnNumber === RegionModel.length - 1
          && RowNumber - RowDepth >= 0
          && ColumnNumber - ColDepth >= 0
          && ((RegionModel.land_blueprint[RowNumber - RowDepth] !== undefined
            && RegionModel.land_blueprint[RowNumber - RowDepth][
              ColumnNumber - ColDepth
            ] === Element)
            || (RegionModel.land_blueprint[RowNumber + RowDepth] !== undefined
              && RegionModel.land_blueprint[RowNumber + RowDepth][
                ColumnNumber - ColDepth
              ] === Element))
        ) {
          return false;
        }

        if (
          RowNumber - RowDepth >= 0
          && ColumnNumber - ColDepth >= 0
          && ((RegionModel.land_blueprint[RowNumber + RowDepth] !== undefined
            && RegionModel.land_blueprint[RowNumber + RowDepth][
              ColumnNumber - ColDepth
            ] === Element)
            || (RegionModel.land_blueprint[RowNumber + RowDepth] !== undefined
              && RegionModel.land_blueprint[RowNumber + RowDepth][
                ColumnNumber + ColDepth
              ] === Element)
            || (RegionModel.land_blueprint[RowNumber - RowDepth] !== undefined
              && RegionModel.land_blueprint[RowNumber - RowDepth][
                ColumnNumber - ColDepth
              ] === Element)
            || (RegionModel.land_blueprint[RowNumber - RowDepth] !== undefined
              && RegionModel.land_blueprint[RowNumber - RowDepth][
                ColumnNumber + ColDepth
              ] === Element))
        ) {
          return false;
        }
        ColDepth -= 1;
      }
      RowDepth -= 1;
    }
    return true;
  }
}

module.exports = RegionGenerator;
