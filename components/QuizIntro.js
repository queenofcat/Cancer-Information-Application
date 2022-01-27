import React, { useState, Component } from 'react'
import { View, Text, ScrollView, SafeAreaView, StatusBar, ImageBackground, TouchableOpacity, Modal, Animated } from 'react-native'
import data from '../assets/data/introData';
import Entypo from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../assets/colors/colors';

MaterialCommunityIcons.loadFont();

const QuizIntro = ({navigation}) => {

    const allQuestions = data;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0)
    const [showNextButton, setShowNextButton] = useState(false)
    const [showScoreModal, setShowScoreModal] = useState(false)

    const validateAnswer = (selectedOption) => {
      let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
      setCurrentOptionSelected(selectedOption);
      setCorrectOption(correct_option);
      setIsOptionsDisabled(true);
      if(selectedOption==correct_option){
          // Set Score
          setScore(score+1)
      }
      // Show Next Button
      setShowNextButton(true)
  }
  const handleNext = () => {
      if(currentQuestionIndex== allQuestions.length-1){
          // Last Question
          // Show Score Modal
          setShowScoreModal(true)
      }else{
          setCurrentQuestionIndex(currentQuestionIndex+1);
          setCurrentOptionSelected(null);
          setCorrectOption(null);
          setIsOptionsDisabled(false);
          setShowNextButton(false);
      }
      Animated.timing(progress, {
          toValue: currentQuestionIndex+1,
          duration: 1000,
          useNativeDriver: false
      }).start();
  }

  const restartQuiz = () => {
    setShowScoreModal(false);

    setCurrentQuestionIndex(0);
    setScore(0);

    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
    Animated.timing(progress, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false
    }).start();
}

  const renderQuestion = () => {
  return (
      <View style={{
          marginVertical: 20,
      }}>
          {/* Question Counter */}
          <View style={{
              flexDirection: 'row',
              //alignItems: 'flex-end'
              top: -16,
          }}>
             <Text style={{color: colors.black, 
                          fontSize: 20, 
                          opacity: 0.6, 
                          marginRight: 2}}>
                {currentQuestionIndex+1}
                </Text>
                    <Text style={{color: colors.black, fontSize: 20, opacity: 0.6}}>/ {allQuestions.length}</Text>
                </View>
                 {/* Question */}
                 <Text style={{
                    color: colors.black,
                    fontSize: 20,
                    top: 0,
                }}>{allQuestions[currentQuestionIndex]?.question}</Text>
            </View>
        )
    }

    const renderOptions = () => {
      return (
          <View>
              {
                  allQuestions[currentQuestionIndex]?.options.map(option => (
                      <TouchableOpacity 
                      onPress={()=> validateAnswer(option)}
                      disabled={isOptionsDisabled}
                      key={option}
                      style={{
                        borderWidth: 1, 
                        borderColor: option==correctOption 
                        ? colors.success
                        : option==currentOptionSelected 
                        ? colors.success 
                        : colors.black+'40',
                        borderColor: option==correctOption 
                        ? colors.success +'20'
                        : option==currentOptionSelected 
                        ? colors.error +'20'
                        : colors.black+'20',
                        borderRadius: 15,
                        paddingHorizontal: 10,
                        marginVertical: 10,
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        backgroundColor: colors.white,
                        borderColor : '#0b2c54',
                        flexDirection:'row',
                        height: 80, 
                    }}
                    >
                    <Text style={{fontSize: 16, color: colors.black, }}>{option}</Text>

                    {/* Show Check Or Cross Icon based on correct answer*/}
                    {
                        option==correctOption ? (
                            <View style={{
                                backgroundColor: colors.white2,
                                borderWidth: 2,
                                borderColor: colors.success,
                                width: 30, 
                                height: 30, 
                                borderRadius: 30/2,
                                justifyContent: 'center',
                                alignItems: 'center',
                                top: -35,
                                right: 20,
                            }}>
                              <MaterialCommunityIcons name="check" style={{
                                            color: colors.success,
                                            fontSize: 25,
                                        }} />
                           </View>
                                )
                                : option == currentOptionSelected ? (
                                    <View style={{
                                        backgroundColor: colors.white,
                                        borderWidth: 2,
                                        borderColor: colors.error,
                                        width: 30, 
                                        height: 30, 
                                        borderRadius: 30/2,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        top: -35,
                                        right: 20,
                                    }}>
                                      <MaterialCommunityIcons name="close" style={{
                                            color: colors.error,
                                            fontSize: 20
                                        }} />
                                    </View>
                                ) : null
                            }

                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }
    const renderNextButton = () => {
      if(showNextButton){
          return (
              <TouchableOpacity
              onPress={handleNext}
              style={{
                  marginTop: 20, 
                  width: '20%', 
                  backgroundColor: '#0b2c54', 
                  padding: 10, 
                  left: 260,
                  borderRadius: 25,
              }}>
                  <Text style={{fontSize: 15, color: colors.white2, textAlign: 'center'}}>Next</Text>
              </TouchableOpacity>
          )
      }else{
          return null
      }
  }
  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
      inputRange: [0, allQuestions.length],
      outputRange: ['0%','100%']
  })
  const renderProgressBar = () => {
      return (
        
          <View style={{
              width: '100%',
              height: 20,
              borderRadius: 20,
              alignSelf: 'center',
              backgroundColor: '#0b2c54',
              top: -20,

          }}>
              <Animated.View style={[{
                  height: 20,
                  borderRadius: 20,
                  backgroundColor: colors.accent
              },{
                  width: progressAnim
              }]}>

              </Animated.View>
          </View>
      )
  }
return (
<ScrollView>
    <SafeAreaView >
        <StatusBar barStyle="dark-content" backgroundColor= '#0b2c54' />
        <TouchableOpacity onPress= {()=> navigation.navigate('Quiz')}>
        <Entypo name='close' color={colors.grey} size={28} style = {[{left:10, top: 5, backgroundColor: '#EDECEC'}]} />
        </TouchableOpacity> 
    
            <View style={{
            paddingVertical: 40,
            paddingHorizontal: 15,
            backgroundColor: '#EDECEC',
            position:'relative', 
            height: 700,
            width: '100%',
        }}>
                   
           {/* ProgressBar */}
           { renderProgressBar() }
      
           {/* Question */}
           {renderQuestion()}

           {/* Options */}
           {renderOptions()}

          {/* Next Button */}
          {renderNextButton()}
          

          {/* Score Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showScoreModal}
          >
            <View style={{
                       flex: 1,
                       backgroundColor: colors.darkBlue,
                       alignItems: 'center',
                       justifyContent: 'center'
                   }}>
                      <View style={{
                           backgroundColor: colors.white,
                           width: '90%',
                           borderRadius: 20,
                           padding: 20,
                           alignItems: 'center'
                       }}>
                          <Text style={{fontSize: 30, fontWeight: 'bold', color: 'grey'}}>
                              { score> (allQuestions.length/2) ? 'Congratulations!' : 'Try again another time' }
                              </Text>

                              <View style={{
                               flexDirection: 'row',
                               justifyContent: 'flex-start',
                               alignItems: 'center',
                               marginVertical: 20
                           }}>
                              <Text style={{
                                   fontSize: 30,
                                   color: score> (allQuestions.length/2) ? colors.success : colors.error
                               }}>{score}</Text>
                                <Text style={{
                                    fontSize: 20, color: colors.black1
                                }}>/ { allQuestions.length }</Text>
                           </View>
                            {/* Retry Quiz button */}
                            <TouchableOpacity
                           //onPress={restartQuiz}
                           onPress= {()=> navigation.navigate("Quiz")}
                           style={{
                               backgroundColor: colors.accent,
                               padding: 15, 
                               width: '100%', 
                               borderRadius: 20
                           }}>
                              <Text style={{
                                   textAlign: 'center', color: colors.white, fontSize: 20
                               }}>Back</Text>
                           </TouchableOpacity>
                       </View>
                   </View>
               </Modal>
               
                {/* Background Image */}
                {/*<Image
                source={require('../assets/images/Online-test.png')}
                style={{
                    width: 280,
                    height: 230,
                    zIndex: -1,
                    position: 'absolute',
                    bottom: 0,
                    left: -10,
                    right: 0,
                    opacity: 0.5
                }}
                resizeMode={'contain'}
            />*/}

           </View>
       </SafeAreaView>
       </ScrollView>
    )
}


export default QuizIntro;




