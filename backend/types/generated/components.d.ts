import type { Schema, Attribute } from '@strapi/strapi';

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
      'link.link': LinkLink;
    }
  }
}
