export const assets = {
  site: {
    hero: "assets/site/hero.png",
    about: "assets/site/about.png",
    capabilities: "assets/site/capabilities.png",
    contact: "assets/site/contact.png",
  },
  projects: {
    paperforge: {
      card: "assets/projects/paperforge/card.png",
      detail: {
        cover: "assets/projects/paperforge/cover.png",
        galleryOne: "assets/projects/paperforge/model-setup.png",
        galleryTwo: "assets/projects/paperforge/editor-state.png",
        wide: "assets/projects/paperforge/editor-state.png",
      },
    },
    weblearnboost: {
      card: "assets/projects/weblearnboost/card.png",
      detail: {
        cover: "assets/projects/weblearnboost/cover.png",
        galleryOne: "assets/projects/weblearnboost/learning-map.png",
        galleryTwo: "assets/projects/weblearnboost/question-flow.png",
        wide: "assets/projects/weblearnboost/wide.png",
      },
    },
    promptcase: {
      card: "assets/projects/promptcase/card.png",
    },
    personalWeb: {
      card: "assets/projects/personal-web/card.png",
    },
    prototypeGallery: {
      card: "assets/projects/prototype-gallery/card.png",
    },
  },
  posts: {
    learningAiProductsByMakingPrototypes: {
      cover: "assets/posts/learning-ai-products-by-making-prototypes/cover.png",
      bodyFigure: "assets/shared/workflow-map.png",
    },
    noticingAiTools: {
      cover: "assets/posts/noticing-ai-tools/cover.png",
    },
    paperforgeAsProductExercise: {
      cover: "assets/posts/paperforge-as-product-exercise/cover.png",
    },
  },
  shared: {
    legacyProjectLight: "assets/shared/legacy-project-light.png",
    legacyProjectDark: "assets/shared/legacy-project-dark.png",
    workflowMap: "assets/shared/workflow-map.png",
  },
} as const;

export type AssetPath = string;
