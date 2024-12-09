import {
  CircularProgressbar as ProgressBar,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import type { CircularProgressbarProps } from 'react-circular-progressbar/dist/types';

type Props = {
  text: string;
  value: number;
  containerClassName?: string;
  styles?: Parameters<typeof buildStyles>[0];
} & Partial<CircularProgressbarProps>;

function CircularProgressBar(props: Props) {
  const { containerClassName, styles, ...rest } = props;

  return (
    <div className={containerClassName}>
      <ProgressBar
        {...rest}
        strokeWidth={12}
        styles={buildStyles({
          trailColor: '#FFF',
          pathColor: '#5E1DBB',
          strokeLinecap: 'butt',
          textColor: '#FFB700',
          ...styles,
        })}
      />
    </div>
  );
}

export default CircularProgressBar;
