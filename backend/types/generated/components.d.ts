import type { Schema, Struct } from '@strapi/strapi';

export interface ElementsCaracteristique extends Struct.ComponentSchema {
  collectionName: 'components_elements_caracteristiques';
  info: {
    description: "Caract\u00E9ristiques d'un service";
    displayName: 'Caract\u00E9ristique';
    icon: 'list';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icone: Schema.Attribute.String;
    titre: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsEtapeProcess extends Struct.ComponentSchema {
  collectionName: 'components_elements_etape_processes';
  info: {
    description: '\u00C9tape dans un processus m\u00E9thodologique';
    displayName: '\u00C9tape de processus';
    icon: 'steps';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    numero: Schema.Attribute.Integer & Schema.Attribute.Required;
    tags: Schema.Attribute.Component<'elements.tag', true>;
    titre: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_faq_items';
  info: {
    description: 'Question et r\u00E9ponse pour FAQ';
    displayName: 'Question FAQ';
    icon: 'question-mark';
  };
  attributes: {
    question: Schema.Attribute.String & Schema.Attribute.Required;
    reponse: Schema.Attribute.Blocks & Schema.Attribute.Required;
  };
}

export interface ElementsFonctionnaliteSimple extends Struct.ComponentSchema {
  collectionName: 'components_elements_fonctionnalite_simples';
  info: {
    description: 'Point dans une liste \u00E0 puces';
    displayName: 'Fonctionnalit\u00E9 simple';
    icon: 'check';
  };
  attributes: {
    texte: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsTag extends Struct.ComponentSchema {
  collectionName: 'components_elements_tags';
  info: {
    description: 'Mot-cl\u00E9 ou \u00E9tiquette';
    displayName: 'Tag';
    icon: 'tag';
  };
  attributes: {
    texte: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsTechnologie extends Struct.ComponentSchema {
  collectionName: 'components_elements_technologies';
  info: {
    description: 'Technologie utilis\u00E9e';
    displayName: 'Technologie';
    icon: 'code';
  };
  attributes: {
    description: Schema.Attribute.Text;
    logo: Schema.Attribute.Media<'images'>;
    nom: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsTypeService extends Struct.ComponentSchema {
  collectionName: 'components_elements_type_services';
  info: {
    description: "Sous-cat\u00E9gorie d'un service principal";
    displayName: 'Type de service';
    icon: 'apps';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    fonctionnalites: Schema.Attribute.Component<
      'elements.fonctionnalite-simple',
      true
    >;
    icone: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    titre: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'Donn\u00E9es SEO pour une page';
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaImage: Schema.Attribute.Media<'images'>;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'elements.caracteristique': ElementsCaracteristique;
      'elements.etape-process': ElementsEtapeProcess;
      'elements.faq-item': ElementsFaqItem;
      'elements.fonctionnalite-simple': ElementsFonctionnaliteSimple;
      'elements.tag': ElementsTag;
      'elements.technologie': ElementsTechnologie;
      'elements.type-service': ElementsTypeService;
      'shared.seo': SharedSeo;
    }
  }
}
