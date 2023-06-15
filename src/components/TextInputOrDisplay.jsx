import PropTypes from "prop-types";
import { Text, TextInput, View } from "react-native";

const TextInputOrDisplay = (props) => {
  const value = props.value;
  const set = props.set;
  return (
    <View className="flex-row items-center gap-x-2 flex-wrap">
      <Text className="flex-1">{props.label}</Text>
      {props.isEditing ? (
        <TextInput
          value={value}
          onChangeText={set}
          className="p-1 my-2 rounded bg-gray-100 flex-[3]"
        />
      ) : (
        <Text className="my-2 rounded flex-[3]">{value ?? "N/A"}</Text>
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
