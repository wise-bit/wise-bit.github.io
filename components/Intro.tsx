import { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.css";

interface Props {
  username: string;
}

const Intro: NextPage<Props> = (props) => {
  const { username } = props;

  return (
    <>
      <h1 className={styles.title}>
        Hi I&apos;m <span className={"highlight"}>{username}</span> !
      </h1>
      <h3>Computer Science and Mathematics Undergrad Student</h3>

      <Link href="./files/CV.pdf">
      <h2 className={"highlight clickable"} style={{ backgroundColor: "#326340" }}>
        Résumé
      </h2>
      </Link>

      <h3 style={{ color: "#777777", marginTop: "100px" }}>
        <span className={"highlight2"}>v3</span> is still under development,{" "}
        <Link href="/legacy">
          <span className={"highlight2 clickable"}>check out v2</span>
        </Link>
      </h3>
    </>
  );
};

// export component
export default Intro;
