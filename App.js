import React, {useState, useEffect} from "react";
import {SafeAreaView, View, StyleSheet, Image, TouchableOpacity} from "react-native";
import Torch from "react-native-torch";
import RNShake from 'react-native-shake';

const App = () => {  
   const [isLightOn, setIsLightOn] = useState(false);
	
   const handlePress = () =>{
      setIsLightOn( OnOff => !OnOff );   
   };

   useEffect(() =>{
      //liga/Desliga o Flash (Laterna) do celular
      Torch.switchState(isLightOn);
   },[isLightOn])

   useEffect(() =>{
      //Verifica a ocorrecia do balançar do celular
      const subscription = RNShake.addListener( () =>{
         setIsLightOn( OnOff => !OnOff ) ;
      });
      //Remove o componente apos desmotar
      return ( () => subscription.remove() );
   },[]);

	//console.log(isLightOn);
   return (
		<View style={ isLightOn ? style.containerLigth : style.containerDark} >
			<TouchableOpacity onPress={handlePress}>
				<Image style={ isLightOn 
						? style.lightOn
						: style.lightOff
					}  
					source={ 
						isLightOn
						? require('./assets/icons/lightOn.png')	
						: require('./assets/icons/lightOff.png')
					}
				/> 
					<Image style={ style.dioLogo } 
					source={ 
						isLightOn
						? require('./assets/icons/logoDioColor.png')	
						: require('./assets/icons/logoDioWhite.png')
					}
				/> 
			</TouchableOpacity>
		</View>
   )

}

export default App;

const style = StyleSheet.create({
   containerDark:{
      flex: 1,
      backgroundColor: '#000000',	//Preto
		justifyContent: 'center',
      alignItems: 'center',
   },
   containerLigth:{
      flex: 1,
      backgroundColor: '#fafad2',
      justifyContent: 'center',
      alignItems: 'center',
   },
	lightOff:{
		resizeMode: 'contain',
		alignSelf: 'center',
		tintColor: 'white',
		width: 200,
		height: 200,
	},
	lightOn:{
		resizeMode: 'contain',
		alignSelf: 'center',
		width: 200,
		height: 200,
	},
	dioLogo:{
		resizeMode: 'contain',
		alignSelf: 'center',
		width: 250,
		height: 250,
	},
     
});

/*
style={ isLightOn 
                  ? style.lightOn
                  : style.lightOff
               } 
*/
