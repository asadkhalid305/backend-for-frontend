interface Country {
  resource: string;
  id: number;
  continent_id: number;
  name: string;
  updated_at: null | string; // Use 'string' if the date is represented as a string, or 'Date' if it's a Date object
}

interface Player {
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

interface PlayerPosition {
  resource: string;
  id: number;
  name: string;
}

interface Career {
  resource: string;
  type: string;
  season_id: number;
  player_id: number;
  bowling: null; // Assuming bowling is always null in the provided data
  batting: BattingStats | null; // Batting can be null
  updated_at: string;
}

interface BattingStats {
  matches: number;
  innings: number;
  runs_scored: number;
  not_outs: number;
  highest_inning_score: number;
  strike_rate: number;
  balls_faced: number;
  average: number;
  four_x: number;
  six_x: number;
  fow_score: number;
  fow_balls: number;
  hundreds: number;
  fifties: number;
}

interface PlayerCareer extends Player {
  career: Career[];
}

export type {
  Country,
  Player,
  PlayerPosition,
  Career,
  BattingStats,
  PlayerCareer,
};
