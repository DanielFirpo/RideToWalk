// Interface automatically generated by schemas-to-ts

import { Media } from '../../../common/schemas-to-ts/Media';
import { Media_Plain } from '../../../common/schemas-to-ts/Media';

export interface ImageCarousel {
  images: { data: Media[] };
}
export interface ImageCarousel_Plain {
  images: Media_Plain[];
}

export interface ImageCarousel_NoRelations {
  images: number[];
}
