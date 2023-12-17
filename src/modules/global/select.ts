import { RootState } from '@/modules/store';

export function selectGlobal(state: RootState) {
    return state.global;
}
