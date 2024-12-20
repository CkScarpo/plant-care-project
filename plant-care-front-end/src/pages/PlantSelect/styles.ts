import React from "react";
import { StyleSheet } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 15,
  },
  subTitle: {
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  enviromentList: {
    height: 40,
    justifyContent: "center",
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32,
    paddingRight: 32,
  },
  plantsCard: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
  },
});
