export type Page = {
  id: string;
  title: string;
  url: string;
  parentId: Page["id"];
  level: number;
  tabIndex: number;
  doNotShowWarningLink: boolean;
  pages: Array<Page["id"]>;
};
