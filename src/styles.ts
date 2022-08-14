import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export const bottomBorderInputs = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: "3%",
        height: height * (5 / 100),
    },
    inputs: {
        borderBottomWidth: 2,
        borderBottomColor: "gray",
        width: "11.6667%",
        height: "100%",
        marginRight: "6%",
        fontSize: 25,
        textAlign: "center",
    },
});

export const borderInputs = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: "3%",
        height: height * (6 / 100),
    },
    inputs: {
        borderWidth: 1,
        borderColor: "gray",
        width: "13.6667%",
        height: "100%",
        marginRight: "3%",
        borderRadius: 5,
        fontSize: 30,
        textAlign: "center",
    },
});
