import { useReducer } from "react"

export type Page = {
    id: string;
    title: string;
    url: string;
    parentId: Page['id'];
    level: number;
    tabIndex: number;
    doNotShowWarningLink: boolean;
    pages: Array<Page['id']>
}

type State = {
    data: {
        pages: Record<Page['id'], Page>;
        topLevelIds: Array<Page['id']>
    };
    isLoading: boolean;
    isError: boolean;
}

const initialState: State = {
    data: {
        pages: {},
        topLevelIds: []
    },
    isLoading: false,
    isError: false
}

const TOC_START = 'TOC_START';
const TOC_FINISH = 'TOC_FINISH';
const TOC_FAIL = 'TOC_FAIL';

const actionStart = () => ({
    type: TOC_START
} as const);

const actionFinish = (data: State['data']) => ({
    type: TOC_FINISH,
    data
} as const);

const actionFail = () => ({
    type: TOC_FAIL,
} as const);

type Action = ReturnType<typeof actionStart | typeof actionFinish | typeof actionFail>;

function reducer(state: State, action: Action) {
    switch (action.type) {
        case TOC_START: {
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        }
        case TOC_FINISH: {
            return {
                ...state,
                data: action.data,
                isLoading: false,
                isError: false,
            }
        }

        case TOC_FAIL: {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        }
        default: return state;
    }
}

type ApiResponse = {
    entities: {
        pages: {
            [pageId: string]: Page
        }
    },
    topLevelIds: Array<Page['id']>
}

export const useTocData = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const start = async () => {
        try {
            dispatch(actionStart());

            console.trace('LOL');
            const res = await fetch('/idea/2023.1/HelpTOC.json');
            const data: ApiResponse = await res.json();

            dispatch(actionFinish({
                pages: data.entities.pages,
                topLevelIds: data.topLevelIds
            }));
        } catch (err) {
            dispatch(actionFail());
        }
    }

    return {
        state,
        start
    }
}