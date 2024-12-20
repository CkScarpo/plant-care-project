import React from "react";
import { Animated, Text, View } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { styles } from "./styles";
import { SvgFromUri } from "react-native-svg";
import { Feather } from "@expo/vector-icons";
import colors from "../../styles/colors";

interface IPlantCardProds extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
  handleRemove: () => void;
}

export const PlantCardSecondary = ({
  data,
  handleRemove,
  ...rest
}: IPlantCardProds) => {
  return (
    <ReanimatedSwipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <RectButton style={styles.buttonRemove} onPress={handleRemove}>
              <Feather name="trash" size={32} color={colors.white} />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton style={styles.container} {...rest}>
        <SvgFromUri uri={data.photo} width={50} height={50} />
        <Text style={styles.title}>{data.name}</Text>
        <View style={styles.details}>
          <Text style={styles.timeLabel}>Regar às</Text>
          <Text style={styles.time}>{data.hour}</Text>
        </View>
      </RectButton>
    </ReanimatedSwipeable>
  );
};
