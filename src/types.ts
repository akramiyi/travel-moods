export interface Track {
  id: string;
  youtubeId: string;
  audioUrl?: string;
  title: string;
  artist: string;
  album: string;
  year: string;
  duration: string;
  coverUrl: string;
  lyricsSnippet?: string;
}

export interface Quote {
  id: number;
  text: string;
  speaker: string;
  year: string;
  tag: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  text: string;
  time: string;
  isMe?: boolean;
  isBuzz?: boolean;
}

export interface OrkutScrap {
  id: string;
  author: string;
  time: string;
  message: string;
  fansCount: number;
}

export interface CyberService {
  name: string;
  price: string;
  unit: string;
  icon: string;
  description: string;
}
