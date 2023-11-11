import React, { Fragment, useEffect, useState, alert } from "react";
import styles from "../../../styles/diary.module.css";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

function DiaryDemo() {
  const [date, setDate] = useState(null);
  const [myDiary, setMyDiary] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    async function getData() {
      const data = await axios.get("/api/diary/demo", {
        params: {
          hash: router.query.demo,
        },
      });
      console.log("[demo]", data);
      setDate(data.data.title);
      setMyDiary(data.data.content);
    }
    getData();
  }, [router.isReady]);

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
              <div className={styles.DiaryCharacter} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default DiaryDemo;
