// Interface automatically generated by schemas-to-ts

import { Media } from '../../../common/schemas-to-ts/Media';
import { Link } from '../../link/interfaces/Link';
import { Media_Plain } from '../../../common/schemas-to-ts/Media';
import { Link_Plain } from '../../link/interfaces/Link';
import { Link_NoRelations } from '../../link/interfaces/Link';

export enum ImagePosition {
  ImageOnLeft = 'Image on Left',
  ImageOnRight = 'Image on Right',}

export interface HalfAndHalf {
  image: { data: Media };
  text: string;
  button?: Link;
  imagePosition: ImagePosition;
  imageDescription?: string;
  title?: string;
  linksToInsert: Link[];
}
export interface HalfAndHalf_Plain {
  image: Media_Plain;
  text: string;
  button?: Link_Plain;
  imagePosition: ImagePosition;
  imageDescription?: string;
  title?: string;
  linksToInsert: Link_Plain[];
}

export interface HalfAndHalf_NoRelations {
  image: number;
  text: string;
  button?: Link_NoRelations;
  imagePosition: ImagePosition;
  imageDescription?: string;
  title?: string;
  linksToInsert: Link_NoRelations[];
}

