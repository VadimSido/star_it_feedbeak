import React from "react";
import {
    Link
} from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
    return(
        <div className={styles.container}>
            <p><Link to='/statistics' className={styles.link}><strong>STATISTICS</strong></Link> </p>
            <p><Link to='/info/1/1' className={`${styles.link} ${styles.active}`}><strong>INFO</strong></Link> </p>
            <p><Link to='/profile' className={styles.link}><strong>PROFILE</strong></Link> </p>
        </div>
    )
}

export default Header;