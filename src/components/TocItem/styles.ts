import styles, { css } from "styled-components";
import { TransitionStatus } from "react-transition-group";

type LabelProps = {
  $isOpen: boolean;
  $isActive: boolean;
  $hasChildren: boolean;
  $offset: number;
};

export const TocItemLabel = styles.div<LabelProps>`
    display: block;
    padding: 8px 28px;
    cursor: pointer;
    transition: all 0.07s ease-in-out;
    padding-left: ${({ $offset }) => $offset * 16}px;

    ${({ $isActive }) => {
      if ($isActive) {
        return css`
          background-color: ${({ theme }) => theme.toc.activeBackgroundColor};
          color: ${({ theme }) => theme.toc.activeColor};
        `;
      }

      return css`
        color: ${({ theme }) => theme.toc.color};
      `;
    }};

    ${({ $hasChildren, $isOpen }) =>
      $hasChildren &&
      css`
        &::before {
          content: "▶";
          display: inline-block;
          margin-right: 6px;
          ${$isOpen
            ? "transform: scaleY(0.85) rotate(90deg);"
            : "transform: scaleX(0.75)"};
          transition: transform 0.3s ease-in-out;
        }
      `}
`;

type ChildrenOffsetProps = {
  $isOpen: boolean;
};

export const TocItemChildrenOffset = styles.div<ChildrenOffsetProps>`
    background-color: ${({ $isOpen, theme }) => {
      return $isOpen ? theme.toc.openBackgroundColor : "transparent";
    }};
`;

type ChildrenProps = {
  $state: TransitionStatus;
};

export const TocItemChildren = styles.div<ChildrenProps>`
    transition: max-height 0.5s ease-in-out;
    overflow: hidden;

    max-height: ${({ $state }) => {
      switch ($state) {
        case "entered":
        case "entering": {
          return 10000;
        }

        case "unmounted":
        case "exiting":
        case "exited": {
          return 0;
        }
      }
    }}px;
`;
