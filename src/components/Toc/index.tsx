import React from 'react';
import { Page } from '../../hooks/tocData';
import { TocItem } from '../TocItem';

type Props = {
    pages: Record<Page['id'], Page>,
    topLevelIds: Array<Page['id']>
}



export const Toc = ({ pages, topLevelIds }: Props) => {
    return (
        <div>
            {topLevelIds.map((pageId) => (
                <div>
                    <TocItem pageId={pageId} pages={pages} />
                </div>
            ))}
        </div>
    );
};
