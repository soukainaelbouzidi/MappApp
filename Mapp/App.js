// import React, { useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Accueil from './pages/Accueil';
// import Login from './pages/Login';
// import Mapconf from './pages/Mapconf';

// const Stack = createStackNavigator();

// export default function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Accueil" component={Accueil} />
//         <Stack.Screen name="Login">
//           {(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
//         </Stack.Screen>
//         <Stack.Screen name="Mapconf" component={Mapconf} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
/* import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Accueil from './pages/Accueil';
import Login from './pages/Login';
import Mapconf from './pages/Mapconf';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Accueil" component={Accueil} />
        <Stack.Screen name="Login">
          {(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="Mapconf" component={Mapconf} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 */
// App.js
/* import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login';
import Mapconf from './pages/Mapconf';
import Login from './pages/Login';
import Accueil from './pages/Accueil';
const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Accueil" component={Accueil} />
        <Stack.Screen name="Login">
          {(props) => <Login {...props} setIsAuth={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="Mapconf" component={Mapconf} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 */
// App.js
/* import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Accueil from './pages/Accueil';
import Login from './pages/Login';
import Mapconf from './pages/Mapconf';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Accueil" component={Accueil} />
        <Stack.Screen name="Login">
          {(props) => <Login {...props} setIsAuth={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="Mapconf" component={Mapconf} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} */
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login';
import ScoolMap from './pages/CustomMap';
import Home from './pages/Home';
import LocationList from './pages/LocationListPage ';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login">
          {(props) => <Login {...props} setIsAuth={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="LocationList" component={LocationList} />
        <Stack.Screen name="SchoolMap" component={ScoolMap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
