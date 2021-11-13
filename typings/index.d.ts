import { RegionModel } from './interfaces'

export class RegionGen {
  public static generate(
    DimensionalLength: [] | '[0] to be max length and [1] to be min length',
    DimensionalBreadth: [] | '[0] to be max breadth and [1] to be min breadth',
    RawLandJson: Object | 'Raw Land Resource Value',
  ):
    | RegionModel
    | 'Array of 2-D Array of Land blueprints and other values for further analysis'
}
