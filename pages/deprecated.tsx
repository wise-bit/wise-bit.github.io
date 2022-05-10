import Link from "next/link";

export default function Deprecated() {
  return (
    <>
      <div
        style={{
          position: "relative",
          minHeight: "100%",
          margin: "auto",
          width: "40%",
        }}
      >
        <div className="vertical-center">
          <div className="row no-gutters">
            <div className="col-1 col-xl-3"></div>
            <div className="col-10 col-xl-5">
              <div className="information">
                <div className="content-block headline">Hi, I&apos;m Sat.</div>
                <div className="content-block subline">
                  I write code and do stuff, some of which almost works
                  (sometimes)
                </div>
                <div className="content-block intro-line">
                  Currently a Computer Science and Mathematics Dual Major
                  student at the University of Ottawa.
                </div>

                <div className="content-block">
                  <a href="https://github.com/wise-bit">
                    <div
                      className="link-item clickable-content"
                      data-href="https://github.com/wise-bit"
                    >
                      Github
                    </div>
                  </a>

                  <a href="https://www.linkedin.com/in/satrajit-c">
                    <div
                      className="link-item clickable-content"
                      data-href="https://www.linkedin.com/in/satrajit-c"
                    >
                      LinkedIn
                    </div>
                  </a>

                  <a href="./files/CV.pdf">
                    <div
                      className="link-item clickable-content"
                      data-href="./files/CV.pdf"
                    >
                      Resume
                    </div>
                  </a>

                  <a href="mailto:satrajit314@gmail.com">
                    <div
                      className="link-item clickable-content"
                      // scope="col"
                      data-href="mailto:satrajit314@gmail.com"
                      data-toggle="tooltip"
                      title="satrajit314@gmail.com"
                      data-placement="top"
                    >
                      Email
                    </div>
                  </a>
                </div>

                <Link href="/">
                  <div className="content-block">
                    <div className="clickable-content projects-button">
                      Back to new website
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-1 col-xl-4"></div>
          </div>
        </div>
      </div>
    </>
  );
}
