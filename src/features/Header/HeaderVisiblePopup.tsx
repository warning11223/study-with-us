import React from "react";
import s from "features/Header/Header.module.scss";
import { Link } from "react-router-dom";
import profilePhoto from "img/profile.svg";
import logoutPhoto from "img/logout.svg";
import { authThunks } from "features/auth/authSlice";
import { useAppDispatch } from "common/hooks/useAppDispatch";

type PropsType = {
  setVisiblePopup: (value: boolean) => void
}

export const HeaderVisiblePopup: React.FC<PropsType> = ({setVisiblePopup}) => {
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(authThunks.logout());
    setVisiblePopup(false);
  };

  return (
    <div className={s.header__headerPopup}>
      <Link
        to={"/profile"}
        className={s.header__profile}
        onClick={() => setVisiblePopup(false)}
      >
        <img src={profilePhoto} alt="profile" />
        <span>Profile</span>
      </Link>
      <div
        className={s.header__logout}
        onClick={logoutHandler}
      >
        <img src={logoutPhoto} alt="Log out" />
        <span>Log out</span>
      </div>
    </div>
  );
};