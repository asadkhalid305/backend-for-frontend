interface PlayerPosition {
  resource: string;
  id: number;
  name: string;
}

interface CommonStatistics {
  matches: number;
  innings: number;
  strike_rate: number;
}

interface BowlingStatistics extends CommonStatistics {
  overs: number;
  average: number;
  econ_rate: number;
  medians: number;
  runs: number;
  wickets: number;
  wide: number;
  noball: number;
  four_wickets: number;
  five_wickets: number;
  ten_wickets: number;
  rate: number;
}

interface BattingStatistics extends CommonStatistics {
  runs_scored: number;
  not_outs: number;
  highest_inning_score: number;
  balls_faced: number;
  average: number;
  four_x: number;
  six_x: number;
  fow_score: number;
  fow_balls: number;
  hundreds: number;
  fifties: number;
}

type TransformedBowlingStatistics = Omit<
  BowlingStatistics,
  "medians" | "five_wickets" | "ten_wickets"
>;

type TransformedBattingStatistics = Omit<
  BattingStatistics,
  "fow_score" | "fow_balls"
>;

export interface Country {
  resource: string;
  id: number;
  continent_id: number;
  name: string;
  updated_at: null | string; // Use 'string' if the date is represented as a string, or 'Date' if it's a Date object
}

export interface Player {
  resource: string;
  id: number;
  country_id: number;
  firstname: string;
  lastname: string;
  fullname: string;
  image_path: string;
  dateofbirth: string;
  gender: string;
  battingstyle: string;
  bowlingstyle: string;
  position: PlayerPosition;
  updated_at: string;
}

export interface Career {
  resource: string;
  type: string;
  season_id: number;
  player_id: number;
  bowling: BowlingStatistics | null;
  batting: BattingStatistics | null; // Batting can be null
  updated_at: string;
}

export interface PlayerCareer extends Player {
  career: Career[];
}

export type TransformedPlayer = Pick<
  Player,
  "id" | "fullname" | "image_path" | "gender" | "battingstyle" | "bowlingstyle"
>;

export type TransformedCareer = Pick<Career, "player_id" | "type"> & {
  bowling: TransformedBowlingStatistics | null;
  batting: TransformedBattingStatistics | null;
};

export interface TransformedPlayerCareer extends TransformedPlayer {
  age: number;
  position: string;
  career: TransformedCareer[];
}
