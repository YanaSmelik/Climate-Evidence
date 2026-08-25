import styles from './style/home.module.css';

function Home() {
    return (
        <div className={styles.main}>
        <h1 className={styles.mainText}>Climate Change Evidence</h1>
        <p className={styles.subText}>There is unequivocal evidence that Earth is warming at an unprecedented rate.</p>
        <p className={styles.subText}>Human activity is the principal cause.</p>
        </div>
    );
}

export default Home;