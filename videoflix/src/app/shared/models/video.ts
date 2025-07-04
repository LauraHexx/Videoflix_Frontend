export interface Video {
  id: number;
  title: string;
  description: string;
  duration: number;
  video_file: string;
  genre: string;
  thumbnail: string;
  thumbnail_url: string;
  hls_playlist: string;
  hls_playlist_url: string;
  watch_progress: number;
  created_at: string;
  updated_at: string;
}
