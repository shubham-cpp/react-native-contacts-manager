import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { Link } from "expo-router";
import { useLeverage } from "../store/useLeverage";

const Card = (props) => {
  // const leverage = props.leverage;
  const leverage = useLeverage((state) => state.getLeverage(props.leverage.id));
  const getEngagement = (engagementType) => {
    const engagement = {
      EXTEND: "Extend",
      UPFRONT: "Upfront",
      UPSIDE: "Upside",
      RFX_VALUE_ENGAGEMENT: "Value Engagement",
    };
    return engagement[engagementType];
  };
  const getStatusColor = (status) => {
    const statuses = {
      WON: "bg-green-500",
      LOST: "bg-red-400",
    };
    return statuses[status] ?? "bg-blue-300";
  };
  return (
    <View className="bg-white rounded-lg p-2 m-2">
      <Text className="text-sm font-light">{leverage.legalEntity.name}</Text>

      <View className="flex-row justify-between">
        {/* Leverage title, varPartner name */}
        <View className="flex-[3]">
          <Link
            href={`/leverages/${leverage.id}`}
            className="text-md text-blue-400"
            accessibilityLabelled={`Open Leverage ${leverage.title}`}
          >
            {leverage.title}
          </Link>
        </View>
        {/* Currency amount and closeDate */}
        <View className="flex-1">
          <Text>
            {leverage.currency ?? "EUR"}{" "}
            {leverage.offer.upfrontExpectedRevenue_base}
          </Text>
          <Text>{leverage.closeDate}</Text>
        </View>
      </View>
      {/* Engagement type and current status */}
      <View className="flex-row gap-x-2">
        <Text
          className={
            "text-sm border px-2 rounded border-gray-300 " +
            getStatusColor(leverage.status)
          }
        >
          {leverage.status}
        </Text>
        <Text className="text-sm border px-2 rounded bg-gray-200 border-gray-300 ">
          {getEngagement(leverage.engagementType)}
        </Text>
      </View>
    </View>
  );
};

Card.propTypes = {
  leverage: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    legalEntity: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    offer: PropTypes.shape({
      upfrontExpectedRevenue_base: PropTypes.number.isRequired,
    }),
    currency: PropTypes.string,
    closeDate: PropTypes.string.isRequired,
    engagementType: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
