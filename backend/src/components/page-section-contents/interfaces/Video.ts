// Interface automatically generated by schemas-to-ts

import { Media } from '../../../common/schemas-to-ts/Media';
import { Media_Plain } from '../../../common/schemas-to-ts/Media';

export interface Video {
  video: { data: Media };
  description?: string;
}
export interface Video_Plain {
  video: Media_Plain;
  description?: string;
}

export interface Video_NoRelations {
  video: number;
  description?: string;
}

