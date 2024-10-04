import { NextPage } from 'next';

interface Props {}

const HeaderText: NextPage<Props> = (props) => {
  return (
    <>
      <p>
        {`
        hi i'm sat (the govt calls me satrajit chatterjee, you might find
        me as \`wise(-)bit\` on the internet) i'm a developer, working on finance 
        simulation, AI and computational genomics projects.
        `}
      </p>
      <div style={{ fontSize: '18px', color: '#5d9dc2' }}>
        <div>
          also see:{' '}
          <a href='https://log.satrajit.ca' rel='noopener noreferrer' style={{ textDecoration: 'underline' }}>
            sat logs
          </a>
        </div>
      </div>
      <p>
        {`
        this text mostly exists because SEO can't process my fancy
        custom interactive code layout ;)
        `}
      </p>

      <br />
      <hr />
      <br />
    </>
  );
};

export default HeaderText;
