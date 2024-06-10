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
    description: '';
  };
  attributes: {
    leftText: Attribute.String;
    facebookLink: Attribute.String;
    instagramLink: Attribute.String;
    tiktokLink: Attribute.String;
    youtubeLink: Attribute.String;
    googleLink: Attribute.String;
    twitterLink: Attribute.String;
    linkedInLink: Attribute.String;
    snapchatLink: Attribute.String;
  };
}

export interface PageSectionContentsButton extends Schema.Component {
  collectionName: 'components_page_section_contents_buttons';
  info: {
    displayName: 'button';
    icon: 'cursor';
  };
  attributes: {
    link: Attribute.Component<'link.link'> & Attribute.Required;
  };
}

export interface PageSectionContentsDivider extends Schema.Component {
  collectionName: 'components_page_section_contents_dividers';
  info: {
    displayName: 'Divider';
    icon: 'oneToOne';
  };
  attributes: {
    centerText: Attribute.String;
  };
}

export interface PageSectionContentsHalfAndHalf extends Schema.Component {
  collectionName: 'components_page_section_contents_half_and_halves';
  info: {
    displayName: 'halfAndHalf';
    icon: 'layout';
    description: '';
  };
  attributes: {
    image: Attribute.Media & Attribute.Required;
    text: Attribute.Text &
      Attribute.Required &
      Attribute.DefaultTo<'Long paragraph goes here.'>;
    button: Attribute.Component<'link.link'>;
    imagePosition: Attribute.Enumeration<['Image on Left', 'Image on Right']> &
      Attribute.Required &
      Attribute.DefaultTo<'Image on Left'>;
    imageDescription: Attribute.String &
      Attribute.DefaultTo<'A Picture of the Ranch'>;
    title: Attribute.String &
      Attribute.DefaultTo<'A Title Can Go Here If You Want.'>;
    linksToInsert: Attribute.Component<'link.link', true>;
  };
}

export interface PageSectionContentsImageCarousel extends Schema.Component {
  collectionName: 'components_page_section_contents_image_carousels';
  info: {
    displayName: 'imageCarousel';
    icon: 'picture';
    description: '';
  };
  attributes: {
    images: Attribute.Media & Attribute.Required;
  };
}

export interface PageSectionContentsPadding extends Schema.Component {
  collectionName: 'components_page_section_contents_paddings';
  info: {
    displayName: 'padding';
    icon: 'layer';
  };
  attributes: {
    pixels: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Attribute.DefaultTo<50>;
  };
}

export interface PageSectionContentsQuote extends Schema.Component {
  collectionName: 'components_page_section_contents_quotes';
  info: {
    displayName: 'quote';
    icon: 'quote';
    description: '';
  };
  attributes: {
    quote: Attribute.Text &
      Attribute.Required &
      Attribute.DefaultTo<'Put a quote here. Make sure to not include the quotation marks, since they are added automatically.'>;
    attribution: Attribute.String &
      Attribute.DefaultTo<'Somebody who said something, of some organization.'>;
  };
}

export interface PageSectionContentsSubtitle extends Schema.Component {
  collectionName: 'components_page_section_contents_subtitles';
  info: {
    displayName: 'subtitle';
    icon: 'write';
  };
  attributes: {
    text: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'This is a subtitle for a section of the page. '>;
  };
}

export interface PageSectionContentsText extends Schema.Component {
  collectionName: 'components_page_section_contents_texts';
  info: {
    displayName: 'text';
    icon: 'bold';
    description: '';
  };
  attributes: {
    text: Attribute.Text &
      Attribute.Required &
      Attribute.DefaultTo<'Paragraph(s) go here'>;
    title: Attribute.String &
      Attribute.DefaultTo<'You can put an opening title for the paragraph here'>;
    centerAlign: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
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
    description: '';
  };
  attributes: {
    video: Attribute.Media & Attribute.Required;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 155;
      }> &
      Attribute.DefaultTo<'Video description goes here.'>;
  };
}

export interface PageSectionContentsWideImage extends Schema.Component {
  collectionName: 'components_page_section_contents_wide_images';
  info: {
    displayName: 'wideImage';
    icon: 'picture';
    description: '';
  };
  attributes: {
    image: Attribute.Media & Attribute.Required;
    addPaddingOnLeftAndRight: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'general.bullet-point': GeneralBulletPoint;
      'link.link': LinkLink;
      'page-section-contents.banner': PageSectionContentsBanner;
      'page-section-contents.button': PageSectionContentsButton;
      'page-section-contents.divider': PageSectionContentsDivider;
      'page-section-contents.half-and-half': PageSectionContentsHalfAndHalf;
      'page-section-contents.image-carousel': PageSectionContentsImageCarousel;
      'page-section-contents.padding': PageSectionContentsPadding;
      'page-section-contents.quote': PageSectionContentsQuote;
      'page-section-contents.subtitle': PageSectionContentsSubtitle;
      'page-section-contents.text': PageSectionContentsText;
      'page-section-contents.title-header': PageSectionContentsTitleHeader;
      'page-section-contents.video': PageSectionContentsVideo;
      'page-section-contents.wide-image': PageSectionContentsWideImage;
    }
  }
}
