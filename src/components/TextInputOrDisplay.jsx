import PropTypes from "prop-types";
import { Text, TextInput, View } from "react-native";
import { isEmpty } from "../utils";

const TextInputOrDisplay = (props) => {
  const value = props.value;
  const set = props.set;
  return (
    <View className="flex-row items-center gap-x-2 flex-wrap">
      <Text className="flex-1 text-sm font-medium text-gray-700">
        {props.label}
      </Text>
      {props.isEditing ? (
        <TextInput
          value={value}
          onChangeText={set}
          placeholder={"Enter " + props.label}
          className="p-1 my-2 bg-gray-100 flex-[3] focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
        />
      ) : (
        <Text className="my-2 rounded flex-[3]">
          {isEmpty(value) ? "N/A" : value ?? "N/A"}
        </Text>
      )}
    </View>
  );
};

TextInputOrDisplay.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  set: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default TextInputOrDisplay;
