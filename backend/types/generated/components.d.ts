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

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'general.bullet-point': GeneralBulletPoint;
      'link.link': LinkLink;
    }
  }
}
