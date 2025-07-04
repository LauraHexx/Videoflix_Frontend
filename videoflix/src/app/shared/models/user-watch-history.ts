import { Video } from './video';

export interface UserWatchHistory {
  id: number;
  user: number;
  video: Video;
  progress: number;
  updated_at: string;
}
