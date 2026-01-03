import { NextPage } from 'next';

interface Props {}

const BottomText: NextPage<Props> = () => {
  return (
    <>
      <p style={{ color: '#888888' }}>
        {`
        anything you see on this site was designed by me; no fancy libraries
        or AI. this includes the terminal, the code-like layout and the 
        self-aware dinosaur. there's also some hidden secrets if you're up for
        a challenge ;)
        `}
      </p>
    </>
  );
};

export default BottomText;
