export interface Song {
  _id: string;
  title: string;
  artist: string;
  albumId?: string;
  album?: string;
  imageUrl: string;
}

export interface Album {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
}
