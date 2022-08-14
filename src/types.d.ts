export interface StateType {
    value: string;
    ref: React.RefObject<TextInput>;
}

export interface OTPInputsPropsType {
    containerStyle?: ViewStyle;
    inputsStyle?: ViewStyle;
    borderStyle?: "bottom" | "solid";
    inputs?: number;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
}
