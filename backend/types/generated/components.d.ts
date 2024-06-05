import type { Schema, Attribute } from '@strapi/strapi';

export interface GeneralBulletPoint extends Schema.Component {
  collectionName: 'components_general_bullet_points';
  info: {
    displayName: 'Bullet Point';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    bulletPointText: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'This is a bullet point'>;
  };
}

export interface LinkLink extends Schema.Component {
  collectionName: 'components_link_links';
  info: {
    displayName: 'Link';
    icon: 'cursor';
    description: '';
  };
  attributes: {
    linkText: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Click here for more information!'>;
    linkAddress: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'https://www.ridetowalk.org/'>;
  };
}

export interface PageSectionContentsBanner extends Schema.Component {
  collectionName: 'components_page_section_contents_banners';
  info: {
    displayName: 'banner';
    icon: 'oneToOne';
  };
  attributes: {
    leftText: Attribute.String;
  };
}

export interface PageSectionContentsHalfAndHalf extends Schema.Component {
  collectionName: 'components_page_section_contents_half_and_halves';
  info: {
    displayName: 'halfAndHalf';
    icon: 'layout';
  };
  attributes: {};
}

export interface PageSectionContentsImageCarousel extends Schema.Component {
  collectionName: 'components_page_section_contents_image_carousels';
  info: {
    displayName: 'imageCarousel';
    icon: 'picture';
  };
  attributes: {
    images: Attribute.Media & Attribute.Required;
  };
}

export interface PageSectionContentsImage extends Schema.Component {
  collectionName: 'components_page_section_contents_images';
  info: {
    displayName: 'image';
    icon: 'picture';
  };
  attributes: {
    image: Attribute.Media & Attribute.Required;
  };
}

export interface PageSectionContentsTitleHeader extends Schema.Component {
  collectionName: 'components_page_section_contents_title_headers';
  info: {
    displayName: 'titleHeader';
    icon: 'crown';
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Page Title Goes Here'>;
  };
}

export interface PageSectionContentsVideo extends Schema.Component {
  collectionName: 'components_page_section_contents_videos';
  info: {
    displayName: 'video';
    icon: 'play';
  };
  attributes: {
    video: Attribute.Media & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'general.bullet-point': GeneralBulletPoint;
      'link.link': LinkLink;
      'page-section-contents.banner': PageSectionContentsBanner;
      'page-section-contents.half-and-half': PageSectionContentsHalfAndHalf;
      'page-section-contents.image-carousel': PageSectionContentsImageCarousel;
      'page-section-contents.image': PageSectionContentsImage;
      'page-section-contents.title-header': PageSectionContentsTitleHeader;
      'page-section-contents.video': PageSectionContentsVideo;
    }
  }
}
