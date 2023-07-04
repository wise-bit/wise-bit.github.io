import { NextPage } from 'next';
// import styles from '../styles/ExpandButton.module.css';

interface Props {
  isExpanded: boolean;
}

const ExpandButton: NextPage<Props> = (props) => {
  return (
    <>
      <button>
        <span></span>
        <span></span>
      </button>
    </>
  );
};

export default ExpandButton;
