import React, { Fragment } from "react";
import styles from "../../styles/reminder.module.css";
import Link from "next/link";

function Reminder() {
  return (
    <div className="">
      <div className={styles.ReminderSection}>
        <div className={styles.ReminderSectionInner}>
          <div className={styles.ReminderTextContainer}>
            <h3 className={styles.ReminderText}>🚨 한번 더 주의하세요!</h3>
          </div>
          <div className={styles.ReminderDetailContainer}>
            <h3 className={styles.ReminderDetailTitleText}>
              1. 오늘 아침의 서울역은 매우 혼잡합니다!
            </h3>
            <h4 className={styles.ReminderDetailText}>
              많은 사람들이 몰리는 출퇴근 시간 주의하여 승차하세요.
            </h4>
          </div>
          <div className={styles.ReminderDetailContainer}>
            <h3 className={styles.ReminderDetailTitleText}>
              2. 한파주의보, 빙판길 조심!
            </h3>
            <h4 className={styles.ReminderDetailText}>
              한파주의보 경보이니 옷차림에 유의하시고, 보행 시 빙판길을
              조심하세요.
            </h4>
          </div>
          <div className={styles.ReminderCharacter}></div>
        </div>
      </div>
    </div>
  );
}

export default Reminder;
