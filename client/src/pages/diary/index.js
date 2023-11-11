import React, { Fragment } from "react";
import styles from "../../styles/diary.module.css";
import Link from "next/link";
import Image from "next/image";

function Diary() {
  return (
    <Fragment>
      <div className={styles.DiarySection}>
        <div className={styles.DiarySectionInner}>
          <div className={styles.DiaryDateContainer}>
            <h4 className={styles.DiaryDateText}>2023년 11월 12일</h4>
          </div>
          <div className={styles.DiaryContainer}>
            <div className={styles.DiaryTextContainer}>
              <div className={styles.DiaryTextContainerInner}>
                <h5 className={styles.DiaryText}>
                  &nbsp;오늘은 한파주의보가 발령되었습니다. 두꺼운 옷을 입으셔야
                  합니다.
                  <br />
                  &nbsp; 출근 시간의 서울역은 사람이 많아 혼잡하오니 넘어지지
                  않게 주의하세요.
                  <br />
                  &nbsp; 전날 비가 와서 길이 많이 미끄럽습니다. 보행에
                  주의하세요.
                  <br />
                  &nbsp; 오늘 지인과 약속이 있으시군요! 과음하지 않도록
                  주의하고, 숙취해소제를 구입하세요.
                  <br />
                  &nbsp; 밤 시간이 되면 바람이 더욱 강해질 예정이에요. 귀가시에
                  주의하세요.
                </h5>
              </div>
            </div>
            <div className={styles.DiaryCharacterConatiner}>
              <div className={styles.DiaryCharacter}></div>
              <div className={styles.ButtonContainer}>
                <button className={styles.HomeBtn}>공유</button>
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
