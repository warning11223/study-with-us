import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import arrowLeft from "assets/img/arrow-left.svg";

import s from "./LearnPack.module.scss";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { selectPacks } from "features/packs/packsSelectors";
import Button from "@mui/material/Button/Button";
import { ShowAnswer } from "components/LearnPack/ShowAnswer/ShowAnswer";
import { CardType } from "features/cards/cardsApi";
import { cardsThunks } from "features/cards/cardsSlice";
import { selectCards } from "features/cards/cardsSelectors";
import { toast } from "react-toastify";
import { selectAuthLoading } from "features/auth/authSelectors";
import { Loader } from "components/Loader/Loader";
import { Loading } from "features/auth/authSlice";
import { getCard } from "common/utils/getCard";


export const LearnPack = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [first, setFirst] = useState<boolean>(true);
  const [showAnswer, setShowAnswer] = useState(false);
  const packs = useAppSelector(selectPacks);
  const currentPack = packs.filter(item => item._id === id);
  const cards = useAppSelector(selectCards);
  const loading = useAppSelector(selectAuthLoading);

  const [card, setCard] = useState<CardType>({
    _id: "fake",
    cardsPack_id: "",
    answer: "answer fake",
    question: "question fake",
    grade: 0,
    shots: 0,
    user_id: "",
    created: "",
    updated: ""
  });

  useEffect(() => {
    if (first) {
      dispatch(cardsThunks.getCards({
        cardsPack_id: id!
      }));
      setFirst(false);
    }

    if (cards.length > 0) setCard(getCard(cards));
  }, [dispatch, id, cards, first]);

  const onNext = (grade: string) => {
    setShowAnswer(false);

    if (cards.length > 0) {
      dispatch(cardsThunks.gradeCard({
        grade: +grade,
        card_id: card._id
      }))
        .unwrap()
        .then(res => {
          toast.success("Answer taken into account");
        })
        .catch(err => {
          toast.error(err.e.response.data.error);
        });

      setCard(getCard(cards));
    } else {

    }
  };

  if (loading === Loading.Loading) {
    return <Loader />
  }

  return (
    <div className={s.learn}>
      <Link className={s.learn__link} to={"/packs-list"}>
        <img src={arrowLeft} alt="arrow" />
        Back to Packs List
      </Link>
      <h3 className={s.learn__title}>Learn "{currentPack[0].name}" pack</h3>

      <div className={s.learn__container}>
        <p className={s.learn__text}>
          <span style={{ fontWeight: "bold" }}>Question: </span>
          {card.question}
        </p>
        <p className={s.learn__number}>
          Number of answers per question:
          <span style={{ fontWeight: "bold", fontSize: "16px" }}>{card.shots}</span>
        </p>
        {
          !showAnswer &&
          <Button
            variant={"contained"}
            color={"warning"}
            sx={{ marginBottom: "40px" }}
            onClick={() => setShowAnswer(true)}
          >Show answer</Button>
        }

        {
          showAnswer && <ShowAnswer onNext={onNext} answer={card.answer} />
        }
      </div>

    </div>
  );
};
