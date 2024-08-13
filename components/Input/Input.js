import React , { useState } from "react"
import { TextInput, View, Text } from "react-native";
import PropTypes from 'prop-types';

import style from './style'

const Input = props => {
    const [value, setValue] = useState("");

    return (
        <View>
            <Text style = {style.label}>{props.label}</Text>
            <TextInput
                value={value}
                onChangeText={val => {
                    setValue(val);
                    props.onChangeText && props.onChangeText(val);
                }}
                placeholder={props.placeholder ? props.placeholder : null}
                keyboardType={props.keyboardType}
                secureTextEntry={props.secureTextEntry}
                />
        </View>
    );
};

Input.propTypes = {
    keyboardType: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string.isRequired,
    onChangeText: PropTypes.func,
    secureTextEntry: PropTypes.bool,
  };

export default Input;