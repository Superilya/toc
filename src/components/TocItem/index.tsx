import { useState } from 'react';
import { Page } from '../../hooks/tocData';
import { TocItemLabel } from './styles';

const getPageById = (pageId: string, pages: Record<Page['id'], Page>) => {
    return pages[pageId];
}

export const TocItem = (props: { pageId: Page['id'], pages: Record<Page['id'], Page> }) => {
    const [isOpen, setOpen] = useState(false);
    const page = getPageById(props.pageId, props.pages);

    console.log('props.pagesprops.pagesprops.pages', props.pages);

    if (!page) {
        return null;
    }

    return (
        <div>
            <TocItemLabel
                onClick={() => setOpen(!isOpen)}
                isOpen={isOpen}
                hasChildren={Boolean(page.pages)}
                isActive={false}
            >
                {page.title}
            </TocItemLabel>
            { isOpen && props.pages && (
                <div style={{ marginLeft: '16px' }}>
                    {page.pages.map((id) => (
                        <TocItem pageId={id} pages={props.pages} />
                    ))}
                </div>
            )}
        </div>
    )
}