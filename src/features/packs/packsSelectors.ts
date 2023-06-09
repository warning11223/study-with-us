import { RootState } from "app/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectPacks = (state: RootState) => state.packs.cardPacks;
export const selectPageCount = (state: RootState) => state.packs.pageCount;
export const selectCardPacksTotalCount = (state: RootState) => state.packs.cardPacksTotalCount;
export const selectMinCardsCount = (state: RootState) => state.packs.minCardsCount;
export const selectMaxCardsCount = (state: RootState) => state.packs.maxCardsCount;

export const selectCurrentPack = createSelector(
  selectPacks,
  (_: unknown, id: string | undefined) => id,
  (items, id) => {
    return items.filter(item => item._id === id);
  });
