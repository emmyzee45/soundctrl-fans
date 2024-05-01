export type ArtistCardType = {
  image: string;
  avatar: string;
  name: string;
  handle: string;
};

export type ArtistCommunityCardType = {
  image: string;
  name: string;
  handle: string;
};

export type FansCardType = {
  avatar: string;
  handle: string;
  count: string;
  fandom: string;
};

export type BookingProps = {
  _id: string,
  artistId: string,
  fanId: string,
  time: string,
  link: string,
  price: string,
  status: string,
  meetingId: string,
  username: string,
}

export type TicketType = {
  title: string;
  image: string;
  time: string;
  price: string;
};

export type ArtistFanCardType = {
  avatar: string;
  name: string;
  points: string;
  date: string;
};

export type FileProps = {
  avatarImg?: string,
  bannerImg?: string
}

export interface UserProps {
  username?: string,
  email?: string,
  password?: string,
  avatarImg?: string,
  bannerImg?: string,
  chatprofileImg?: string,
  createdAt?: string,
  _id: string,
  isArtist?: boolean,
  subscribers?: string[],
  desc?: string,
  twitter?: string,
  instagram?: string,
  country?: string,
  tiktok?: string,
  birthday?: string,
  phone?: string,
  spotify?: string,
  points?: number,
  address?: string,
  apple?: string,
};

export interface ArtistProps extends UserProps {
  subscribedUsers: any[],
}

export interface userState {
  currentUser: UserProps | null,
  isFetching: boolean,
  authenticated: boolean,
  error: boolean
}


