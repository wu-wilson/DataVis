import HashLoader from "react-spinners/HashLoader";
import themes from "../../_themes.module.scss";
import styles from "./Loader.module.scss";

const Loader = ({ message }: { message?: string }) => {
  return (
    <div className={styles["container"]}>
      <HashLoader color={themes["font_color"]} size={75} />
      <span className={styles["message"]}>
        {message ? message : "Loading..."}
      </span>
    </div>
  );
};

export default Loader;
