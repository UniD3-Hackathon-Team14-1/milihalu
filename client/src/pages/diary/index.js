import React, { Fragment, useEffect, useState, alert } from "react";
import styles from "../../styles/diary.module.css";
import Link from "next/link";
import axios from "axios";

function Diary() {
  const [date, setDate] = useState("2023년 11월 12일");
  const [myDiary, setMyDiary] = useState(null);
  const [myHash, setHash] = useState(null);

  useEffect(() => {
    async function getData() {
      const data = await axios.get("/api/diary", {
        params: {
          date: "2023-11-11",
          username: "asdf",
        },
      });
      // console.log(data.data.diary);
      setMyDiary(data.data.diary);
    }
    getData();
  }, []);

  function findHash(title, content) {
    console.log(title, content);
    async function getData() {
      const data = await axios.get("/api/diary/url", {
        params: {
          title: title.date,
          content: content.myDiary,
        },
      });
      console.log(data.data);
      setHash(data.data);
    }
    getData();
    return myHash;
  }

  function shareUrl(hash) {
    const url = `http://localhost:3000/diary/${hash}`;
    console.log(url);
  }

  return (
    <Fragment>
      <div className={styles.DiarySection}>
        <div className={styles.DiarySectionInner}>
          <div className={styles.DiaryDateContainer}>
            <h4 className={styles.DiaryDateText}>{date}</h4>
          </div>
          <div className={styles.DiaryContainer}>
            <div className={styles.DiaryTextContainer}>
              <div className={styles.DiaryTextContainerInner}>
                <h5 className={styles.DiaryText}>{myDiary}</h5>
              </div>
            </div>
            <div className={styles.DiaryCharacterConatiner}>
              <div className={styles.DiaryCharacter}></div>
              <div className={styles.ButtonContainer}>
                <button
                  className={styles.HomeBtn}
                  onClick={() => {
                    shareUrl(findHash({ date }, { myDiary }));
                    // findHash({ date }, { myDiary });
                  }}
                >
                  공유
                </button>
                <Link className={styles.HomeBtn} href={"/reminder"}>
                  확인 완료!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Diary;
