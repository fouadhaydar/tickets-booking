import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Tickets from "../screens/Tickets";
import Movies from "../screens/Movies";
import Profile from "../screens/Profile";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList, RootTabParamsLits } from "./NavigationType";
import { NavigationContainer } from "@react-navigation/native";
import Welcome from "../screens/Welcome";
import Details from "../screens/Details";
import SelectSeats from "src/screens/SelectSeats";
import { MaterialIcons } from "@expo/vector-icons";
import Favorites from "src/screens/Favorites";

const RootStack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamsLits>();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarStyle: {
          height: 100,
        },
        tabBarIconStyle: {
          marginTop: 15,
        },
        tabBarLabelStyle: {
          fontWeight: "bold",
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: () => <Ionicons name="home" size={24} />,
          title: "Home",
        }}
      />
      <Tab.Screen
        name="favorites"
        component={Favorites}
        options={{
          tabBarIcon: () => <MaterialIcons name="watch-later" size={24} />,
          title: "Favorite",
        }}
      />
      <Tab.Screen
        name="movies"
        component={Movies}
        options={{
          tabBarIcon: () => (
            <Ionicons name="videocam" size={24} color="black" />
          ),
          title: "Movies",
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: () => <Ionicons name="person" size={24} color="black" />,
          title: "Profile",
        }}
      />
    </Tab.Navigator>
  );
};

const RootStackNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerBackTitle: "",
          headerShown: false,
        }}
      >
        <RootStack.Group>
          <RootStack.Screen name="Main" component={TabNavigation} />
          <RootStack.Screen
            name="details"
            component={Details}
            options={{
              headerTitle: "Details",
              headerShown: true,
              headerBackTitleVisible: false,
            }}
          />
          <RootStack.Screen
            name="tickets"
            component={Tickets}
            options={{
              headerTitle: "Payment History",
              headerShown: true,
              headerBackTitleVisible: false,
            }}
          />
          <RootStack.Screen
            name="selectSeats"
            component={SelectSeats}
            options={{
              headerTitle: "Select Seat",
              headerShown: true,
              headerBackTitleVisible: false,
            }}
          />
        </RootStack.Group>
        {/* modale */}
        <RootStack.Group screenOptions={{ presentation: "modal" }}>
          <RootStack.Screen name="welcome" component={Welcome} />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigator;
