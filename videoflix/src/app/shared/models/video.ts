import { VideoResolution } from './video-resolution';

export interface Video {
  id: number;
  title: string;
  description: string;
  video_file: string;
  genre: string;
  thumbnail: string;
  resolutions: VideoResolution[];
  created_at: string;
  updated_at: string;
}
