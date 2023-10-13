import styles, { css } from 'styled-components';

type LabelProps = {
    isOpen: boolean;
    isActive: boolean;
    hasChildren: boolean;
}

export const TocItemLabel = styles.div<LabelProps>`
    display: block;
    padding: 8px 28px;

    ${({ hasChildren, isOpen }) => hasChildren && css`
        &::before {
            content: '▶';
            display: inline-block;
            margin-right: 6px;
            ${isOpen ? 'transform: scaleY(0.85) rotate(90deg);' : 'transform: scaleX(0.75)'};
            transition: transform 0.3s ease-in-out;
        }
    `}
`;

// export const TocItemChildrenOffset = styles.div`
//     margin-left: 16px;
// `;

// type ChildrenProps = {
//     state: 'entering' | 'entered' | 'exiting' | 'exited' | 'unmounted'
// }

// export const TocItemChildren = styles.div<ChildrenProps>`
//     ${({ state }) => {
//         switch (state) {
//             case 'entering': {
//                 return css`

//                 `
//             }
//         }
//     }}
// `;
