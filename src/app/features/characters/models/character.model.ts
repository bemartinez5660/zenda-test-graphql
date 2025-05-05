export interface Character {
  id?:       string;
  name?:     string;
  status?:   string;
  species?:  string;
  type?:     string;
  gender?:   string;
  origin?:   Origin;
  location?: Location;
  image?:    string;
  episode?:  Episode[];
  created?:  Date;
  typename?: Typename;
}

export interface Origin {
  id?:       string;
  name?:     string;
  airDate?:  string;
  typename?: Typename;
  type?:     string;
}

export interface Episode {
  id?:       string;
  name?:     string;
  air_date?:  string;
  typename?: Typename;
  type?:     string;
}

export enum Typename {
  Character = "Character",
  Episode = "Episode",
  Location = "Location",
}

export interface Location {
  id?:        string;
  name?:      string;
  type?:      string;
  residents?: Resident[];
  typename?:  Typename;
}

export interface Resident {
  id?:       string;
  name?:     string;
  gender?:   string;
}
