import React from "react";

import s from "./EmptyCard.module.scss";
import { AddToCardBtn } from "features/components/AddToCardBtn";

type Props = {
  addCardHandler: (question: string, answer: string, answerCover: string, questionCover: string) => void
}

export const EmptyCard: React.FC<Props> = ({ addCardHandler }) => {
  return (
    <div className={s.emptyCard__container}>
      <p className={s.emptyCard__text}>This pack is empty. Click add new card to fill this pack</p>
      <AddToCardBtn onClickCallback={addCardHandler} />
    </div>
  );
};

