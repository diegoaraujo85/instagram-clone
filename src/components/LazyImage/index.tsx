import React, { useCallback, useEffect, useState } from 'react';
import { Animated } from 'react-native';

import { Original, Small } from './styles';

const OriginalAnimated = Animated.createAnimatedComponent(Original);

// https://youtu.be/2nXsLpUCO20?t=2360

const LazyImage: React.FC = ({
  smallSource,
  source,
  aspectRatio,
  shouldLoad
}) => {

  const opacity = new Animated.Value(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (shouldLoad) {
      // setTimeout(() => {
      setLoaded(true)
      // }, 1000)
    }
  }, [shouldLoad])

  const handleAnimate = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [opacity])

  return (
    <Small
      source={smallSource}
      ratio={aspectRatio}
      resizeMode="contain"
      blurRadius={2}
    >
      { loaded &&
        <OriginalAnimated
          style={{ opacity }}
          source={source}
          ratio={aspectRatio}
          resizeMode="contain"
          onLoadEnd={handleAnimate}
        />
      }
    </Small>
  );
}

export default LazyImage;
