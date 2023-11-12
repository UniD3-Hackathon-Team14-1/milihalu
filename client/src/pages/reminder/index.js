import React, { Fragment, useState, useEffect } from "react";
import styles from "../../styles/reminder.module.css";
import Link from "next/link";
import axios from "axios";

import ReactMarkdown from "react-markdown";

function Reminder() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    async function getData() {
      const data = await axios.get("/api/info", {
        params: {
          date: "2023-11-11",
          username: "asdf",
        },
      });
      setInfo(data.data);
    }
    getData();
  }, []);

  return (
    <Fragment>
      <div className="mb-20">
        <div className={styles.ReminderSection}>
          <div className={styles.ReminderSectionInner}>
            <div className={styles.ReminderTextContainer}>
              <h3 className={styles.ReminderText}>🚨 한번 더 주의하세요!</h3>
            </div>
            <div className={styles.ReminderDetailContainer}>
              <ReactMarkdown className={styles.ReminderDetailTitleText}>
                {info}
              </ReactMarkdown>
            </div>
            <div>
              <div className={styles.ReminderCharacter}></div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Reminder;
