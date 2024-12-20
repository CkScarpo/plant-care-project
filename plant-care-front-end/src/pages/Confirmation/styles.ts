import React from "react";
import { StyleSheet } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  content: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  emoji: {
    fontSize: 78,
  },
  title: {
    fontSize: 22,
    lineHeight: 38,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 15,
  },
  subTitle: {
    fontSize: 17,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.text,
    paddingVertical: 10,
  },
  button: {
    width: "100%",
    paddingHorizontal: 50,
    marginTop: 20,
  },
});
