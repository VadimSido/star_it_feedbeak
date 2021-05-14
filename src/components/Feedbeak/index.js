import React, {useState, useEffect} from "react";
import styles from "./Feedbeak.module.css";
import logo_clock from "../../assets/logo_clock.png";

const Feedbeak = ({logo_bisnesses}) => {
    const [date,setDate] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => setDate(new Date()), 1000);
        return () => {
            clearInterval(id);
        }
    }, []);

    let serverResponse = {
        'silpo' : {
            businessName : 'Silpo',
            address : 'Kiyv',
            imgLogo : {logo_bisnesses}
        },
        '334455' : {
            type : 'room',
            nameType : 'room #100'
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.containerInfo}>
                <div className={styles.containerPoint}>
                    <div className={styles.point}>
                        <p>Name : <span className={styles.pointText}>{serverResponse.silpo.businessName}</span></p>
                        <p>Adress : <span className={styles.pointText}>{serverResponse.silpo.address}</span></p>
                        <p>Object : <span className={styles.pointText}>{serverResponse[334455].nameType}</span></p>
                    </div>
                    <div className={styles.logo}>
                        <img src={logo_bisnesses} className={styles.logoPoint} alt="LOGO" />
                    </div>
                </div>
                <div className={styles.clock}>
                    <img src={logo_clock} className={styles.clockLogo} alt="ICON" />
                    <p>Time : <span className={styles.clockText}>{date.toLocaleTimeString()} <small>({date.toLocaleDateString()})</small></span></p>
                </div>
            </div>
        </div>
    )
}


export default Feedbeak;