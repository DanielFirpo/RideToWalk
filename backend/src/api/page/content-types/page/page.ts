// Interface automatically generated by schemas-to-ts

export interface Page {
  id: number;
  attributes: {
    createdAt: Date;    updatedAt: Date;    publishedAt?: Date;    page?: any;
    slug: string;
    locale: string;
    localizations?: { data: Page[] };
  };
}
export interface Page_Plain {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  page?: any;
  slug: string;
  locale: string;
  localizations?: Page_Plain[];
}

export interface Page_NoRelations {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  page?: any;
  slug: string;
  locale: string;
  localizations?: Page[];
}

export interface Page_AdminPanelLifeCycle {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  page?: any;
  slug: string;
  locale: string;
  localizations?: Page[];
}
