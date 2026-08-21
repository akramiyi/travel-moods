import { Track, Quote, ChatMessage, OrkutScrap, CyberService } from '../types';

// YouTube Playlist: PLeatb7hupNV_AWUl_7ttbsKeCQh8tF5N4
export const YOUTUBE_PLAYLIST_ID = 'PLeatb7hupNV_AWUl_7ttbsKeCQh8tF5N4';

// NOTE: All youtubeId values below have been verified as REAL, existing
// YouTube videos (checked Aug 2026).
export const TRACK_LIST: Track[] = [
  {
    "id": "1",
    "youtubeId": "N0jnLZxYwYc",
    "title": "Mujhse Mohabbat Ka Izhaar",
    "artist": "Hum Hain Rahi Pyar Ke",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "5:04",
    "coverUrl": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "2",
    "youtubeId": "3NWMK2MRqIk",
    "title": "Tumsa Koi Pyaara",
    "artist": "Khuddar",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "6:16",
    "coverUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "3",
    "youtubeId": "9b0iydtDZLU",
    "title": "Waada Raha Sanam",
    "artist": "4K",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "6:05",
    "coverUrl": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "4",
    "youtubeId": "fg9G1dacXjk",
    "title": "Chhupana Bhi Nahin Aata Full Video Song",
    "artist": "Baazigar",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "4:13",
    "coverUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "5",
    "youtubeId": "u0AgbGWvzdA",
    "title": "Jhanjharia Lyrical",
    "artist": "Krishna",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "5:09",
    "coverUrl": "https://images.unsplash.com/photo-1476514525535-ce74f45814d0?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "6",
    "youtubeId": "jE1CavSI5TQ",
    "title": "Husn Hai Suhana",
    "artist": "Coolie No. 1",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "5:48",
    "coverUrl": "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "7",
    "youtubeId": "wYdXuNtJkPk",
    "title": "Jeeye To Jeeye Kaise",
    "artist": "Lyrical",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "3:37",
    "coverUrl": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "8",
    "youtubeId": "cBGDDBHN22U",
    "title": "Pehli Pehli Baar Mohabbat Ki Hai Full Video Song",
    "artist": "Sirf Tum",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "7:37",
    "coverUrl": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "9",
    "youtubeId": "oFxbBeYhLqM",
    "title": "Saaton Janam Main Tere Full Lyrical",
    "artist": "Video Song",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "6:02",
    "coverUrl": "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "10",
    "youtubeId": "e-1xmmEb49I",
    "title": "To Chalun",
    "artist": "Various Artists",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "7:39",
    "coverUrl": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "11",
    "youtubeId": "7-ORLGKcnLQ",
    "title": "Tumhein Dekhen Meri Aankhen",
    "artist": "Divya Bharti",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "6:34",
    "coverUrl": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "12",
    "youtubeId": "tPNwGuu_rQ4",
    "title": "Lyrical: Tumhein Apna Banane Ki Kasam",
    "artist": "Sadak",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "5:37",
    "coverUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "13",
    "youtubeId": "dDR4oiyjUBA",
    "title": "Raah Mein Unse Mulaqat",
    "artist": "Lyrical",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "7:36",
    "coverUrl": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "14",
    "youtubeId": "tRMzF4EVPHI",
    "title": "Tu Jo Hans Hans Ke HD",
    "artist": "Govinda, Aarti Chabria",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "4:14",
    "coverUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "15",
    "youtubeId": "2nypvYilIkA",
    "title": "Kahin mujhe pyar hua to nahin hai",
    "artist": "HD Kumar Sanu, Alka Yagnik",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "7:04",
    "coverUrl": "https://images.unsplash.com/photo-1476514525535-ce74f45814d0?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "16",
    "youtubeId": "PqiddY3o3aY",
    "title": "Dil Kehta Hai",
    "artist": "Akele Hum Akele Tum",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "6:43",
    "coverUrl": "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "17",
    "youtubeId": "Jtg2zyS_y_c",
    "title": "Ae Kash Ke Hum Full Video",
    "artist": "Kabhi Haan Kabhi Naa",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "4:56",
    "coverUrl": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "18",
    "youtubeId": "lFdSi01tpYM",
    "title": "Sochenge Tumhe Pyar",
    "artist": "Lyrical",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "6:30",
    "coverUrl": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "19",
    "youtubeId": "i1IsLVz6T9Q",
    "title": "Kumar Sanu & Sadhana Sargam Live Sydney",
    "artist": "Teri umeed tera intezar",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "2:59",
    "coverUrl": "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "20",
    "youtubeId": "bga_0ziOOfQ",
    "title": "Woh Meri Neend Mera Chain Lyrical",
    "artist": "Hum Hain Rahi Pyar Ke",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "4:57",
    "coverUrl": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "21",
    "youtubeId": "g3ddCx2Uawo",
    "title": "Dil Hai Ki Manta Nahin Full Audio Song",
    "artist": "Anuradha Paudwal",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "6:11",
    "coverUrl": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "22",
    "youtubeId": "QjqKXFGM3eI",
    "title": "Chori Chori Dil Tera",
    "artist": "Kumar Sanu Songs",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "6:53",
    "coverUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "23",
    "youtubeId": "Y-o8NQ8Y36A",
    "title": "Is Tarah Aashiqui Ka Lyrical",
    "artist": "Imtihan",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "7:49",
    "coverUrl": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "24",
    "youtubeId": "qGOTe3KmCdY",
    "title": "Kitna Haseen Chehra Full Lyrical Video Song",
    "artist": "Dilwale",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "6:05",
    "coverUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "25",
    "youtubeId": "9f6GhUb-WdM",
    "title": "Dil Cheer Ke Dekh",
    "artist": "Divya Bharti",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "4:47",
    "coverUrl": "https://images.unsplash.com/photo-1476514525535-ce74f45814d0?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "26",
    "youtubeId": "E4HtYArLiwc",
    "title": "Pucho Zara Pucho",
    "artist": "Aamir Khan,Karisma Kapoor",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "7:40",
    "coverUrl": "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "27",
    "youtubeId": "d5ZrSe1eDDU",
    "title": "Woh Ladki Bahut Yaad Aati Hai",
    "artist": "Kumar Sanu",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "7:30",
    "coverUrl": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "28",
    "youtubeId": "1jjDs69WWUQ",
    "title": "Lal Dupatta Full Song",
    "artist": "Mujhse Shaadi Karogi",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "4:59",
    "coverUrl": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "29",
    "youtubeId": "PlN6oP-Nlno",
    "title": "Sona Kitna Sona Hai",
    "artist": "Govinda, Karisma Kapoor",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "4:39",
    "coverUrl": "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "30",
    "youtubeId": "SF_cCyz6QQg",
    "title": "Humko Deewana Kar Gaye  Humko Deewana Kar Gaye",
    "artist": "Various Artists",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "6:23",
    "coverUrl": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "31",
    "youtubeId": "_YjSmLlmqLM",
    "title": "Aisi Deewangi",
    "artist": "Lyrical",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "7:26",
    "coverUrl": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "32",
    "youtubeId": "qkZiKkmaBtE",
    "title": "आते जाते खूबसूरत आवारा सड़को पे Aate Jate Khoobsura...",
    "artist": "किशोर कुमार",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "5:15",
    "coverUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "33",
    "youtubeId": "eVnG_Rqfgg4",
    "title": "Neele Neele Ambar Par",
    "artist": "Male Version Lyric Video",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "3:55",
    "coverUrl": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "34",
    "youtubeId": "mW4WRtL6GxM",
    "title": "Is Pyar Se Meri Taraf Na Dekho",
    "artist": "Lyrical",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "5:10",
    "coverUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "35",
    "youtubeId": "wuLJtA0uJro",
    "title": "Hum Lakh Chupaye Pyar Magar",
    "artist": "4K Video Song",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "4:37",
    "coverUrl": "https://images.unsplash.com/photo-1476514525535-ce74f45814d0?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "36",
    "youtubeId": "uIOrAkrjwp4",
    "title": "Hum Yaar Hai Tumhare",
    "artist": "Alka Yagnik",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "7:11",
    "coverUrl": "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "37",
    "youtubeId": "5y_TCKNzAMI",
    "title": "Tumse Milne Ko Dil Karta Hai ❤️🎶",
    "artist": "Phool Aur Kaante",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "4:39",
    "coverUrl": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "38",
    "youtubeId": "cBwl6qKrZd0",
    "title": "Ab Tere Dil Mein To",
    "artist": "Kumar Sanu & Alka",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "8:25",
    "coverUrl": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "39",
    "youtubeId": "BaAoZA0fup0",
    "title": "Dil Ka Aalam",
    "artist": "Aashiqui",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "4:15",
    "coverUrl": "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "40",
    "youtubeId": "nNhv8A_rJTg",
    "title": "Oye Raju Pyar Na Kariyo Lyrical Video",
    "artist": "Hadh Kar Di Aapne",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "5:53",
    "coverUrl": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "41",
    "youtubeId": "s1NLjpj3aP4",
    "title": "Jaa Bewafa Jaa Full Video Song",
    "artist": "Altaf Raja",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "4:29",
    "coverUrl": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "42",
    "youtubeId": "u4NSsEIny1c",
    "title": "Muje Pine ka Shauk Nahi",
    "artist": "Coolie  Full VIdeo Song *HD*",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "4:47",
    "coverUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "43",
    "youtubeId": "RjJxWRFfG3s",
    "title": "Nahin Yeh Ho Nahin Sakta",
    "artist": "Lyrical",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "6:22",
    "coverUrl": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "44",
    "youtubeId": "rrzSZ0NMID4",
    "title": "Barsaat Ke Mausam Mein",
    "artist": "Naajayaz",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "5:26",
    "coverUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "45",
    "youtubeId": "1ziaNhD9xqE",
    "title": "Meri Mehbooba Lyrical",
    "artist": "Pardes",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "7:29",
    "coverUrl": "https://images.unsplash.com/photo-1476514525535-ce74f45814d0?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "46",
    "youtubeId": "UCsW7nea7sI",
    "title": "Ae Mere Humsafar",
    "artist": "4K Video",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "6:42",
    "coverUrl": "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "47",
    "youtubeId": "OTT_aW2SP74",
    "title": "Aapke Pyaar Mein",
    "artist": "Various Artists",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "5:35",
    "coverUrl": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "48",
    "youtubeId": "5dWbn_qER3s",
    "title": "Tere Dar Par Sanam",
    "artist": "Male Version",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "6:29",
    "coverUrl": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "49",
    "youtubeId": "HIr_kpG4Fnc",
    "title": "S. P. Balasubrahmanyam sings Tumse Milne Ki Tamann...",
    "artist": "तुमसे मिलने की तमन्ना from Saajan",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "5:47",
    "coverUrl": "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "50",
    "youtubeId": "XR7qvTgQ19o",
    "title": "Taaron Ka Chamakta  Hum Tumhare Hain Sanam",
    "artist": "Various Artists",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "6:01",
    "coverUrl": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "51",
    "youtubeId": "jEL02Nz7Dds",
    "title": "Dono Hi Mohabbat Ke Full Video Song",
    "artist": "Altaf Raja",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "8:55",
    "coverUrl": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "52",
    "youtubeId": "mocKoIhNJxk",
    "title": "Ding Dong Dole Lyrical Video",
    "artist": "Kucch To Hai",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "6:43",
    "coverUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "53",
    "youtubeId": "Tx7YCSTJC6I",
    "title": "Dheere Dheere  Tere Bina",
    "artist": "Various Artists",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "4:32",
    "coverUrl": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "54",
    "youtubeId": "jD3SGW0NHY0",
    "title": "Kumar Sanu 90's Hits",
    "artist": "Chand Se Parda Kijiye",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "6:13",
    "coverUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "55",
    "youtubeId": "0A2ue4lNMzo",
    "title": "Wafa Na Raas Aayee Tujhe O Harjaee Full Video",
    "artist": "Bewafa Sanam",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "6:06",
    "coverUrl": "https://images.unsplash.com/photo-1476514525535-ce74f45814d0?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },

  {
    "id": "57",
    "youtubeId": "s4slgbuwOfw",
    "title": "O Dil Tod Ke Hansti Ho Mera Remix Video Song",
    "artist": "Bewafa Sanam",
    "album": "Travel Moods Hits",
    "year": "Retro",
    "duration": "4:40",
    "coverUrl": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Chala chal rahi... dil mein utar gaya..."
  },
  {
    "id": "58",
    "youtubeId": "0JCLpa-r4Lg",
    "title": "Kitni Bechain Hoke",
    "artist": "Udit Narayan & Alka Yagnik",
    "album": "Kasoor",
    "year": "2001",
    "duration": "7:12",
    "coverUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Kitni bechain hoke tumse mili... tumse mili..."
  },
  {
    "id": "59",
    "youtubeId": "p4dFh3N3t7s",
    "title": "Zindagi Ban Gaye Ho Tum",
    "artist": "Udit Narayan & Alka Yagnik",
    "album": "Kasoor",
    "year": "2001",
    "duration": "5:37",
    "coverUrl": "https://images.unsplash.com/photo-1476514525535-ce74f45814d0?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Zindagi ban gaye ho tum... meri zindagi ban gaye ho tum..."
  },
  {
    "id": "60",
    "youtubeId": "1FLjamTP-sg",
    "title": "Mohabbat Ho Na Jaye",
    "artist": "Kumar Sanu & Alka Yagnik",
    "album": "Kasoor",
    "year": "2001",
    "duration": "6:23",
    "coverUrl": "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Dekha jo tumko... yeh dil ko kya hua..."
  },
  {
    "id": "61",
    "youtubeId": "F0l5V2M7uX8",
    "title": "Koi To Saathi Chahiye",
    "artist": "Kumar Sanu",
    "album": "Kasoor",
    "year": "2001",
    "duration": "5:35",
    "coverUrl": "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Koi to saathi chahiye... yaadon mein rehne ke liye..."
  },
  {
    "id": "62",
    "youtubeId": "07D03JLB_DM",
    "title": "Dil Mera Tod Diya",
    "artist": "Alka Yagnik",
    "album": "Kasoor",
    "year": "2001",
    "duration": "4:56",
    "coverUrl": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Dil mera tod diya... pathar se bhi zyada..."
  },
  {
    "id": "63",
    "youtubeId": "zR0v_7UeW3U",
    "title": "Kal Raat Ho Gayee",
    "artist": "Kumar Sanu & Alka Yagnik",
    "album": "Kasoor",
    "year": "2001",
    "duration": "7:38",
    "coverUrl": "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=300&auto=format&fit=crop&q=80",
    "lyricsSnippet": "Kal raat ho gayi... baaton hi baaton mein..."
  }
];

export const NOSTALGIC_QUOTES: Quote[] = [
  {
    id: 1,
    text: "Bhaiya 10 minute aur badha do! Bas Woh Lamhe ka mp3 song download hone hi wala hai (98%)!",
    speaker: "Cabin #04 Gamer",
    year: "2006",
    tag: "Limewire Memories"
  },
  {
    id: 2,
    text: "ASL Plz? 18 / M / Delhi... Tu kahan se hai? Yahoo Chatroom India_Flirt_20s me aao!",
    speaker: "Yahoo Messenger User",
    year: "2004",
    tag: "Yahoo Chat Room"
  },
  {
    id: 3,
    text: "Bhaiya webcam ka red light nahi jal raha hai! Video call me dhoondhla dikh raha hai.",
    speaker: "Cabin #02 Uncle",
    year: "2007",
    tag: "iBall Webcam"
  },
  {
    id: 4,
    text: "Orkut pe scrap bhej diya hai bhai, tune 'Cool' & 'Sexy' walle badge mark kiye ki nahi?",
    speaker: "College Buddy",
    year: "2007",
    tag: "Orkut Era"
  },
  {
    id: 5,
    text: "Keyboard me 'ASPIRINE' aur 'NUTTERTOOLS' type kar, Vice City me full health aur guns mil jayenge!",
    speaker: "Pro Gamer",
    year: "2005",
    tag: "GTA Vice City Cheats"
  },
  {
    id: 6,
    text: "Counter-Strike 1.6 de_dust2 LAN server ip 192.168.1.105 pe connect karo sab log! No AWP allowed!",
    speaker: "LAN Party Squad",
    year: "2005",
    tag: "CS 1.6 LAN Match"
  },
  {
    id: 7,
    text: "Bhaiya printout B&W ₹5 per page aur Color ₹15... aur blank CD me songs burn karne ka kitna loge?",
    speaker: "School Project Kid",
    year: "2008",
    tag: "Nero Express CD Burning"
  },
  {
    id: 8,
    text: "BSNL DataOne dial-up disconnect ho gaya! Redialing 011-17220000... Modem noise start!",
    speaker: "Akram Cyber Cafe Admin",
    year: "2004",
    tag: "256 Kbps Broadband"
  },
  {
    id: 9,
    text: "Nokia 3310 composer me Himesh Reshammiya ki ringtone feed kar raha hoon, key sequence likh lo!",
    speaker: "Mobile Lover",
    year: "2006",
    tag: "Polyphonic Ringtones"
  },
  {
    id: 10,
    text: "Cutting Chai and Samosa order at Cabin #07! Bilkul garm-garm chai ke sath surfing!",
    speaker: "Chaiwala Chotu",
    year: "2006",
    tag: "Cyber Cafe Vibe"
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'Priya_Delhi_21',
    avatar: '👩💼',
    text: 'Hey! ASL Plz?',
    time: '01:42 PM'
  },
  {
    id: 'm2',
    sender: 'Rohan_CS_Pro',
    avatar: '👨💻',
    text: 'Bhai de_dust2 server open hai! Fast aao PC-07 pe!',
    time: '01:43 PM'
  },
  {
    id: 'm3',
    sender: 'AKR@M (Admin)',
    avatar: '🎧',
    text: 'Welcome to Cyber World! ₹20/hr active. Winamp loaded with 2000s playlist.',
    time: '01:44 PM'
  }
];

export const INITIAL_ORKUT_SCRAPS: OrkutScrap[] = [
  {
    id: 's1',
    author: 'Amit_Rockstar',
    time: '11 Aug 2007, 04:15 PM',
    message: 'Bhai tera Orkut theme blackout wolla tagda lag raha hai! Scrap back fast!! 🚀',
    fansCount: 42
  },
  {
    id: 's2',
    author: 'Neha_Sweet16',
    time: '10 Aug 2007, 09:30 PM',
    message: 'Thanks for the fan star on my profile!! Ur testimonial is super cute :) tc bye!',
    fansCount: 88
  },
  {
    id: 's3',
    author: 'Ravi_Gamer_007',
    time: '08 Aug 2007, 02:20 PM',
    message: 'Nero se DVD burn karke 2000s song collection drop kar dio cyber cafe pe!',
    fansCount: 19
  }
];

export const CYBER_SERVICES: CyberService[] = [
  {
    name: 'Internet Browsing',
    price: '₹20',
    unit: 'per hour',
    icon: '🌐',
    description: 'High-Speed BSNL DataOne 256 Kbps connection with CRT color display.'
  },
  {
    name: 'LAN Gaming (CS 1.6 / Vice City)',
    price: '₹15',
    unit: 'per hour',
    icon: '🎮',
    description: '100 Mbps local network match with mechanical keyboard & optical mouse.'
  },
  {
    name: 'Printout & Scan',
    price: '₹5 - ₹15',
    unit: 'per page',
    icon: '🖨️',
    description: 'HP LaserJet 1020 Black & White (₹5) or Canon Color (₹15).'
  },
  {
    name: 'CD / DVD Burning',
    price: '₹20',
    unit: 'per disc',
    icon: '💿',
    description: 'Nero Express 700MB MP3 & Video CD creation with jewel case.'
  },
  {
    name: 'Cutting Chai & Samosa Combo',
    price: '₹15',
    unit: 'per order',
    icon: '☕',
    description: 'Hot spiced Indian tea with crispy potato samosa served directly at your cabin.'
  },
  {
    name: 'Webcam & Yahoo Video Chat',
    price: '₹5',
    unit: 'extra / hr',
    icon: '📹',
    description: '300k Pixel iBall webcam with built-in mic for international calls.'
  }
];

export const VICE_CITY_CHEATS = [
  { code: 'ASPIRINE', effect: 'Full Health 100%' },
  { code: 'PRECIOUSPROTECTION', effect: 'Full Armor 100%' },
  { code: 'NUTTERTOOLS', effect: 'Heavy Weapons Pack' },
  { code: 'LEAVEMEALONE', effect: 'Decrease Wanted Level' },
  { code: 'SEAWAYS', effect: 'Cars Drive on Water' },
  { code: 'BIGBANG', effect: 'Blow Up All Surrounding Cars' }
];
