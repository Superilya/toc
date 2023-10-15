import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    app: {
      backgroundColor: string;
    };
    toc: {
      color: string;
      activeColor: string;
      activeBackgroundColor: string;
      openBackgroundColor: string;
    };
  }
}
