import Content from '../../Components/Contents/Content';
import NavBar from '../../Components/NavBar/NavBar';
import Trends from '../../Components/Trends/Trends';
import styles from './styles.module.css';
function App() {
  return (
    <div className={styles['App']}>
      <div className={styles['container']}>
        <NavBar />
        <Content />
        <Trends />
      </div>
    </div>
  );
}

export default App;
