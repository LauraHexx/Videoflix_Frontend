import { VideoResolution } from './video-resolution';

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
  resolutions: VideoResolution[];
  created_at: string;
  updated_at: string;
}
