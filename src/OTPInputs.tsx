import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, TextInput, TextInputProps, TextInputKeyPressEventData, ViewStyle, KeyboardAvoidingView } from "react-native";

// types
import { OTPInputsPropsType, StateType } from "./types";

// style
import { borderInputs, bottomBorderInputs } from "./styles";

const initialState = (len: number) => {
    const textInputs: StateType[] = [...Array(len).keys()].map((i) => ({ value: "", ref: React.createRef<TextInput>() }));
    return () => textInputs;
};

const OTPInputs: React.FunctionComponent<OTPInputsPropsType> = ({ containerStyle, inputsStyle, borderStyle = "solid", inputs = 6, setValue }) => {
    const [textInputs, setTextInputs] = useState(initialState(inputs));
    const isDone = useRef(false);

    const { container, inputs: inputStyle } = useMemo(() => {
        if (borderStyle === "bottom") return bottomBorderInputs;
        else if (borderStyle === "solid") return borderInputs;
        return borderInputs;
    }, [borderStyle]);

    useEffect(() => {
        if (isDone.current) setValue?.(textInputs.map((input) => input.value).join(""));
    }, [isDone.current]);

    const handleKeyPressed = useCallback(
        ({ key }: TextInputKeyPressEventData, index: number) => {
            if (key !== "Backspace") return;

            setTextInputs((prevValues) => {
                prevValues = prevValues.map((input, valueIndex) => {
                    if (valueIndex === index - 1) input.ref.current?.focus();
                    else if (index === valueIndex) input.value = "";
                    return input;
                });
                return prevValues;
            });
        },
        [textInputs]
    );

    const handleOnChangeText = useCallback(
        (text: string, index: number) => {
            if (text.trim() === "") return;
            isDone.current = false;

            if (!isNaN(Number(text))) {
                if (text.length === inputs) {
                    handlePast(text);
                    return;
                }

                setTextInputs((prevValues) => {
                    prevValues = prevValues.map((input, valueIndex) => {
                        if (index === valueIndex && input.value.trim() === "") input.value = text[0];
                        else if (valueIndex === index + 1) input.ref.current?.focus();

                        if (index === inputs - 1) {
                            input.ref.current?.blur();
                            isDone.current = true;
                        }
                        return input;
                    });
                    return prevValues;
                });
            } else {
                setTextInputs((prevValues) => prevValues.map((input, idx) => (index === idx ? { ...input, value: "" } : input)));
            }
        },
        [textInputs]
    );

    const handlePast = useCallback((text: string) => {
        setTextInputs((prevValues) => prevValues.map((input, idx) => ({ ref: input.ref.current?.blur()!, value: text[idx] })));
        isDone.current = true;
    }, []);

    return (
        <>
            <KeyboardAvoidingView style={[container, containerStyle]}>
                {textInputs.map((input, index) => (
                    <Input
                        ref={input.ref}
                        value={input.value}
                        onChangeText={(text) => handleOnChangeText(text, index)}
                        onKeyPress={({ nativeEvent }) => handleKeyPressed(nativeEvent, index)}
                        key={index.toString()}
                        style={[inputStyle, inputsStyle]}
                    />
                ))}
            </KeyboardAvoidingView>
        </>
    );
};

const Input = React.forwardRef<TextInput, { style: ViewStyle } & TextInputProps>(({ style, ...props }, ref) => {
    return <TextInput style={style} maxLength={6} keyboardType="numeric" {...props} ref={ref} />;
});

export default OTPInputs;
