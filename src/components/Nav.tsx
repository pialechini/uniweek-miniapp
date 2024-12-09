import { mdiAccountMultiple, mdiCalendarBlank, mdiHome } from '@mdi/js';
import Icon from '@mdi/react';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import styles from './nav.module.scss';

let initialCircleCenterX = 0;
let initialCircleCenterY = 0;
let circleWidth = 0;

function Nav() {
  const [circleX, setCircleX] = useState<number | string>('-50%');
  const navItemsRef = useRef<HTMLDivElement[]>([]);
  const [activeItemIndex, setActiveItemIndex] = useState<number>(-1);

  const handleNavClick = (index: number) => {
    if (navItemsRef.current[index]) {
      const item = navItemsRef.current[index].getBoundingClientRect();
      const iconCenterX = item.left + item.width / 2;

      setCircleX(iconCenterX - initialCircleCenterX - circleWidth / 2);
      setActiveItemIndex(index);
    }
  };

  useEffect(() => {
    setActiveItemIndex(1);
  }, []) 

  return (
    <div className={styles.navbar}>
      {/* Animated Circle */}
      <motion.div
        ref={(el) => {
          if (el) {
            const item = el.getBoundingClientRect();
            initialCircleCenterX = item.left + item.width / 2;
            initialCircleCenterY = item.top + item.height / 2;
            circleWidth = item.width;
          }
        }}
        className={styles.activeCircle}
        initial={{
          x: '-50%',
        }}
        animate={{
          x: circleX,
        }}
        transition={{ type: 'tween', ease: 'circOut' }}
      ></motion.div>

      {/* Nav Items */}
      {[mdiAccountMultiple, mdiHome, mdiCalendarBlank].map((icon, index) => (
        <motion.div
          key={index}
          className={styles.navItem}
          ref={(el) => (navItemsRef.current[index] = el!)}
          onClick={() => handleNavClick(index as number)}
          animate={{
            y:
              activeItemIndex === index
                ? initialCircleCenterY -
                  navItemsRef.current[index]?.getBoundingClientRect()?.top -
                  25
                : 0,
          }}
          transition={{
            type: 'tween',
            ease: 'backOut',
          }}
        >
          <Icon
            path={icon}
            color={activeItemIndex === index ? '#FFB700' : '#110729'}
            size={'30px'}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default Nav;
